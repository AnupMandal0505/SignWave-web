import { useRef, useEffect, useState } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as cam from '@mediapipe/camera_utils';

import white from '../res/white.jpg'

function Contact() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [text, setText] = useState("")


  useEffect(() => {
    return;
    const api_call = async () => {
      await fetch('http://127.0.0.1:5000/pred', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ img: imgSrc })
      }).then(res => res.json()).then(data => setText(text + data['char']))
    }

    api_call()
  }, [imgSrc]);


  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      const processResults = async () => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        canvasCtx.save();

        // Clear the canvas to ensure transparency
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw landmarks if available
        if (results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
              color: 'lightgreen',
              lineWidth: 2,
            });

            drawLandmarks(canvasCtx, landmarks, {
              color: 'lightgreen',
              lineWidth: 2,
              radius: 1,
            });
          }
        }
        canvasCtx.restore();
        setImgSrc(canvas.toDataURL('image/png'));
      };
      // Set a delay before processing results
      const timeoutId = setTimeout(processResults, 800); // 1000ms delay (1 second)

      // Clear the timeout if the component unmounts or before setting a new timeout
      return () => clearTimeout(timeoutId);

    });

    if (videoRef.current) {
      cameraRef.current = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      cameraRef.current.start();
    }
  }, []);

  return (
    <div style={{ paddingTop: '20vh' }}>
      <div className="container">
        <div className="h-full w-full" style={{}}>
          <div className="w-full col-md-8 flex justify-end items-end h-[30rem] bg-cover bg-center  border-gray-200">
            <video
              autoPlay
              ref={videoRef}
              className='absolute h-full w-full z-[1] shadow border' 
              style={{objectFit:'cover',borderRadius:'20px'}}
            />
            <canvas
              ref={canvasRef}
              className='absolute h-full w-full z-[2] bg-transparent'
            />
          </div>
        </div>
      </div>
        <p>{text}</p>
    </div>
  );
}

export default Contact;


/*

      {imgSrc && <img src={imgSrc} width={640} height={480} alt="Canvas content" />}
*/
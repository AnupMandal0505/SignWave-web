import { useRef, useEffect, useState } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

import CallWrapper from '../components/CallWrapper';

import white from '../res/white.jpg'
import { useSocket } from '../Context/SocketProvider';
import LoadingScreen from '../components/Loading';

// import axios from axios

function VideoCall2() {
    const socketContext = useSocket();
    const canvasRef = useRef(null);
    const [receiverName, setReceiverName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("")

    const getPrediction= (inputData)=>{
        console.log("huhu")
        fetch(import.meta.env.VITE_DJANGO_URL || 'http://localhost:8000/api/call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({calldata:inputData})
        }).then(res => res.json()).then(data =>{
            console.log("response: ", data)
            setText((prev)=>{
                if(prev.slice(-1)===data['Response']) return prev;
                if(data['Response']==="space") return prev+" ";
                if(data['Response']==="del") return prev.slice(0, -1);
                return prev+data['Response'];
            })
        })
    }


    useEffect(() => {
        setLoading(true);
        const hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        setLoading(false);
        
        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7,
        });

        hands.onResults((results) => {
            try{
                console.log("results", results);
                if(results.multiHandLandmarks.length>0){
                    getPrediction({multiHandLandmarks:results.multiHandLandmarks});
                }

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
                                lineWidth: 4,
                            });
    
                            drawLandmarks(canvasCtx, landmarks, {
                                color: 'lightgreen',
                                lineWidth: 4,
                                radius: 2,
                            });
                        }
                    }
                    canvasCtx.restore();
            }
            catch(err)
            {
                console.log("hands.onResults Error:", err)
            }

        });

        if (socketContext.remoteVideoRef.current) {
            setInterval(() => {
                // console.log("checking")
                if (
                    socketContext?.remoteVideoRef.current !== undefined &&
                    socketContext?.remoteVideoRef.current !== null &&
                    socketContext?.remoteVideoRef.current.readyState === 4
                ) {
                    // console.log("detecting")
                    detect(hands, socketContext?.remoteVideoRef);
                }

            }, 500);
        }
    }, []);

    const detect = async (hands, videoRef) => {
        await hands.send({ image: videoRef.current });
    }

    return (
        <>
            <h1>Create Your username First!</h1>
            <p>{localStorage.getItem('user') || "Create User Name"}</p>
            <label htmlFor="username">Update Your User Name:</label>
            <input type='text' id="username" onChange={socketContext?.handleUserName} />
            <button onClick={() => {
                location.reload()
            }}>Submit</button>
            <hr />
            <label htmlFor="receiver">Enter Receiver Name:</label>
            <input type='text' id="receiver" onChange={(e) => setReceiverName(e.target.value)} />
            <button onClick={() => socketContext?.callUser(receiverName)}>Call</button>
            <p>{text}</p>
            {loading && <LoadingScreen/>}
            <CallWrapper socketContext={socketContext} canvasRef={canvasRef} />
        </>
    );
}

export default VideoCall2;
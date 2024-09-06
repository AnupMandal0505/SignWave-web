//@ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../Context/SocketProvider'

import * as tf from "@tensorflow/tfjs";

import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "../utils/canvas";
import CallWrapper from '../components/CallWrapper';


//experimental
// import * as fp from "fingerpose"
// import Handsigns from "../components/handsigns"
//experimental

const VideoCall = () => {
    var socketContext = useSocket();
    const canvasRef = useRef(null);
    const [receiverName, setReceiverName] = useState(null);

    const getPrediction= async (inputData)=>{
        var response = await fetch('http://localhost:8000/api/call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: inputData
        })
        response=response.json()
        console.log("response: ",response);
    }

    const runHandpose = async () => {
        console.log(tf.getBackend()); // Check the current backend
        console.log(tf.engine().registry); // Check available backends

        // If the preferred backend is not set:
        await tf.setBackend('webgl'); // or 'cpu', 'wasm', etc.
        await tf.ready()
        const net = await handpose.load();
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
            console.log("detecting")
            detect(net);
        }, 100);
    };

    const detect = async (net) => {
        console.log("socketContext?.remoteVideoRef.current.readyState", socketContext?.remoteVideoRef.current.readyState)
        if (
            socketContext?.remoteVideoRef.current !== undefined &&
            socketContext?.remoteVideoRef.current !== null &&
            socketContext?.remoteVideoRef.current.readyState === 4
        ) {
            // Get Video Properties
            //@ts-ignore
            const video = socketContext?.remoteVideoRef.current;
            //@ts-ignore
            const videoWidth = socketContext?.remoteVideoRef.current.videoWidth;
            //@ts-ignore
            const videoHeight = socketContext?.remoteVideoRef.current.videoHeight;

            // Set video width
            //@ts-ignore
            // socketContext.remoteVideoRef.current.width = videoWidth;
            //@ts-ignore
            // socketContext.remoteVideoRef.current.height = videoHeight;

            // Set canvas height and width
            //@ts-ignore
            // canvasRef.current.width = videoWidth;
            //@ts-ignore
            // canvasRef.current.height = videoHeight;

            // Make Detections
            const hand = await net.estimateHands(video);
            getPrediction(hand)
            console.log("result:",hand);


            // experimental
            // if (hand.length > 0) {
            //     // Initialize fingerpose estimator
            //     const gestureEstimator = new fp.GestureEstimator([
            //         fp.Gestures.ThumbsUpGesture,
            //         Handsigns.aSign,
            //         Handsigns.bSign,
            //         Handsigns.cSign,
            //         Handsigns.dSign,
            //         Handsigns.eSign,
            //         Handsigns.fSign,
            //         Handsigns.gSign,
            //         Handsigns.hSign,
            //         Handsigns.iSign,
            //         Handsigns.jSign,
            //         Handsigns.kSign,
            //         Handsigns.lSign,
            //         Handsigns.mSign,
            //         Handsigns.nSign,
            //         Handsigns.oSign,
            //         Handsigns.pSign,
            //         Handsigns.qSign,
            //         Handsigns.rSign,
            //         Handsigns.sSign,
            //         Handsigns.tSign,
            //         Handsigns.uSign,
            //         Handsigns.vSign,
            //         Handsigns.wSign,
            //         Handsigns.xSign,
            //         Handsigns.ySign,
            //         Handsigns.zSign,
            //       ]);

            //     const gesturePrediction = gestureEstimator.estimate(hand[0].landmarks, 7.5); // Higher confidence threshold

            //     if (gesturePrediction.gestures.length > 0) {
            //         const bestGesture = gesturePrediction.gestures.reduce((prev, current) => {
            //             return prev.confidence > current.confidence ? prev : current;
            //         });
            //         console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",bestGesture.name)
            //         // setGesture(bestGesture.name); // Update detected gesture
            //     }

            //     // Draw mesh on canvas
            //     const ctx = canvasRef?.current.getContext("2d");
            //     ctx.clearRect(0, 0, canvasRef?.current.width, canvasRef?.current.height);
            //     drawHand(hand, ctx);
            // }

            // Draw mesh
            //@ts-ignore
            const ctx = canvasRef?.current.getContext("2d");
            ctx.clearRect(0, 0, canvasRef?.current.width, canvasRef?.current.height);
            drawHand(hand, ctx);
        }
    };

    useEffect(() => { runHandpose() }, []);

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
            <CallWrapper socketContext={socketContext} canvasRef={canvasRef}/>
        </>
    )
}

export default VideoCall;
import { useRef, useEffect, useState } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

import CallWrapper from '../components/CallWrapper';

import white from '../res/white.jpg'
import { useSocket } from '../Context/SocketProvider';
import LoadingScreen from '../components/Loading';
import SelectComponent from '../components/SelectComponent';

import { toast } from 'react-toastify'
import { json } from 'react-router-dom';

// import axios from axios

const THRESHOLD = 5

function VideoCall2() {
    const socketContext = useSocket();
    const canvasRef = useRef(null);
    const [receiverName, setReceiverName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("")
    // const [counts, setCounts] = useState(0);
    var counts =0;

    var prevChar = null;

    const DJANGO_URL = import.meta.env.VITE_DJANGO_URL || 'http://localhost:8000'

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await fetch(DJANGO_URL + '/api/users', {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })
            if (response.status >= 200 && response.status <= 299) {
                const data = await response.json()
                setUsers(data.list_users || [])
            }
            else {
                toast.error(String(response.message))
            }
        }
        catch (err) {
            toast.error(String(err));
        }
        setLoading(false);
    }

    const getPrediction = (inputData) => {
        console.log("huhu")
        fetch(DJANGO_URL + '/api/call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ calldata: inputData })
        }).then(res => res.json()).then(data => {
            console.log("response: ", data)
            const char = data['Response']
            if (prevChar === char) {
                if (counts <= THRESHOLD) {
                    // setCounts(prev => prev + 1);
                    counts++;
                }
                else {
                    // setCounts(0);
                    counts=0;
                    prevChar = char;
                    setText((prev) => {
                        if (char === "space") return prev + " ";
                        else if (char === "del") return prev.slice(0, -1);
                        return prev + data['Response'];
                    }
                    );
                }
            }
            else {
                // setCounts(1);
                counts=1;
                prevChar = char;
            }
        })
    }


    useEffect(() => {
        fetchUsers();
        // setLoading(true);
        const hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        // setLoading(false);

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7,
        });

        hands.onResults((results) => {
            try {
                console.log("results", results);
                if (results.multiHandLandmarks.length > 0) {
                    getPrediction({ multiHandLandmarks: results.multiHandLandmarks });
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
            }
            catch (err) {
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
        <div className='mt-16'>
            <div className='flex items-center justify-center space-x-4 p-4'>
                <label htmlFor="receiver" className="text-gray-700">Enter Receiver Name:</label>
                <SelectComponent
                    options={users.map((user) => ({ value: user.username, label: user.username }))}
                    onChange={(value) => setReceiverName(value)}
                    className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {socketContext.remoteUserName?<button
                    onClick={() => {location.reload()}}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-150"
                >
                    End
                </button>:<button
                    onClick={() => socketContext?.callUser(receiverName)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-150"
                >
                    Call
                </button>}
            </div>
            <div className='flex flex-col justify-center flex-wrap'>
                <h4>Translated Text:</h4>
                <p className='text-wrap font-bold'>{text}</p>
            </div>
            {loading && <LoadingScreen />}
            <CallWrapper socketContext={socketContext} canvasRef={canvasRef} />
            {/* <h1>Create Your username First!</h1> */}
            <p>{localStorage.getItem('user') || "Create User Name"}</p>
            <label htmlFor="username">Update Your User Name:</label>
            <input type='text' id="username" onChange={socketContext?.handleUserName} />
            <button onClick={() => {
                location.reload()
            }}>Submit</button>
            <hr />
        </div>
    );
}

export default VideoCall2;
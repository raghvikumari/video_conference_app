import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import './Lobby.css'



const LobbyScreen = () => {

    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            console.log(email);
            console.log(room);
            socket.emit("room:join", { email, room });
        },
        [email, room, socket]
        // [email, room]
    );

    const handleJoinRoom = useCallback(
        (data) => {
            const { email, room } = data;
            navigate(`/room/${room}`);
        },
        [navigate]
    );

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    return (
        <div id="main">
            <div id="wrapper">
                <div id="heading">
                    <h1>Video Chat</h1>
                </div>
                <form onSubmit={handleSubmitForm}>
                    <div id="form">
                        <div id="email">
                            <label htmlFor="email">Email ID</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div id="room">
                            <label htmlFor="room">Room Number</label>
                            <input
                                type="text"
                                id="room"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                placeholder="ID to join"
                            />
                        </div>
                    </div>
                    <button id="btn">Join</button>
                </form>
            </div>
        </div>
    );
};

export default LobbyScreen;
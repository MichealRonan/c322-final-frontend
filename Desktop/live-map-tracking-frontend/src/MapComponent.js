import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import './MapComponent.css';

const MapComponent = () => {
    const [position, setPosition] = useState([39.1653, -86.5264]);
    const [trackingInfo, setTrackingInfo] = useState('Mark');

    useEffect(() => {
        const socket = io('http://localhost:4000');

        socket.on('positionUpdate', newPosition => {
            setPosition(newPosition);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="map-page">
            <header className="map-header">
                <h1>DeliverEase</h1>
            </header>
            <MapContainer center={position} zoom={13} style={{ height: '400px', width: '80%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        Current Position<br />Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="tracking-info">
                Tracking: {trackingInfo}
            </div>
        </div>
    );
};

export default MapComponent;
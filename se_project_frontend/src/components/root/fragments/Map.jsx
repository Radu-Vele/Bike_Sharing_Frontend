import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { useState, useRef } from "react";
import "leaflet/dist/leaflet.css"

const BasicMap = () => {

    const [centerLocation, setCenterLocation] = useState({lat: 46.77223350278075, lng: 23.585195329308466}) //init at AC
    const ZOOM_LEVEL = 18
    const mapRef = useRef();

    return (
    <MapContainer center = {centerLocation}
                zoom ={ZOOM_LEVEL}
                ref = {mapRef}
                scrollWheelZoom={true}
            >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=1Lk3zVWEbHf7oKZYoIri"
            />
    </MapContainer>
    )
}

export default BasicMap;
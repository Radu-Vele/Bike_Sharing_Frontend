import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { useState, useRef, useLayoutEffect } from "react";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import { Button } from "@mui/material";


const availableMarker = new L.Icon({
    iconUrl: require("../../img/green_marker.png"),
    iconSize: [45, 45],
})

const fullMarker = new L.Icon({
    iconUrl: require("../../img/red_marker.png"),
    iconSize: [45, 45],
})

const emptyMarker = new L.Icon({
    iconUrl: require("../../img/grey_marker.png"),
    iconSize: [45, 45],
})

const BasicMap = (stationsArray) => {

    const [centerLocation, setCenterLocation] = useState({lat: 46.77223350278075, lng: 23.585195329308466})
    const ZOOM_LEVEL = 18;

    const mapRef = useRef();
    const [markers,setMarkers] = useState([]);

    const chooseColor = function(listLen, capacity) {
        if(listLen === 0) {
            return emptyMarker;
        }
        else if(listLen === capacity) {
            return fullMarker;
        }
        else {
            return availableMarker;
        }

    }

    const fun = function() {
        const arr = stationsArray.stationsArray.map(item => (
            <Marker position={[item.latitude, item.longitude]} icon={chooseColor(item.bikeList.length, item.maximumCapacity)}>
                <Popup>
                    Station: {item.name}
                    <br></br>
                    Bikes available: {item.bikeList.length}
                    <br></br>
                    Capacity: {item.maximumCapacity}
                </Popup>
            </Marker>
        )
        );
        setMarkers(arr);
    }

    return (
    <>
    <Button
        onClick={fun}
    >
        Click to refresh stations
    </Button>
    <MapContainer center = {centerLocation}
                zoom ={ZOOM_LEVEL}
                ref = {mapRef}
                scrollWheelZoom={true}
            >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=1Lk3zVWEbHf7oKZYoIri"
            />
            {markers}
    </MapContainer>
    
    </>);
}

export default BasicMap;
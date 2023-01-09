import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { useState, useRef, useLayoutEffect } from "react";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import axios from "../../../api/customAxiosConfig/CustomAxiosConfig";

const availableMarker = new L.Icon({
    iconUrl: require("../../../img/green_marker.png"),
    iconSize: [45, 45],
})

const fullMarker = new L.Icon({
    iconUrl: require("../../../img/green_marker.png"),
    iconSize: [45, 45],
})

const emptyMarker = new L.Icon({
    iconUrl: require("../../../img/green_marker.png"),
    iconSize: [45, 45],
})

const BasicMap = () => {

    const [centerLocation, setCenterLocation] = useState({lat: 46.77223350278075, lng: 23.585195329308466}) //init at AC
    const ZOOM_LEVEL = 18
    const [stationData, setStationData] = useState([]);
    

    
    // useLayoutEffect( () => { // TODO
    //     let unmounted = false;
        
    //     const response = await axios.get("/get-stations").then((response) => {
    //         if(!unmounted) {
    //             setStationData(response.data);
    //         }
    //       });
    
    //     return () => {
    //         unmounted = true;
    //       };
    // }, [])

    

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
            <Marker position={[46.77223350278075,23.585195329308466]} icon={availableMarker}>
                <Popup>
                    UTCN AC
                </Popup>
            </Marker>
    </MapContainer>
    )
}

export default BasicMap;
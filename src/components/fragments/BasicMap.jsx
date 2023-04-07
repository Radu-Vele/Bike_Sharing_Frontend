import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import { Button, Grid } from "@mui/material";
import axios from "../../api/customAxiosConfig/CustomAxiosConfig";

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

const BasicMap = () => {
    const centerLocation= {lat: 46.77223350278075, lng: 23.585195329308466};
    const[stationData, setStationData] = useState([]);
    const ZOOM_LEVEL = 18;
    const mapRef = useRef();
    const [markers,setMarkers] = useState([]);

    useEffect( () => {
        retrieveStations().then((response) => {
                setStationData(response.data);
                fun();  
          });
      }, [stationData])
    
    const retrieveStations = async () => {
        try {
            const response = await axios.get("/get-stations");
            if(response.status === 200) {
                return response;
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    

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
        //fetch stations here, enable selection between show stations/not (view vs edit mode), pick location
        const arr = stationData.map(item => (
            <Marker position={[item.latitude, item.longitude]} icon={chooseColor(item.bikeList.length, item.maximumCapacity)}>
                <Popup>
                    Station: {item.name}
                    <br></br>
                    Bikes available: {item.bikeList.length}
                    <br></br>
                    Capacity: {item.maximumCapacity}
                    {/* Add edit button */}
                </Popup>
            </Marker>
        )
        );
        setMarkers(arr);
    }

    const showStations = () => {

    }

    const enableSelection = () => {
        
    }

    return (
        <Grid container p={2} >
            <Grid item xs={4}>
                <Button onClick={fun}>
                    Refresh Stations
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={showStations}>
                    Toggle Show stations
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={enableSelection}>
                    Enable Coordinates Selection
                </Button>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
        </Grid>
    );
}

export default BasicMap;
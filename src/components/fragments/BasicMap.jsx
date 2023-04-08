import React from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import { Button, Grid, ToggleButton } from "@mui/material";
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

const BasicMap = ({editMode, setSelectedEditStation, handlePickCoordinatesOn }) => {
    const centerLocation= {lat: 46.77223350278075, lng: 23.585195329308466};
    const[stationData, setStationData] = useState([]);
    const ZOOM_LEVEL = 18;
    const mapRef = useRef();
    const [markers,setMarkers] = useState([]);
    const [showStations, setShowStations] = useState(true);
    const [pickCoordinatesOn, setPickCoordinatesOn] = useState(false);

    useEffect( () => {
        retrieveStations().then((response) => {
                setStationData(response.data);  
          });
      }, [])
    
    useEffect( () => {
        fun();
    }, [stationData]);

    useEffect(() => {
        handlePickCoordinatesOn(pickCoordinatesOn);
    }, [pickCoordinatesOn]);

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

    const handleEditStation = (name) => {
        setSelectedEditStation(name);
    };

    function handleExpand() {
        mapRef.current.invalidateSize();
    }
    
    const fun = function() {
        const arr = stationData.map(item => (
            <Marker position={[item.latitude, item.longitude]} icon={chooseColor(item.bikeList.length, item.maximumCapacity)}>
                <Popup>
                    Station: {item.name}
                    <br></br>
                    Bikes available: {item.bikeList.length}
                    <br></br>
                    Capacity: {item.maximumCapacity}
                    <br></br>
                    
                    { (editMode === true) && 
                        <Button
                            onClick={() => handleEditStation(item.name)}
                        >
                            Edit
                        </Button>
                    }
                </Popup>
            </Marker>
        )
        );
        setMarkers(arr);
    }

    function handleMapClick(event) {
        console.log("clicked");
        console.log(event);
    }

    return (
        <Grid container p={2} spacing={1}>
            <Grid item xs={3}>
                <Button onClick={fun}>
                    Refresh Stations
                </Button>
            </Grid>
            <Grid item xs={3}>
                <ToggleButton
                    value="check"
                    selected={showStations}
                    onChange={() => {
                    setShowStations(!showStations);
                    }}
                    color={"primary"}
                >
                    Show Stations
                </ToggleButton>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={handleExpand}>
                    Re-render
                </Button>
            </Grid>
            <Grid hidden={!editMode} item xs={3}>
                <ToggleButton
                  value="check"
                  selected={pickCoordinatesOn}
                  onChange={() => {
                    setPickCoordinatesOn(!pickCoordinatesOn);
                  }}
                  color={"primary"}
                >
                    Pick Coordinates
                </ToggleButton>
            </Grid>
            <Grid item xs={12}>
                <MapContainer center = {centerLocation}
                            zoom ={ZOOM_LEVEL}
                            ref = {mapRef}
                            scrollWheelZoom={true}
                            onClick={handleMapClick}
                        >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=1Lk3zVWEbHf7oKZYoIri"
                        />
                        {showStations && markers}
                </MapContainer>
            </Grid>
        </Grid>
    );
}

export default BasicMap;
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent} from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import { useMapEvents } from "react-leaflet";
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

/**
 * Map component suitable for the station app with available operations for both admin and user.
 * Operations:
 *  * retrieve stations and create markers (done on render) 
 *  * select a station to edit and send the name of it through the `setSelectedEditStation` method
 *  * pick coordinates on the map through clicking
 *      * need to set the pickCoordinatesOn to start capturing
 *      * send the ON/OFF value of the pick coordinates function through `handlePickCoordinatesOn`
 *      * send the value of the lat and lng through `setPickCoordinates`
 */
const BasicMap = ({editMode, setSelectedEditStation, handlePickCoordinatesOn, setPickedCoordinates }) => {
    const centerLocation= {lat: 46.77223350278075, lng: 23.585195329308466};
    const[stationData, setStationData] = useState([]);
    const ZOOM_LEVEL = 18;
    const mapRef = useRef();
    const [markers,setMarkers] = useState([]);
    const [showStations, setShowStations] = useState(true);
    const [pickCoordinatesOn, setPickCoordinatesOn] = useState(false);

    /**
     * Retrieve stations and populate the stationData - called upon startup
     */
    useEffect( () => {
        retrieveStations().then((response) => {
                setStationData(response.data);  
          });
    }, [])
    
    /**
     * Update map markers when stationData is updated
     */
    useEffect( () => {
        fun();
    }, [stationData]);

    /**
     * When pickCoordinatesOn value changes it is sent to the client
     */
    useEffect(() => {
        if(editMode) {
            handlePickCoordinatesOn(pickCoordinatesOn);
        }
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

    function handleMapClick(lat, lng) {
        setPickedCoordinates({lat:lat, lng:lng});
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

    const MapEvents = () => {
        useMapEvents({
            click(e) {
              handleMapClick(e.latlng.lat, e.latlng.lng);
            },
          });
          return false;
    }

    return (
        <Grid container p={2} spacing={1}>
            <Grid item xs={3}>
                <Button onClick={() => {
                        retrieveStations().then((response) => {
                            setStationData(response.data)});
                        }
                    }
                >
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
                        >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=1Lk3zVWEbHf7oKZYoIri"
                        />
                        {showStations && markers}
                        {pickCoordinatesOn && <MapEvents/>}
                </MapContainer>
            </Grid>
        </Grid>
    );
}

export default BasicMap;
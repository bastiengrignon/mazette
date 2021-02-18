import React, {useEffect, useState} from "react"
import {TileLayer, Marker, Popup, MapContainer} from "react-leaflet"
import {CRS, LatLng, LatLngExpression} from "leaflet"
import "leaflet-routing-machine"
import L from "leaflet"

interface MapProps {
    className?: string
}

const coordsMaze: LatLngExpression = [47.456060, -0.271910]
const coordsPayotte: LatLngExpression = [47.449973, -0.283195]
const defaultZoom = 14

const Maps: React.FC<MapProps> = ({className}) => {
    const [currentLocation, setCurrentLocation] = useState<LatLngExpression>([0, 0])
    const [map , setMap] = useState<L.Map>({} as L.Map)
    const [waypoints, setWaypoints] = useState<LatLng[]>([])

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position =>
                setCurrentLocation([position.coords.latitude, position.coords.longitude])
            )
        }
    }, [])

    const computeRoute = () => {
        setWaypoints([...waypoints, L.latLng(coordsPayotte[0], coordsPayotte[1])])
        setWaypoints([...waypoints, L.latLng(coordsMaze[0], coordsMaze[1])])
        L.Routing.control({
            waypoints: [
                L.latLng(currentLocation[0], currentLocation[1]),
                L.latLng(coordsPayotte[0], coordsPayotte[1])
            ],
            formatter: new L.Routing.Formatter({
                language: "fr",
                distanceTemplate: "{value} {unit}"
            }),/*
            plan: new L.Routing.Plan(waypoints, {
                language: "fr",
                addWaypoints: false,
                createMarker: (waypointIndex, waypoint) => {
                    return L.marker(waypoint.latLng, {
                        draggable: false,

                    })
                }
            }),*/
            addWaypoints: false,
            showAlternatives: false,
            show: true
        }).addTo(map)
        map.flyTo(coordsMaze, 14)
    }

    return (
        <MapContainer crs={CRS.EPSG900913} center={coordsMaze} zoom={defaultZoom} whenCreated={map1 => setMap(map1)}
            scrollWheelZoom={true} dragging={true} markerZoomAnimation={true}
            zoomAnimation={true} fadeAnimation={true} attributionControl={true}
            className={`w-full px-2 h-64 sm:h-96 ${className}`}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordsPayotte} draggable={false}>
                <Popup>
                    <div className="flex flex-col items-center font-bold">
                        <p>Le festival</p>
                        <button onClick={computeRoute}
                            className="font-semibold text-white bg-my-indigo border border-my-indigo rounded p-2 hover:bg-white hover:text-my-indigo focus:outline-none">
                            Itinéraire depuis ma position
                        </button>
                    </div>
                </Popup>
            </Marker>
            <Marker position={currentLocation} draggable={false}>
                <Popup>
                    <div className="font-bold">Ma position</div>
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Maps
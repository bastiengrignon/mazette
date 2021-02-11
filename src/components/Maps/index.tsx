import React, {useEffect, useState} from "react"
import {TileLayer, Marker, Popup, MapContainer, useMapEvents} from "react-leaflet"
import {CRS, LatLngExpression} from "leaflet"

interface MapProps {
    className?: string
}

const coordsMaze: LatLngExpression = [47.456060, -0.271910]
const coordsPayotte: LatLngExpression = [47.449973, -0.283195]
const defaultZoom = 14

const Maps: React.FC<MapProps> = ({className}) => {

    const onError = () => console.log("Error: Impossible to get current Location")

    const onChange = position => console.log(position.coords)

    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Available")
        } else {
            console.log("Not Available")
        }
        navigator.geolocation.getCurrentPosition(onChange, onError)
    }, [])

    return (
        <MapContainer crs={CRS.EPSG900913} center={coordsMaze} zoom={defaultZoom}
            scrollWheelZoom={true} dragging={true}
            zoomAnimation={true} fadeAnimation={true} attributionControl={true}
            className={`w-full px-2 h-64 sm:h-96 ${className}`}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordsPayotte}>
                <Popup>
                    <div className="font-bold">La payotte</div>
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Maps
import React from "react"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import {LatLngExpression} from "leaflet"

interface MapProps {
    className?: string
}

const coordsMaze: LatLngExpression = [47.456060, -0.271910]
const coordsPayotte: LatLngExpression = [47.449973, -0.283195]
const defaultZoom = 14

const Maps: React.FC<MapProps> = ({className}) => (
    <MapContainer center={coordsMaze} zoom={defaultZoom} scrollWheelZoom={false} dragging={true}
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

export default Maps
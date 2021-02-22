import React from "react"
import {TileLayer, Marker, Popup, MapContainer} from "react-leaflet"
import {CRS, LatLngExpression} from "leaflet"
import {GiPartyPopper} from "react-icons/all"

interface MapProps {
    className?: string
}

const coordsMaze: LatLngExpression = [47.456060, -0.271910]
const coordsPayotte: LatLngExpression = [47.449973, -0.283195]
const defaultZoom = 14

const Maps: React.FC<MapProps> = ({className}) => (
    <MapContainer crs={CRS.EPSG900913} center={coordsMaze} zoom={defaultZoom}
        scrollWheelZoom={true} dragging={true} markerZoomAnimation={true}
        zoomAnimation={true} fadeAnimation={true} attributionControl={true}
        className={`w-full px-2 h-64 sm:h-96 ${className}`}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href=" http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        <Marker position={coordsPayotte}>
            <Popup>
                <div className="inline-flex items-baseline text-2xl">
                    <GiPartyPopper/>
                    <div className="m-2">Le festival</div>
                    <GiPartyPopper/>
                </div>
            </Popup>
        </Marker>
    </MapContainer>
)

export default Maps
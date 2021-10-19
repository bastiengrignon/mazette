import React from 'react'
import { CRS, LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet-routing-machine'

interface MapProps {
    className?: string
}

const coordsMazette: LatLngExpression = [47.45028067952297, -0.2838168034840449]
const coordsPayotte: LatLngExpression = [47.449973, -0.283195]
const defaultZoom = 14
const popupCSS = 'font-bold text-lg sm:text-xl m-2'

const Maps: React.FC<MapProps> = ({ className = '' }) => (
    <MapContainer crs={ CRS.EPSG900913 } center={ coordsMazette } zoom={ defaultZoom }
        scrollWheelZoom={ true } dragging={ true } markerZoomAnimation={ true }
        zoomAnimation={ true } fadeAnimation={ true } attributionControl={ true }
        className={ `w-full px-2 h-64 sm:h-96 ${ className }` }>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        />
        <Marker position={ coordsMazette } draggable={ false }>
            <Popup>
                <span className={`${popupCSS} md:text-2xl text-green`}>Festival Mazette!</span>
            </Popup>
        </Marker>
        <Marker position={ coordsPayotte } draggable={ false }>
            <Popup>
                <span className={popupCSS}>La Payotte</span>
            </Popup>
        </Marker>
    </MapContainer>
)

export default Maps
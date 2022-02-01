import { CRS, LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import React, { useEffect, useState } from 'react'
import 'leaflet-routing-machine'

import { FESTIVAL_ID } from '../../constants'
import { FestivalService, IFestival } from '../../services/admin/festival'

interface MapProps {
    className?: string
}

const coordsMaze: LatLngExpression = [47.4554296, -0.2724533]
const defaultZoom = 14
const popupCSS = 'font-bold text-lg sm:text-xl m-2'

const Maps: React.FC<MapProps> = ({ className = '' }) => {
    const [festival, setFestival] = useState<IFestival>()

    useEffect(() => {
        FestivalService.getById(FESTIVAL_ID).then(setFestival)
    }, [])

    return (
        <MapContainer crs={ CRS.EPSG900913 } center={ coordsMaze } zoom={ defaultZoom }
            scrollWheelZoom={ true } dragging={ true } markerZoomAnimation={ true }
            zoomAnimation={ true } fadeAnimation={ true } attributionControl={ true }
            className={ `w-full px-2 h-64 sm:h-96 ${ className }` }>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
            />
            { festival?.location && <Marker
                position={ [festival?.location.latitude, festival?.location.longitude] as LatLngExpression }
                draggable={ false }>
                <Popup>
                    <span className={ `${ popupCSS } md:text-2xl text-green` }>Festival Mazette!</span>
                </Popup>
            </Marker>
            }
        </MapContainer>
    )
}

export default Maps
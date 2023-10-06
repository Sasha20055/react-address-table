import React, { useEffect, useRef, useState } from "react"
import { Map, Placemark, SearchControl, GeolocationControl } from "@pbe/react-yandex-maps"
import s from "./Map.module.sass"


const MapComp = React.memo((props) => {

  const placemarkRef = useRef(null);
  const mapRef = useRef(null)
  const mapDivRef = useRef(null)
  let [yMaps, setYmaps] = useState(null)

  useEffect(() => {scrollToBottom()}, [])

  //Получение адреса при смене маркера
  const getAddress = (coords) => {
    let Address
    placemarkRef.current.properties.set('iconCaption', 'поиск...')
    yMaps.geocode(coords).then(function (res) {
      let firstGeoObject = res.geoObjects.get(0)
      let iconCaptionData = []
      iconCaptionData = [
        // Название населенного пункта или вышестоящее административно-территориальное образование.
        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
      ]
      //Приходящий адрес
      Address = {
        city: iconCaptionData[0] ? iconCaptionData[0].filter(Boolean).join(', ') : "Неизвестно",
        fullAddress: iconCaptionData[0, 1] ? (iconCaptionData).filter(Boolean).join(', ') : "Неизвестно",
        width: coords[0],
        height: coords[1],
        widthHeight: coords
      }
      placemarkRef.current.properties
        .set({
          iconCaption: iconCaptionData,
          balloonContent: firstGeoObject.getAddressLine()
        });
      //Приходящий адрес прокидываем в state
      props.setMapAddressAction(Address)
    });
  }

  //Прокрутка вниз при окрытии карты
  const scrollToBottom = () => {
    mapDivRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const clickOnMap = (e) => {
    //Координаты
    let coords = e.get('coords')
    placemarkRef.current.geometry.setCoordinates(coords)
    let mapCoordsFin = {
      width: coords[0],
      height: coords[1]
    }
    props.setMapCoordsAction(mapCoordsFin)
    getAddress(coords)
    props.setIsAddingAction(false)
  }

  return (
    <div className={s.body} ref={mapDivRef}>
      <h1>Map</h1>
      <Map onClick={clickOnMap}
        onLoad={(ymaps) => {
          setYmaps(ymaps)
        }}
        instanceRef={mapRef} defaultState={{
          center: props.widthHeight,
          zoom: 9,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        modules={["control.ZoomControl", "control.FullscreenControl"]}>
        <Placemark instanceRef={placemarkRef} defaultGeometry={props.widthHeight} />
        <SearchControl options={{ float: "right" }} />
        <GeolocationControl options={{ float: "left" }} />
      </Map>
    </div >
  )
})
export default MapComp;
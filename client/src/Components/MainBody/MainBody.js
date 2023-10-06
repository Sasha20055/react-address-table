import React from "react"
import s from "./MainBody.module.sass"
import NewAddress from "./NewAddress/NewAddress"
import Search from "./Search/Search"
import Addresses from "./Addresses/Addresses"
import MapComp from "../MapComp/MapComp"


const MainBody = React.memo((props) => {
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.body}>
          <h1>Таблица адресов</h1>
          <Search findAddresses={props.findAddresses} />
          <Addresses addresses={props.addresses} foundAddresses={props.foundAddresses}
            deleteAddress={props.deleteAddress} isChangingAddAction={props.isChangingAddAction}
            getAddress={props.getAddress} searchOnMap={props.searchOnMap}
            changingAddress={props.changingAddress} isMaping={props.isMaping} />
          <NewAddress addAddress={props.addAddress} isChangingAdd={props.isChangingAdd}
            changeAddress={props.changeAddress} AddrIdChanging={props.AddrIdChanging}
            changingAddress={props.changingAddress} isChangingAddAction={props.isChangingAddAction}
            mapCoords={props.mapCoords} mapNewAddress={props.mapNewAddress}
            isMaping={props.isMaping} setIsAddingAction={props.setIsAddingAction} isAdding={props.isAdding}
            isMapingAction={props.isMapingAction} />
        </div>
        {props.isMaping && <MapComp mappingAddress={props.mappingAddress} widthHeight={props.widthHeight}
          isChangingAddAction={props.isChangingAddAction} isChangingAdd={props.isChangingAdd}
          setMapCoordsAction={props.setMapCoordsAction} setMapAddressAction={props.setMapAddressAction}
          setIsAddingAction={props.setIsAddingAction} />}
      </div>
    </>
  )
})

export default MainBody

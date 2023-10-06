import React, { useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import {
  findAddresses, setAddresses, addAddress,
  deleteAddress, changeAddress, isChangingAddAction,
  getAddress, searchOnMap, setMapCoordsAction, setMapAddressAction,
  setIsAddingAction, isMapingAction
} from "../../redux/mainBodyReducer"
import MainBody from "./MainBody"

const MainBodyContainer = React.memo((props) => {
  useEffect(() => {
    props.setAddresses()
  }, [])

  return (
    <>
      <MainBody {...props}/>
    </>
  )
})

let mapStateToProps = (state) => {
  return {
    addresses: state.mainBody.addresses,
    foundAddresses: state.mainBody.foundAddresses,
    isChangingAdd: state.mainBody.isChangingAdd,
    AddrIdChanging: state.mainBody.AddrIdChanging,
    changingAddress: state.mainBody.changingAddress,
    isMaping: state.mainBody.isMaping,
    mappingAddress: state.mainBody.mapingAddress,
    widthHeight: state.mainBody.mapingAddress.widthHeight,
    mapCoords: state.mainBody.mapCoords,
    mapNewAddress: state.mainBody.mapNewAddress,
    isAdding: state.mainBody.isAdding
  }
}
export default compose(
  connect(mapStateToProps, {
    setAddresses, findAddresses, addAddress,
    deleteAddress, changeAddress, isChangingAddAction,
    getAddress, searchOnMap, setMapCoordsAction,
    setMapAddressAction, setIsAddingAction,
    isMapingAction
  })
)(MainBodyContainer);

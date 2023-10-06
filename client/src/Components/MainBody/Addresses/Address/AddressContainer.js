import React from "react"
import Address from "./Address"

const AddressContainer = React.memo((props) => {
  const deleteAddr = () => {
    props.deleteAddress(props.id)
  }

  const searchMap = () => {
    props.isChangingAddAction(false)
    props.searchOnMap(props.id)
  }

  const changeAdd = async () => {
    if (props.changingAddress.id != props.id && !props.isMaping) {
      let isFalse = await props.isChangingAddAction(false)
      props.getAddress(props.id)
      props.isChangingAddAction(true)
    }
  }

  return (
    <>
      <Address {...props} deleteAddr={deleteAddr} searchMap={searchMap}
        changeAdd={changeAdd} city={props.city} fullAddress={props.fullAddress}
        width={props.width} height={props.height} />
    </>
  )
})


export default AddressContainer 
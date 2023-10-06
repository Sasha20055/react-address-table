import React from "react"
import s from "./Addresses.module.sass"
import AddressContainer from "./Address/AddressContainer"

const Addresses = React.memo((props) => {
  return (
    <div className={s.body}>
      {
        props.addresses.map(address =>
          <AddressContainer key={address.id} id={address.id} city={address.city}
            fullAddress={address.fullAddress} width={address.width}
            height={address.height} deleteAddress={props.deleteAddress} 
            isChangingAddAction={props.isChangingAddAction} 
            getAddress={props.getAddress} searchOnMap={props.searchOnMap}
            changingAddress={props.changingAddress} isMaping={props.isMaping}/>
        )
      }
    </div>
  )
})

export default Addresses
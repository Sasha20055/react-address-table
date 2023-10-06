import React from "react"
import s from "./Address.module.sass"

const Address = React.memo((props) => {
  return (
    <div className={s.body}>
      <div className={s.adressInfo}>
        <div className={s.frstSection}>
          <p className={s.city}>{props.city}</p>
          <p className={s.width}>{props.width}</p>
          <p className={s.height}>{props.height}</p>
        </div>
        <div className={s.secSection}>
          <button className={s.change} onClick={props.changeAdd}/>
          <p className={s.fullAddress}>{props.fullAddress}</p>
        </div>
      </div>
      <div className={s.tools}>
        <button className={s.map} onClick={props.searchMap}/>
        <button className={s.delete} onClick={props.deleteAddr}/>
      </div>
    </div>
  )
})


export default Address
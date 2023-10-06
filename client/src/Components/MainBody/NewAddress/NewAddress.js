import React, { useEffect } from "react"
import { reduxForm } from "redux-form"
import { required } from "../../../utilities/validation"
import { createForm, Input } from "../../Common/FormControls/FormControls"
import s from "./NewAddress.module.sass"
import './NewAddressForms.sass'

const NewAddress = React.memo((props) => {

  useEffect(() => {
    if (props.isChangingAdd && props.isAdding) {
      props.setIsAddingAction(false)
    }
    if (props.isMaping && !props.isAdding && !props.isChangingAdd) {
      props.setIsAddingAction(true)
    }
  })

  //Submit Добавления строки
  const onSubmitAdd = (formData) => {
    props.addAddress(formData.city, formData.fullAddress,
      formData.width, formData.height)
    props.setIsAddingAction(false)
    if (props.isMaping) {
      props.isMapingAction(false)
    }
  }

  //Submit смены данных в строке
  const onSubmitChange = (formData) => {
    props.changeAddress(props.changingAddress.id, formData.city, formData.fullAddress,
      formData.width, formData.height)
  }

  const startToAdding = () => {
    props.setIsAddingAction(true)
  }

  const closeToChanging = () => {
    props.isChangingAddAction(false)
  }

  const closeToAdding = () => {
    if (props.isMaping) {
      props.isMapingAction(false)
    }
    props.setIsAddingAction(false)
  }

  return (
    <div className={s.body}>
      {props.isChangingAdd && <AddressInfoReduxForm onSubmit={onSubmitChange} initialValues={props.changingAddress} />}
      {props.isChangingAdd && <button className={s.addBtn} onClick={closeToChanging}>Убрать</button>}
      {props.isAdding && <AddressInfoReduxForm onSubmit={onSubmitAdd} initialValues={props.mapNewAddress} />}
      {props.isAdding && <button className={s.addBtn} onClick={closeToAdding}>Убрать</button>}
      {!props.isAdding && !props.isChangingAdd ? <button className={s.addBtn} onClick={startToAdding}>Добавить</button> : null}
    </div>
  )
})

const AddressInfo = React.memo((props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.adressInfo}>
      <div className={s.frstSection}>
        {createForm("city", Input, "text", "Ваш Город...", [required])}
        {createForm("width", Input, "text", "Широта...", [required])}
        {createForm("height", Input, "text", "Долгота...", [required])}
      </div>
      <div className={s.secSection}>
        {createForm("fullAddress", Input, "text", "Страна, город, улица, дом, квартира...", [required])}
        <button>Сохранить</button>
      </div>
    </form>
  )
})

const AddressInfoReduxForm = reduxForm({ form: 'AddressInfo' })(AddressInfo)

export default NewAddress
import React from 'react';
import { Field } from 'redux-form';
import s from './FormControls.module.sass'

export const Input = ({ input, meta: { touched, error }, ...props }) => {
  const hasError = touched && error
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "") + " " + "formControl"}>
      <div className={s.inputDiv}>
        {hasError && <span className={s.someError}>{error}</span>}
        <input {...input} {...props} className={s.input} />
      </div>
    </div>
  )
}

export const createForm = (name, component, type, placeholder = "", validators = [], props = {}) => {
  return (<div className={'form-' + name}>
    <Field
      name={name}
      component={component}
      type={type}
      placeholder={placeholder}
      validate={validators}
      {...props}
    />
  </div>)
}
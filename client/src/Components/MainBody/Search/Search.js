import React from "react"
import { reduxForm } from "redux-form"
import { createForm, Input } from "../../Common/FormControls/FormControls"
import s from "./Search.module.sass"

const Search = React.memo((props) => {
  const onSubmit = (formData) => {
    props.findAddresses(formData.search)
  }
  return (
    <div className={s.body}>
      <SearchFormReduxForm onSubmit={onSubmit} />
    </div>
  )
})

const SearchForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.SearchForm + " " + "SearchForm"}>
      {createForm("search", Input, "text", "Введите город или адрес...", [])}
      <button className={s.btnSubmit}/>
    </form>
  )
}

const SearchFormReduxForm = reduxForm({ form: 'SearchForm' })(SearchForm)

export default Search
import axios from 'axios';

const instanse = axios.create({
  baseURL: 'http://localhost:3000'
})

export const getAddressesAs = () => {
  return instanse.get('/api/addresses')
    .then(response => {
      return response.data
    })
}

export const getAddressAs = (addressId) => {
  return instanse.get(`/api/addresses/${addressId}`)
    .then(response => {
      return response.data
    })
}

export const searchAddressCityAs = (city) => {
  return instanse.get(`/api/addressesSearch?city=${city}`)
    .then(response => {
      return response.data
    })
}
export const searchAddressFullAddressAs = (fullAddress) => {
  return instanse.get(`/api/addressesSearch?fullAddress=${fullAddress}`)
    .then(response => {
      return response.data
    })
}

export const deleteAddressAs = (addressId) => {
  return instanse.delete(`/api/addresses/${addressId}`)
    .then(response => {
      return response.data
    })
}

export const changeAddressAs = (id, city, fullAddress, width, height) => {
  return instanse.put('/api/addresses', {id, city, fullAddress, width, height})
    .then(response => {
      return response.data
    })
}

export const createAddressAs = (city, fullAddress, width, height) => {
  return instanse.post('/api/addresses', {city, fullAddress, width, height})
    .then(response => {
      return response.data
    })
}
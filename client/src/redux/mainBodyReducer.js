import {
  getAddressesAs, searchAddressCityAs, searchAddressFullAddressAs,
  createAddressAs, deleteAddressAs, changeAddressAs, getAddressAs
} from "../api/api"
const SET_ADDRESSES = "mainBody/SET-ADDRESSES"
const FIND_ADDRESSES = "mainBody/FIND-ADDRESSES"
const DELETE_ADDRESS = "mainBody/DELETE-ADDRESS"
const ADD_ADDRESS = "mainBody/ADD-ADDRESS"
const IS_CHANGING = "mainBody/IS-CHANGING"
const CHANGING_ADDRESS = "mainBody/CHANGING-ADDRESS"
const MAPING_ADDRESS = "mainBody/MAPING-ADDRESS"
const IS_MAPING = "mainBody/IS-MAPING"
const SET_COORDS = "mainBody/SET-COORDS"
const SET_MAP_ADDRESS = "mainBody/SET-MAP-ADDRESS"
const SET_IS_ADDING = "mainBody/SET-IS-ADDING"

let initialState = {
  addresses: [],
  table: {},
  isChangingAdd: false,
  isAdding: false,
  changingAddress: [],
  mapingAddress: [],
  isMaping: false,
  mapCoords: [],
  mapNewAddress: []
}

const mainBodyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.addresses
      }
    case FIND_ADDRESSES:
      return {
        ...state,
        addresses: [...action.foundAddresses, ...state.addresses]
          .filter(({ id }) => (!state.table[id] && (state.table[id] = 1))),
        table: {}
      }
    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(address => address.id !== action.addressId)
      }
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.address]
      }
    case IS_CHANGING:
      return {
        ...state,
        isChangingAdd: action.isChange
      }
    case CHANGING_ADDRESS:
      return {
        ...state,
        changingAddress: action.address
      }
    case MAPING_ADDRESS:
      return {
        ...state,
        mapingAddress: action.address
      }
    case IS_MAPING:
      return {
        ...state,
        isMaping: action.isMaping
      }
    case SET_COORDS:
      return {
        ...state,
        mapCoords: action.coords
      }
    case SET_MAP_ADDRESS:
      return {
        ...state,
        mapNewAddress: action.address
      }
    case SET_IS_ADDING:
      return {
        ...state,
        isAdding: action.isAdding
      }
    default:
      return state;
  }
}

export const setAddressesAction = (addresses) => ({ type: SET_ADDRESSES, addresses })
export const findAddressesAction = (foundAddresses) => ({ type: FIND_ADDRESSES, foundAddresses })
export const deleteAddressAction = (addressId) => ({ type: DELETE_ADDRESS, addressId })
export const addAddressAction = (address) => ({ type: ADD_ADDRESS, address })
export const isChangingAddAction = (isChange) => ({ type: IS_CHANGING, isChange })
export const setChangeAddressAction = (address) => ({ type: CHANGING_ADDRESS, address })
export const setMapingAddressAction = (address) => ({ type: MAPING_ADDRESS, address })
export const isMapingAction = (isMaping) => ({ type: IS_MAPING, isMaping })
export const setMapCoordsAction = (coords) => ({ type: SET_COORDS, coords })
export const setMapAddressAction = (address) => ({ type: SET_MAP_ADDRESS, address })
export const setIsAddingAction = (isAdding) => ({ type: SET_IS_ADDING, isAdding })

export const searchOnMap = (addressId) => async (dispatch) => {
  dispatch(isMapingAction(false))
  let data = await getAddressAs(addressId)
  dispatch(setMapingAddressAction(data))
  dispatch(isMapingAction(true))
}

export const setAddresses = () => async (dispatch) => {
  let data = await getAddressesAs()
  dispatch(setAddressesAction(data))
}

export const getAddress = (addressId) => async (dispatch) => {
  let data = await getAddressAs(addressId)
  dispatch(setChangeAddressAction(data))
}

export const addAddress = (city, fullAddress, width, height) => async (dispatch) => {
  let data = await createAddressAs(city, fullAddress, width, height)
  dispatch(addAddressAction(data))
}

export const deleteAddress = (addressId) => async (dispatch) => {
  await deleteAddressAs(addressId)
  dispatch(deleteAddressAction(addressId))
}

export const changeAddress = (id, city, fullAddress, width, height) => async (dispatch) => {
  let data = await changeAddressAs(id, city, fullAddress, width, height)
  dispatch(setAddresses())
  dispatch(isChangingAddAction(false))
}

export const findAddresses = (location) => async (dispatch) => {
  let data1 = await searchAddressCityAs(location)
  let data2 = await searchAddressFullAddressAs(location)
  let data = data1.concat(data2)
  dispatch(findAddressesAction(data))
}


export default mainBodyReducer;
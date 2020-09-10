import filterValuesInit from './filterValuesInit'
import { SET_FILTERS, CLEAN_FILTERS, SET_SORT, SET_ZIPCODE } from './types'

export const initialState = {
  filters: filterValuesInit,
  sort: ['featured', 'dsc'],
  zipCode: {
    zipCode: global.window ? global.window.localStorage.getItem('pp_zipcode') : {},
    coverage: global.window ? JSON.parse(global.window.localStorage.getItem('pp_zipcode_coverage')) : {}
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filter]: {
            ...state.filters[action.payload.filter],
            values: {
              ...state.filters[action.payload.filter].values,
              [action.payload.value]: {
                ...state.filters[action.payload.filter].values[action.payload.value],
                status: !state.filters[action.payload.filter].values[action.payload.value].status
              }
            }
          }
        }
      }
    case CLEAN_FILTERS:
      return {
        ...state,
        filters: filterValuesInit
      }
    case SET_SORT:
      return {
        ...state,
        sort: action.payload.sorted
      }
    case SET_ZIPCODE:
      return {
        ...state,
        zipCode: action.payload
      }
    default:
      return state
  }
}

export default reducer

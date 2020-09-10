import React, { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

import rootReducer, { initialState } from './reducer'
import { SET_FILTERS, CLEAN_FILTERS, SET_SORT, SET_ZIPCODE } from './types'

const Context = createContext()

export const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

GlobalState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

function useGlobalState () {
  const [state, dispatch] = useContext(Context)

  const setFilters = ({ filter, value }) => {
    dispatch({
      type: SET_FILTERS,
      payload: {
        filter,
        value
      }
    })
  }

  const cleanFilters = () => {
    dispatch({
      type: CLEAN_FILTERS,
      payload: {}
    })
  }

  const setSort = (sorted) => {
    dispatch({
      type: SET_SORT,
      payload: {
        sorted
      }
    })
  }

  const setZipCode = zipCode => {
    dispatch({
      type: SET_ZIPCODE,
      payload: zipCode
    })
  }

  return {
    setFilters,
    cleanFilters,
    setSort,
    setZipCode,
    filters: { ...state.filters },
    sort: state.sort,
    zipCode: state.zipCode
  }
}

export default useGlobalState

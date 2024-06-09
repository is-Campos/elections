import {configureStore} from '@reduxjs/toolkit'
import candidatosReducer from './candidatosSlice'

export const store = configureStore({
  reducer: {
    candidatos: candidatosReducer
  },
})
import {configureStore} from '@reduxjs/toolkit'
import candidatosReducer from './candidatosSlice'
import votacionReducer from './votacionSlice'

export const store = configureStore({
  reducer: {
    candidatos: candidatosReducer,
    votacion: votacionReducer
  },
})
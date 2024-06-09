import {createSlice} from '@reduxjs/toolkit'
import {presidentesMexico} from '../data/candidatos'

const initialState = {
  value: presidentesMexico
}

export const candidatosSlice = createSlice({
  name: 'candidatos',
  initialState,
  reducers: {
    setCandidatosMostrados: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {setCandidatosMostrados} = candidatosSlice.actions
export default candidatosSlice.reducer
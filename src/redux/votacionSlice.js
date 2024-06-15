import {createSlice} from '@reduxjs/toolkit'
import { candidaturas } from '../data'

const keyValueVotosArray = candidaturas.map((candidatura, index) => {
  return {key: candidatura.id, value: "anulado"}
})

const initialState = {
  value: keyValueVotosArray
}

export const votacionSlice = createSlice({
  name: 'votacion',
  initialState,
  reducers: {
    setVotos: (state, action) => {
      state.value = state.value.map((voto, index) => {
        return {
          ... voto,
          value: action.payload[index]
        }
      })
    }
  }
})

export const {setVotos} = votacionSlice.actions
export default votacionSlice.reducer
import * as mutations from './mutation-types'
import axios from 'axios'

export const getNotes = ({ commit }) => {
  axios.get('https://noted-97b32.firebaseio.com/notes.json')
    .then(res => {
      let notes = []
      for (let i in res.data) {
        notes.push(res.data[i])
      }
      commit(mutations.SET_NOTES, notes)
    })
    .catch(err => {
      console.error(err)
    })
}

export const saveNote = ({ commit, dispatch, state }) => {
  commit(mutations.TOUCH_LAST_SAVED)

  if (state.note.id === null) {
    commit(mutations.SET_CURRENT_NOTE_ID, Date.now())

    // commit(mutations.PREPEND_TO_NOTES, state.note)
  }

  dispatch('storeNotes')
  dispatch('getNotes')
}

export const storeNotes = ({ state }) => {
  // localStorage.setItem('notes', JSON.stringify(state.notes))
  if (state.note.id !== null) {
    axios.put('https://noted-97b32.firebaseio.com/notes/' + state.note.id + '.json', state.note)
  } else {
    axios.post('https://noted-97b32.firebaseio.com/notes.json', state.note)
  }
}

export const openNote = ({ commit }, note) => {
  commit(mutations.SET_CURRENT_NOTE, note)
}

export const deleteNote = ({ commit, dispatch, state }, id) => {
  if (id === state.note.id) {
    dispatch('clearCurrentNote')
  }
  commit(mutations.DELETE_NOTE, id)

  // dispatch('storeNotes')
  dispatch('getNotes')
}

export const startSaveTimeout = ({ commit, dispatch, state }) => {
  if (state.saveTimeout !== null) {
    return
  }

  commit(mutations.SET_SAVE_TIMEOUT, {
    callback () {
      dispatch('saveNote')
      dispatch('stopSaveTimeout')
    },
    delay: 1000
  })
}

export const stopSaveTimeout = ({ commit, dispatch, state }) => {
  commit(mutations.CLEAR_SAVE_TIMEOUT)
}

export const clearCurrentNote = ({ commit, dispatch }) => {
  dispatch('stopSaveTimeout')

  commit(mutations.SET_CURRENT_NOTE, null)
}

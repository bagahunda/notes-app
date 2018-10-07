import { defaultNoteState } from './defaults'
import { clone } from 'lodash'

export default {
  note: clone(defaultNoteState),
  notes: [],
  saveTimeout: null
}

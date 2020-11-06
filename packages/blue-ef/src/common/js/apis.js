
export let API_REGISTER = '/api/users/register'
export let API_LOGIN = '/api/users/login'
export let API_AUTH = '/auth'
export let API_LOGOUT = '/auth/logout'

export let API_GET_NOTEBOOK = '/api/notebooks'
export let API_ADD_NOTEBOOK = '/api/notebooks' /** POST */
export let API_UPDATE_NOTEBOOK = '/api/notebooks/:notebookId' /** PATCH */
export let API_DELETE_NOTEBOOK = '/api/notebooks/:notebookId' /** DELETE */


export let API_ADD_NOTE = '/api/notes' /** POST */
export let API_GET_NOTE = '/api/notes/:params'
export let API_GET_NOTE_DETAIL = '/api/notes/:noteId'
export let API_DELETE_NOTE = '/api/notes/:noteId' /** DELETE */
export let API_UPDATE_NOTE = '/api/notes/:noteId' /** UPDATE */
export let API_CONFIRM_DELETE_NOTE = '/notes/:noteId/confirm' /** DELETE */
export let API_REVERT_NOTE = '/notes/:noteId/revert' /** PATCH */
export let API_GET_TRASH = '/notes/trash'
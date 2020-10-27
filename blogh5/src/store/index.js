import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    username: localStorage.getItem('username') || '未登录',
    noteId: -1,
    notebookId: -1,
    selectedNotebook: {},
    currentNote: {},
    isPublic: '0',
    trashNote: {},
    allTrashNotes: [],
    allNotes: [],
    richText: '',
    user: {},
    selectedNoteIndex: -1,
    notebooksList: [],
  },
  mutations: {
    setIsPublic(state, data) {
      state.isPublic = data;
    },
    setSelectedNotebook(state, data) {
      state.selectedNotebook = data;
    },
    setNotebooksList(state, data) {
      state.notebooksList = data;
    },
    setSelectedNoteIndex(state, data) {
      state.selectedNoteIndex = data;
    },
    setUser(state, user) {
      state.user = user;
    },
    changeIsLogin(state, payload) {
      state.isLogin = payload;
    },
    setUsername(state, payload) {
      state.username = payload;
    },
    setNoteId(state, noteId) {
      state.noteId = noteId;
    },
    setNotebookId(state, notebookId) {
      state.notebookId = notebookId;
    },
    setCurrentNote(state, n) {
      state.currentNote = n;
      state.isPublic = n.is_public;
    },
    setNoteContent(state, note) {
      state.currentNote.content = note;
    },
    seCurrenttNotebook(state, notebook) {
      state.currentNote.notebook_id = notebook.id;
      state.currentNote.notebook = notebook;
    },
    setNoteTitle(state, title) {
      state.currentNote.title = title;
    },
    setAllNotes(state, notes) {
      state.allNotes = notes;
    },
    setTrashNote(state, note) {
      state.trashNote = note;
    },
    setAllTrashNotes(state, notes) {
      state.allTrashNotes = notes;
    },
    setRichText(state, rich) {
      state.richText = rich;
    },
  },
  getters: {
    notebookTotal: (state) => {
      return state.notebooksList.length;
    },
  },
  actions: {},
});

export default store;

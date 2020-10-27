import axios from 'axios'
import Cookies from 'js-cookie';

import { 
  API_GET_NOTEBOOK, 
  API_ADD_NOTEBOOK, 
  API_UPDATE_NOTEBOOK, 
  API_DELETE_NOTEBOOK,
  API_ADD_NOTE,
  API_GET_NOTE,
  API_DELETE_NOTE,
  API_UPDATE_NOTE,
  API_GET_TRASH,
  API_CONFIRM_DELETE_NOTE,
  API_REVERT_NOTE,
  API_GET_NOTE_DETAIL
} from './apis'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = process.env.VUE_APP_ENV==='development' ? '' : process.env.VUE_APP_API_HOST;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const conf = { ...config };
    conf.validateStatus = status => status >= 200 && status <= 505;
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`;
    }
    return conf;
  },
  error => Promise.reject(error), // 返回接口返回的错误信息
);

// 解决前后端跨域问题产生的cookie不生效
axios.defaults.withCredentials = true

export function getDataByGet(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getDataByPost(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getNotebooks(name, uid) {
  return new Promise((resolve, reject) => {
    let url = API_GET_NOTEBOOK
    let userid = localStorage.getItem('userid') || uid

    if(userid){
      url = url + '?userid=' + userid
    }
    if(name){
      url = url + '&name=' + name
    }
    
    axios.get(url).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addNotebook(title) {
  return new Promise((resolve, reject) => {
    axios.post(API_ADD_NOTEBOOK, {
      name: title
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateNotebook(id, title) {
  return new Promise((resolve, reject) => {
    let API = API_UPDATE_NOTEBOOK.replace(':notebookId', id)
    axios.put(API, {
      name: title
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteNotebook(id) {
  return new Promise((resolve, reject) => {
    let API = API_DELETE_NOTEBOOK.replace(':notebookId', id)
    axios.delete(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addNote(notebookId, title, content) {
  return new Promise((resolve, reject) => {
    axios.post(API_ADD_NOTE, {
      notebook_id: notebookId,
      title: title,
      content: content
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getNote(params) {
  return new Promise((resolve, reject) => {
    let API = API_GET_NOTE.replace('/:params', `?limit=${params.pageSize}&offset=${(params.page - 1) * params.pageSize }${params.notebookId? '&notebookId=' + params.notebookId : ''}`)
    let userid = params.userid || localStorage.getItem('userid')
    if(userid){
      API = API + '&userid=' + userid
    }
    if(params.is_public){
      API = API + '&is_public=' + params.is_public
    }
    axios.get(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getNoteDetail(noteId) {
  return new Promise((resolve, reject) => {
    let API = API_GET_NOTE_DETAIL.replace('/:noteId', `/${noteId}`)
    axios.get(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteNote(noteId) {
  return new Promise((resolve, reject) => {
    let API = API_DELETE_NOTE.replace(':noteId', noteId)
    axios.delete(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateNote(data) {
  return new Promise((resolve, reject) => {
    let API = API_UPDATE_NOTE.replace(':noteId', data.id)
    let body = {}
    if(data.title){
      body.title = data.title
    }
    if(data.content){
      body.content = data.content
    }
    if(data.notebook_id){
      body.notebook_id = data.notebook_id
    }
    axios.patch(API, body).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getTrash() {
  return new Promise((resolve, reject) => {
    axios.get(API_GET_TRASH).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function revertNote(noteId) {
  return new Promise((resolve, reject) => {
    let API = API_REVERT_NOTE.replace(':noteId', noteId)
    axios.patch(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteTrash(noteId) {
  return new Promise((resolve, reject) => {
    let API = API_CONFIRM_DELETE_NOTE.replace(':noteId', noteId)
    axios.delete(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

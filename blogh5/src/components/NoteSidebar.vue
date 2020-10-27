<template>
  <div class="note-sidebar">
    <div class="note-header">
      <Dropdown style="margin-right: 40px;">
        <div class="dropdown-title-box">
          <div class="dropdown-title">
            <span style="margin-right:4px;">{{ selectedNotebook.id ? selectedNotebook.name : '全部笔记' }}</span>
            <Icon type="ios-arrow-down" color="#29b6f6"/>
          </div>
        </div>
        <DropdownMenu slot="list">
          <DropdownItem>
              <span @click="doGetNote({})">全部笔记</span>
          </DropdownItem>
          <DropdownItem 
            v-for="notebook in notebooks" 
            :key="notebook.id"
            style="padding:12px 16px">
            <span @click="doGetNote(notebook)">{{ notebook.name }}</span>
          </DropdownItem>
          <!-- <DropdownItem>
            <span @click="toTrash">废纸篓</span>
          </DropdownItem> -->
        </DropdownMenu>
      </Dropdown>
      <Button @click="doAddNote" class="add-note-btn" size="small" type="primary" ghost>添加笔记</Button>
    </div>
    <div class="note-tab">
      <div class="update-time-tab" v-if="false">更新时间</div>
      <div class="title-tab">标题</div>
    </div>
       <ul 
         class="note-list" 
         v-infinite-scroll="loadMore" 
         infinite-scroll-distance="20"
         infinite-scroll-immediate-check="false"
       >
          <li @click="doRouterNoteCurrentNotebook(note.notebook_id, note.id, index)" :class="{ 'note-item-active': index === selectedNoteIndex }" class="note-item" v-for="(note, index) in allNotes" :key="note.id">
            <div class="note-update-time">{{ dayjs(note.updated_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
            <div class="note-title">{{ note.title }}</div>
          </li>
          <li class="note-item" style="justify-content: center;" v-if="scrollDisabled">
            <span>加载全部</span>
          </li>
      </ul>
  </div>
</template>

<script>
  import { getNotebooks, getNote, addNote, getNoteDetail } from '../common/js/request.js'
  import { friendlyDate } from '../common/js/util.js'
  import { mapState, mapMutations } from 'vuex'
  import dayjs from 'dayjs'

  export default {
    name: 'NoteSiderbar',
    created() {
      this._getNotebooks()
    },
    data() {
      return {
        dayjs: dayjs,
        notebooks: [],
        addNoteTitleModal: false,
        newNoteTitle: '',
        page: 1,
        pageSize: 20,
        scrollDisabled: false
      }
    },
    computed: {
      ...mapState([
        'allNotes',
        'selectedNoteIndex',
        'currentNote',
        'notebookId',
        'selectedNotebook'
      ])
    },
    methods: {
      ...mapMutations(['setSelectedNoteIndex', 'setCurrentNote', 'setAllNotes', 'setSelectedNotebook']),
      loadMore(){
        this.page += 1
        console.log('loadMore')
        this._getNote(this.selectedNotebook.id || null, true)
      },
      toTrash() {
        this.$router.push({
          path: '/trash'
        })
      },
      doAddNote() {
        addNote(this.selectedNotebook.id || null, '', '').then(({ data }) => {
          this.setCurrentNote({})
          this.page = 1
          this._getNote(this.selectedNotebook.id || null)
        }).catch(err => {
          this.$Message.error('添加笔记失败')
        })
      },
      cancel() {
        this.$Message.info('取消新建笔记')
      },
      doRouterNoteCurrentNotebook(notebookId, noteId, index) {
        this.setSelectedNoteIndex(index)
        this.$store.commit('setNotebookId', notebookId)
        this.$store.commit('setNoteId', noteId)
         getNoteDetail(noteId).then(({ data }) => {
            this.setCurrentNote(data)
            let path =`/note?noteId=${noteId}`
            if(notebookId){
              path += `&notebookId=${notebookId}`
            }
            this.$router.push({
              path
            })
          }).catch(err => {
            // this.$Message.error('获取笔记失败')
          })
    
      },
      doGetNote(notebook) {
        // this._getNote(notebook.id)
        this.setSelectedNotebook(notebook);
        this.setCurrentNote({})
        let path = '/note'
        if(notebook.id){
          path += `?notebookId=${notebook.id}`
        }
        this.$router.push({
          path
        })
        this.page = 1
        this._getNote(notebook.id || null)
      },
      _getNote(notebookId, more) {
        getNote({
          page: this.page,
          pageSize: this.pageSize,
          notebookId: notebookId
        }).then(({data}) => {
          if(more){
            if (data.length ===0) {
              this.page--;
              this.scrollDisabled = true
            } else {
              this.scrollDisabled = false
            }
            let list = this.allNotes.concat(data)
            this.setAllNotes(list)
          } else {
            this.scrollDisabled = false
            this.setAllNotes(data)
          }
          if(!this.currentNote.id){
            this.setSelectedNoteIndex(0)
            getNoteDetail(this.allNotes[0].id).then(({data}) => {
              this.setCurrentNote(data)
              let path = `/note?noteId=${data.id}`
              if(notebookId){
                path+=`&notebookId=${notebookId}`
              }
              this.$router.push({
                path
              })
            })
          }
          if (this.allNotes.length === 0) {
            this.$Message.info('该笔记本下暂无笔记')
          }
        })
      },
      _getNotebooks() {
         getNotebooks().then(({data}) => {
          this.notebooks = data.data
          this.page = 1
          this._getNote(this.selectedNotebook.id || null)
        })
      },
      _formateDate(dateStr) {
        return friendlyDate(dateStr)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/variables.styl';
  @import '../common/stylus/styles.styl';
  .note-sidebar
    width 300px
    height 100vh
    display: flex;
    flex-flow: column nowrap
    background-color $notebook-bg
    margin-left 100px
    border-right 1px solid $line-color
    .note-header
      text-align center
      padding 15px 0
      border-bottom 1px solid $line-color
      position relative
      .dropdown-title-box
        display: flex
        .dropdown-title
          max-width: 150px
          margin-right: 6px
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
          text-align: center
          color: #29b6f6
      .add-note-btn
        position absolute
        right 5px
        top 12px
    .note-tab
      display flex
      font-size 14px
      border-bottom 1px solid $line-color
      .update-time-tab, .title-tab
        padding 10px
        flex 1
      .update-time-tab
        border-right 1px solid $line-color
    .note-list
      font-size 13px
      flex: 1
      overflow: auto
      .note-item
        display flex
        padding 10px
        border-bottom 1px solid $line-color
        cursor pointer
        transition all .3s
        &.note-item-active
          background-color $theme-color
          color #fff
        &:hover
          background-color $theme-color
          color #fff
        .note-update-time, .note-title
          flex 1
        .note-title
          padding-left 20px
</style>
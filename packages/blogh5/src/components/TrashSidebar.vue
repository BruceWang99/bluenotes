<template>
  <div class="trash-sidebar">
    <div class="trash-header">
      废纸篓
    </div>
    <div class="trash-tab">
      <div class="update-time-tab">更新时间</div>
      <div class="title-tab">标题</div>
    </div>
    <ul class="trash-list">
      <li @click="doRouterTrash(note, index)" class="trash-item" :class="{ 'trash-item-active': index === liIndex }" v-for="(note, index) in allTrashNotes" :key="note.id">
        <div class="trash-update-time">{{ _formateDate(note.updatedAt) }}</div>
        <div class="trash-title">{{ note.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getTrash, getNote } from '../common/js/request.js'
  import { friendlyDate } from '../common/js/util.js'
  import { mapState } from 'vuex'
  export default {
    name: 'TrashSiderbar',
    created() {
      this._getTrashNotes()
    },
    data() {
      return {
        notes: [],
        chooseTrashNote: {},
        liIndex: -1
      }
    },
    computed: {
      ...mapState([
        'allTrashNotes'
      ])
    },
    methods: {
      doRouterTrash(note, index) {
        let noteId = note.id
        let notebookId = note.notebookId
        this.liIndex = index
        this.notes.forEach((note, index) => {
          if (note.id == noteId) {
            this.chooseTrashNote = this.notes[index]
          }
        })
        this.$store.commit('setTrashNote', this.chooseTrashNote)
        this.$router.push({
          path: `/trash?noteId=${note.id}`
        })
      },
      _getTrashNotes() {
        getTrash().then(res => {
          res = res.data
          this.notes = res.data
          this.notes.sort((a, b) => a.updatedAt < b.updatedAt)
          this.$store.commit('setAllTrashNotes', this.notes)
        }).catch(err => {
          this.$Message.error('获取废纸篓数据失败')
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
  .trash-sidebar
    width 300px
    max-height 100%
    overflow auto
    background-color $notebook-bg
    margin-left 100px
    border-right 1px solid $line-color
    .trash-header
      text-align center
      padding 15px 0
      border-bottom 1px solid $line-color
      position relative
    .trash-tab
      display flex
      font-size 14px
      border-bottom 1px solid $line-color
      .update-time-tab, .title-tab
        padding 10px
        flex 1
      .update-time-tab
        border-right 1px solid $line-color
    .trash-list
      font-size 13px
      .trash-item
        display flex
        padding 10px
        border-bottom 1px solid $line-color
        cursor pointer
        transition all .3s
        &.trash-item-active
          background-color $theme-color
          color #fff
        &:hover
          background-color $theme-color
          color #fff
        .trash-update-time, .trash-title
          flex 1
        .trash-title
          padding-left 20px
</style>
<template>
  <div class="notebook-list">
    <div class="operation-banner">
      <Button @click="showAddNotebookModal" icon="plus" type="primary" ghost>新建笔记本</Button>
      <Modal
        v-model="addNewNotebookModal"
        title="输入笔记本标题"
        @on-ok="addNewNotebookOk"
        @on-cancel="addNewNotebookCancel">
        <Input v-model="newNotebookTitle" icon="ios-paper"></Input>
      </Modal>
    </div>
    <div class="notebook-list-wrapper">
      <Alert class="note-label">
        笔记本列表 (<span class="list-count">{{ notebookTotal }}</span>)
        <Input v-model="searchNotebookText" @on-change="searchNotebook" class="search-notebook" placeholder="搜索笔记本..." style="width: 40%" clearable />
        <!-- <Button class="sort-button" type="success" size="small" @click="sortListByNoteCounts" style="margin-right:10px;">按笔记数量排序</Button>
        <Button type="success" size="small" @click="sortListByUpdate" style="margin-right:10px;">按笔记更新时间排序</Button>
        <Button type="success" size="small" @click="sortListByCreate" style="margin-right:10px;">按笔记创建时间排序</Button> -->
      </Alert>
      <ul class="note-list">
        <transition-group>
          <li @click="changeIDinState(notebook)" class="note-item" v-for="notebook in notebooksList" :key="notebook.id">
            <div class="icon-name">
              <Icon type="ios-paper" style="margin-right:6px;"/>
              <span class="note-title">{{ notebook.name }}</span>
              <span class="note-count">{{ notebook.note_number }}</span>
            </div>
            <div class="date-operation">
              <span class="date">创建时间: {{ _formateData(notebook.createdAt) }}</span>
              <span class="date">更新时间: {{ _formateData(notebook.updatedAt) }}</span>
              <Button size="small" @click.stop.prevent="doDeleteNotebook(notebook.id)" class="note-delete" type="error">删除</Button>
              <Button size="small" @click.stop.prevent="showEditNotebookModal(notebook)" class="note-edit" type="success">编辑</Button>
              <Modal
                v-model="editNotebookModal"
                title="输入笔记本标题"
                @on-ok="editNotebookOk"
                @on-cancel="editNotebookCancel">
                <Input v-model="editNotebookTitle" icon="ios-paper"></Input>
              </Modal>
            </div>
          </li>
        </transition-group> 
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    getDataByGet,
    getNotebooks,
    addNotebook,
    deleteNotebook,
    updateNotebook
  } from '../../common/js/request.js'
  import {
    API_AUTH
  } from '../../common/js/apis.js'
  import {
    friendlyDate
  } from '../../common/js/util.js'
  import Cookies from 'js-cookie'
  import { mapState, mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'NotebookList',
    mounted() {
      //  if (!localStorage.getItem('token') && this.$route.name !=='Blog' && this.$route.name !=='articleDetail') {
      //    this.$router.replace('login');
      //  }
    },

    data() {
      return {
        searchNotebookText: '',
        addNewNotebookModal: false,
        editNotebookModal: false,
        newNotebookTitle: '',
        editNotebookTitle: '',
        editId: ''
      }
    },
     computed: {
      ...mapState([
         'notebooksList',
      ]),
      ...mapGetters([
         'notebookTotal'
      ])
    },
    mounted(){
      this._getNotebookList()
    },
    methods: {
      ...mapMutations(['setNotebooksList', 'setSelectedNotebook']),
      sortListByNoteCounts() {
        // this.notebooksList.sort((a, b) => a.noteCounts < b.noteCounts)
      },
      sortListByUpdate() {
        // this.notebooksList.sort((a, b) => a.updatedAt < b.updatedAt)
      },
      sortListByCreate() {
        // this.notebooksList.sort((a, b) => a.createdAt < b.createdAt)
      },
      searchNotebook() {
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          getNotebooks(this.searchNotebookText).then(({data}) => {
            this.setNotebooksList(data.data)
          })
        }, 800)
      },
      changeIDinState(notebook) {
        console.log('changeIDinState');
        this.setSelectedNotebook(notebook)
        this.$store.commit('setNotebookId', notebook.id)
        this.$store.commit('setCurrentNote', {})
        this.$router.push({
          path: `/note?notebookId=${notebook.id}`
        })
      },
      showAddNotebookModal() {
        this.addNewNotebookModal = true
      },
      addNewNotebookOk() {
        addNotebook(this.newNotebookTitle).then(({data}) => {
          this.$Message.success('新增成功')
          this._getNotebookList()
          this.newNotebookTitle = ''
        })
      },
      addNewNotebookCancel() {
        this.$Message.error('取消新建笔记本')
      },
      showEditNotebookModal(notebook) {
        this.editId = notebook.id
        this.editNotebookTitle = notebook.name
        this.editNotebookModal = true
      },
      editNotebookOk() {
        updateNotebook(this.editId, this.editNotebookTitle).then(({ data }) => {
          this.$Message.success(data.msg);
          this._getNotebookList()
        })
      },
      editNotebookCancel() {
        this.$Message.error('取消编辑笔记本')
      },
      doDeleteNotebook(id) {
        this.$Modal.confirm({
          title: 'Title',
          content: '确定要删除此笔记本吗？',
          onOk: () => {
            deleteNotebook(id).then(res => {
              res = res.data
              this.$Message.success(res.msg)
              this._getNotebookList()
            }).catch(err => {
              this.$Message.error('删除笔记本失败')
            })
          },
          onCancel: () => {
            this.$Message.info('取消删除')
          }
        })
      },
      _formateData(dateStr) {
        return friendlyDate(dateStr)
      },
      _getNotebookList() {
        getNotebooks().then(({data}) => {
          this.setNotebooksList(data.data)
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/variables.styl';
  @import '../../common/stylus/styles.styl';

  .sort-button
    margin-left 20px

  .notebook-list
    height 100%
    margin-left 100px
    background-color $notebook-bg
    .operation-banner
      border-bottom 1px solid $line-color
      padding 15px
    .notebook-list-wrapper
      width 85%
      margin 20px auto
      .note-label
        font-size 14px
        .search-notebook
          margin-left 20px
        .list-count
          font-weight 700
      .note-list
        font-size 13px
        background-color #fff
        padding 0 15px
        border 1px solid $theme-color
        border-radius 4px
        margin-top 20px
        max-height 800px
        overflow auto
        .note-item
          display flex
          justify-content space-between
          align-items center
          border-bottom 1px solid $line-color
          padding 15px 0
          cursor pointer
          transition all .3s
          &:hover
            color $theme-text-color
          &:last-child
            border-bottom none
          .icon-name
            .note-title
              font-weight 700
            .note-count
              margin-left 10px
              color $date-color
              font-weight 600
          .date-operation
            display flex
            align-items center
            .date
              color $date-color
              margin-right 10px
              font-size 12px
            .note-delete
              margin-right 10px
</style>
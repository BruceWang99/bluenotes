<template>
  <div class="notebook-detail">
    <note-sidebar></note-sidebar>
    <div class="choose-note" v-if="!currentNote.id"></div>
    <div class="note-detail" v-else>
      <div class="note-header">
        <div class="notebook-title">
          <Dropdown style="margin-left: 20px" trigger="click" @on-click="selectNotebook">
            <Button type="primary">
              {{ currentNote.notebook ? currentNote.notebook.name : '选择笔记本' }}
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem v-for="item in notebooksList" :key="item.id" :name="item.name + '_' + item.id">{{ item.name }}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="search-box">
          <Input search placeholder="搜索笔记..." style="width: 100%;" v-model="searchVal" @on-change="search" clearable />
        </div>
        <div class="operation">
          <Button type="primary" size="small" :loading="updateLoading" @click="updateWriteNote" style="margin-right:10px;">
            <span>保存</span>
          </Button>
          <Button @click="doDeleteNote" type="error" size="small">
            <Icon type="trash-b"></Icon>
            删除
          </Button>
          <Button type="primary" size="small" :loading="publicLoading" @click="changePublicStatus" style="margin-left:10px;">
            <span>{{ isPublic == '1' ? '隐藏' : '发布' }}</span>
          </Button>
        </div>
      </div>
      <div class="note-content">
        <div class="date-related">
          <Alert banner class="date-banner" type="success">
            <span class="create-time">创建时间: {{ _formateDate(currentNote.created_at) }} ({{ dayjs(currentNote.created_at).format('YYYY-MM-DD HH:mm:ss') }})</span>
            <span class="update-time">更新时间: {{ _formateDate(currentNote.updated_at) }} ({{ dayjs(currentNote.updated_at).format('YYYY-MM-DD HH:mm:ss') }})</span>
            <span class="note-status">状态: {{ updateLoading ? '编辑中' : '已完成' }}</span>
          </Alert>
        </div>
        <div class="note-title">
          <Input class="title-input" :value="currentNote.title" placeholder="输入笔记标题" @on-change="changeTitle" />
        </div>
        <div class="note-editor">
          <!-- <textarea v-if="!isEdit" class="editor-content" placeholder="输入笔记内容" v-model:value="currentNote.content"></textarea>
          <div class="note-content" v-html="editText2Html" v-else></div> -->
          <mavon-editor ref="mdEditor" style="height:85vh;word-break: break-all;" :value="currentNote.content" @save="changeContent" @imgAdd="$imgAdd" />
          <!-- @change="changeContent" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from '../../components/NoteSidebar.vue';
import NoteEditor from './NoteEditor.vue';
import { getDataByGet, getNote, getNoteDetail, updateNote, deleteNote, getNotebooks } from '../../common/js/request.js';
import { API_AUTH } from '../../common/js/apis.js';
import { friendlyDate, getFullDate } from '../../common/js/util.js';
import { mapState, mapMutations } from 'vuex';
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import dayjs from 'dayjs';

let md = new MarkdownIt();

export default {
  name: 'NotebookDetail',
  components: {
    NoteSidebar,
    NoteEditor,
  },
  mounted() {
    this._getNotebookList();
  },
  data() {
    return {
      searchVal: '',
      dayjs: dayjs,
      isEdit: true,
      isRichText: true,
      editorContent: '',
      content: '',
      noteContent: '',
      updateLoading: false,
      publicLoading: false,
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    ...mapState(['currentNote', 'allNotes', 'notebooksList', 'isPublic']),
    editText2Html() {
      if (this.isEdit) {
        return md.render(this.currentNote.content);
      } else if (this.isRichText) {
        let html = this.$store.state.richText;
        return html;
      }
    },
  },
  methods: {
    ...mapMutations(['setNoteContent', 'setNoteTitle', 'setSelectedNoteIndex', 'setCurrentNote', 'setAllNotes', 'setNotebooksList', 'seCurrenttNotebook', 'setIsPublic']),
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      console.log('开始上传图片了', $file);
      //  var formdata = new FormData();
      //  formdata.append('image', $file);
      //  axios({
      //      url: 'server url',
      //      method: 'post',
      //      data: formdata,
      //      headers: { 'Content-Type': 'multipart/form-data' },
      //  }).then((url) => {
      //      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //      // $vm.$img2Url 详情见本页末尾
      //      $vm.$img2Url(pos, url);
      //  })
    },
    _formateDate(dateStr) {
      return friendlyDate(dateStr);
    },
    _fullDate(dateStr) {
      return getFullDate(dateStr);
    },
    search() {
      if (this.searchtimer) {
        clearTimeout(this.searchtimer);
      }
      this.searchtimer = setTimeout(() => {
        if (this.searchcancel) {
          this.searchcancel();
        }
        const { CancelToken } = axios;
        axios({
          method: 'get',
          url: `/api/notes?limit=${this.pageSize}&offset=${(this.page - 1) * this.pageSize}${this.searchVal ? '&obscure=' + this.searchVal : ''}&userid=${localStorage.getItem('userid')}`,
          cancelToken: new CancelToken((c) => {
            this.searchcancel = c;
          }),
        }).then(({ data }) => {
          if (data.error) {
            this.$message.error(data.message);
            return;
          }
          this.setAllNotes(data);
          if (this.allNotes.length > 0) {
            this.setSelectedNoteIndex(0);
            getNoteDetail(this.allNotes[0].id).then(({ data }) => {
              this.setCurrentNote(data);
              this.setIsPublic(data.is_public ? '0' : data.is_public);

              this.$router.push({
                path: `/note?noteId=${noteId}&notebookId=${notebookId}`,
              });
            });
          }
        });
      }, 500);
    },
    changePublicStatus(val) {
      this.currentNote.is_public = this.currentNote.is_public == '1' ? '0' : '1';
      this.setIsPublic(this.currentNote.is_public);
      this.publicLoading = true;
      this.updateWriteNote();
    },
    updateWriteNote() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (this.cancel) {
          this.cancel();
        }
        const { CancelToken } = axios;
        let body = {};
        body.title = this.currentNote.title;
        body.content = this.currentNote.content;
        body.is_public = this.currentNote.is_public;
        if (this.currentNote.notebook_id) {
          body.notebook_id = this.currentNote.notebook_id;
        }
        axios({
          method: 'put',
          url: `/api/notes/${this.currentNote.id}`,
          data: body,
          cancelToken: new CancelToken((c) => {
            this.cancel = c;
          }),
        })
          .then(({ data }) => {
            this.updateLoading = false;
            this.publicLoading = false;
            if (data.error) {
              this.$message.error(data.message);
              return;
            }
          })
          .catch(() => {
            this.updateLoading = false;
            this.publicLoading = false;
          });
      }, 500);
    },
    changeTitle(e) {
      this.updateLoading = true;
      this.setNoteTitle(e.target.value);
      let tempNotes = [...this.allNotes];
      let iIndex = -1;
      tempNotes.forEach((item, index) => {
        if (item.id == this.currentNote.id) {
          iIndex = index;
        }
      });
      tempNotes.splice(iIndex, 1, this.currentNote);
      this.setAllNotes(tempNotes);
      this.updateWriteNote();
    },
    changeContent(content) {
      this.updateLoading = true;
      this.setNoteContent(content);
      this.updateWriteNote();
    },
    doDeleteNote() {
      this.$Modal.confirm({
        title: '提示',
        content: '是否确认删除该笔记?',
        onOk: () => {
          deleteNote(this.currentNote.id).then(({ data, msg, error }) => {
            if (error) {
              this.$Message.success(res.msg);
              return;
            }
            let tempNotes = [...this.allNotes];
            let iIndex = -1;
            tempNotes.forEach((item, index) => {
              if (item.id == this.currentNote.id) {
                iIndex = index;
              }
            });
            tempNotes.splice(iIndex, 1);
            this.setAllNotes(tempNotes);
            if (tempNotes.length > 0 && iIndex > 0) {
              this.setSelectedNoteIndex(iIndex - 1);
              this.setCurrentNote(tempNotes[iIndex - 1]);
            } else {
              this.setSelectedNoteIndex(-1);
              this.setCurrentNote({});
            }
          });
        },
        onCancel: () => {
          this.$Message.info('取消删除');
        },
      });
    },
    _getNotebookList() {
      getNotebooks().then(({ data }) => {
        this.setNotebooksList(data.data);
      });
    },
    selectNotebook(data) {
      let name = data.split('_')[0];
      let id = data.split('_')[1];
      this.seCurrenttNotebook({
        id,
        name,
      });
      this.updateWriteNote();
    },
  },
};
</script>
<style>
.markdown-body pre > code {
  white-space: pre-wrap !important;
}
</style>
<style lang="stylus" scoped>
@import '../../common/stylus/variables.styl';

.note-editor >>> .ivu-input
  height 400px
.note-editor >>> .v-note-wrapper
  position static
.notebook-detail
  width 100%
  height 100%
  display flex
  align-items stretch
  overflow hidden
  .choose-note
    font-size 40px
    text-align center
    padding 20px
  .note-detail
    flex 1
    height 100%
    .note-header
      display flex
      justify-content space-between
      align-items center
      padding 10px 20px
      border-bottom 1px solid $line-color
      font-size 14px
      .notebook-title
        width 20%
      .search-box
        width 40%
    .note-content
      height 100%
      .date-related
        .update-time
          margin-left 10px
        .note-status
          margin-left 10px
      .note-title
        .title-input
          width 100%
          padding 10px 20px
          font-size 18px
          font-weight 700
          outline none
          border none
      .note-editor
        height 100%
        .editor-content
          width 100%
          height 75%
          padding 20px
          font-size 14px
          color #333
          border 1px dotted $theme-color
          outline none
          line-height 20px
          resize none
        .note-content
          padding 20px
          line-height 20px
</style>

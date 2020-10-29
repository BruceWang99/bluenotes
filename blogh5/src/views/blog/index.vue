<template>
  <div class="home">
    <header>
      <h1>BLOG</h1>
      <!-- <ul class="menu">
                <li>Home</li>
                <!-- <li><a href="#">项目</a></li>
                <li><a href="#">关于</a></li> -->
      <!-- </ul>  -->
    </header>
    <section class="content clearfix">
      <div id="blog-container">
        <div class="title-wrapper" v-for="item in blogList" :key="item.id" @click="$router.push('/articleDetail?id=' + item.id)">
          <h3 class="title">
            {{ item.title }}
          </h3>
          <span class="time">{{ dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
      </div>
      <div class="content-right">
        <div class="categories">
          <h3 class="title">分类</h3>
          <ul class="category-list">
            <li @click="selectedCategory({})" :class="!selectedCategoryData.id ? 'active' : ''">
              全部文章
              <!-- ({{categoryList.length}}) -->
            </li>
            <li v-for="item in categoryList" :key="item.id" :class="selectedCategoryData.id === item.id ? 'active' : ''" @click="selectedCategory(item)">
              {{ item.name }}
              <!-- ({{item.note_number}}) -->
            </li>
          </ul>
        </div>
      </div>
    </section>
    <footer>
      <a href="javascript:;" @click="changePage">{{ scrollDisabled ? '没有更多了' : '加载更多文章' }}</a
      ><br />
      <a href="http://beian.miit.gov.cn" target="_blank">ICP备案证: 湘ICP备20001888号-1</a>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { getNotebooks, getNote, getNoteDetail } from '../../common/js/request.js';
import dayjs from 'dayjs';
import { getDAes } from '../../common/js/util.js';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      dayjs: dayjs,
      blogList: [],
      categoryList: [],
      userid: '',
      page: 1,
      pageSize: 15,
      total: 0,
      scrollDisabled: false,
      selectedCategoryData: {},
      userid: 1,
    };
  },
  mounted() {
    // try {
    //   let txt = getDAes(this.$route.params.id);
    //   this.userid = txt.split('=')[1];
    // } catch {
    //   this.$router.push('/login');
    // }
    // this.userid = getDAes(this.$route.params.id)
    this._getNote();
    this._getNotebookList();
  },
  methods: {
    changePage() {
      this.page++;
      this._getNote(this.selectedCategoryData.id || null, true);
    },
    selectedCategory(data) {
      this.page = 1;
      this.selectedCategoryData = data;
      this._getNote(data.id, false);
    },
    _getNotebookList() {
      getNotebooks('', this.userid).then(({ data }) => {
        this.categoryList = data.data;
      });
    },
    _getNote(notebookId, more) {
      getNote({
        page: this.page,
        pageSize: this.pageSize,
        notebookId: notebookId,
        userid: this.userid,
        is_public: 1,
      })
        .then(({ data, error }) => {
          if (error) {
            this.$message.error(data.message);
            return;
          }
          if (more) {
            if (data.length === 0) {
              this.page--;
              this.scrollDisabled = true;
            } else {
              this.scrollDisabled = false;
            }
            this.blogList = this.blogList.concat(data);
          } else {
            this.blogList = data;
            if (this.blogList.length < this.pageSize) {
              this.scrollDisabled = true;
            } else {
              this.scrollDisabled = false;
            }
          }
          // this.total = data.data.total;
        })
        .catch((err) => {
          // this.$Message.error('获取笔记失败')
        });
    },
  },
};
</script>
<style lang="stylus">
.home
  .el-pagination
    .btn-prev, .btn-next
      background: #000 !important
    .btn-prev:hover, .btn-next:hover
      color: #fff !important
  .el-pager
    li
      color: #303133  !important
      background: #000 !important
    li.active
      color: #fff  !important
</style>
<style scoped>
.home {
  background: black;
  color: #c3c3c3;
  font-size: 14px;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}

a {
  text-decoration-line: none;
  color: #c3c3c3;
  font-size: 14px;
}

ul {
  line-height: 14px;
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  margin: 0;
}

header {
  height: 8vh;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #000;
}

header h1 {
  /* display: inline; */
  cursor: pointer;
  margin-top: 15px;
}

header ul.menu {
  display: flex;
  align-items: center;
}

.content {
  flex: 1;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.content #blog-container {
  padding-top: 7px;
  float: left;
  width: 85%;
  border-bottom: 1px solid #1f1f1f;
}

.title-wrapper {
  padding: 10px 0;
  border-top: 1px solid #1f1f1f;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.title-wrapper:hover {
  background: #272727;
}

.title-wrapper .title {
  font-size: 20px;
  display: inline-block;
  width: 80%;
  padding: 0;
  margin: 0;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.title-wrapper .time {
  display: inline-block;
  width: 18%;
  text-align: right;
  color: #999;
}

.content .content-right {
  float: right;
  width: 15%;
  position: fixed;
  top: 8.3vh;
  right: 10px;
}
.content .content-right .categories .title {
  font-size: 16px;
}
.content .content-right .categories .title,
.content .content-right .categories .category-list {
  text-align: center;
}

.content .content-right .categories .title {
  padding: 0;
  margin: 0;
}

.content .content-right .categories .category-list li {
  cursor: pointer;
  padding: 5px 0;
  margin: 5px 0px 5px 10px;
}
.content .content-right .categories .category-list li:hover {
  background: #272727;
}
.content .content-right .categories .category-list li.active {
  background: #272727;
}
footer {
  height: 8vh;
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 4vh 0;
}
footer a {
  text-decoration: none;
  color: #fff;
}
</style>

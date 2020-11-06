<template>
    <div class="detail">
        <header>
            <h3 style="margin-bottom: 8px;">
                {{blog.title}}
            </h3>
            <span>{{dayjs(blog.updated_at).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </header>
        <div class="content-wrapper">
                <mavon-editor
                style="min-height: 82vh;"
                :value="blog.content"
                :subfield="false"
                defaultOpen = "preview"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="false" />
        </div>
    </div>
</template>

<script>
import {
    getNoteDetail
  } from '../../common/js/request.js';
import dayjs from 'dayjs'

export default {
  name: 'ArticleDetail',
  data() {
    return {
      dayjs: dayjs,
      blog: {},
      categoryList: [],
      userid: '',
    };
  },
  mounted() {
    this.getBlogDetail();
  },
  methods: {
    getBlogDetail() {
      const blogid = this.$route.query.id;
       if (!blogid) {
        this.$message.error('没有找到任何文章');
        return;
      }
      getNoteDetail(blogid).then(({data, error, msg}) => {
        if (error) {
          this.$message.error(msg);
          return;
        }
        this.blog = data;
      })
    },
  },
};
</script>
<style lang="stylus" scoped>
        a
          text-decoration-line: none;
          color: #c3c3c3;
        .title
          font-size: 20px;
          font-weight: bold;
        header
          background: #000;
          height: 12vh;
          position: sticky; /* 设置 position 为 sticky */
          top: 0px; /* 设置 top、right、bottom、left 属性中的至少一个 */
          z-index: 1501;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: center;
          h3
            color: #fff;
            padding: 0;
            margin: 0;
          span
            font-size: 14px;
            color: #999;
        .content-wrapper
            border-top: 1px solid #585858;
</style>

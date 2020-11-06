'use strict';

const Controller = require('egg').Controller;
// 定义创建接口的请求参数规则
const createRule = {
  name: 'string',
};

class NotebookController extends Controller {
  async index() {
    const ctx = this.ctx;
    // const user = await ctx.service.users.show(ctx.state.user.userid);
    // const list = await user.getNotebooks();
    const list = await ctx.service.notebooks.index(ctx.query);
    ctx.body = {
      error: false,
      data: list,
    };
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.notebooks.show(ctx.params.id);
    ctx.body = result;
  }

  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    const params = ctx.request.body;
    params.user_id = ctx.state.user.userid;
    const result = await ctx.service.notebooks.create(params);

    ctx.body = result;
  }

  async update() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    // ctx.request.body.userId = ctx.state.user.userid;
    const data = { ...ctx.request.body, ...ctx.params, userId: ctx.state.user.userid };

    const result = await ctx.service.notebooks.update(data);
    if (result.error) {
      ctx.status = result.code;
      ctx.body = result;
      return;
    }
    ctx.body = result;
  }

  async destroy() {
    const ctx = this.ctx;
    console.log('params', ctx.params);
    const result = await ctx.service.notebooks.destroy(ctx.params);
    if (result.eror) {
      ctx.body = result;
      ctx.status = result.code;
      return;
    }
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = NotebookController;

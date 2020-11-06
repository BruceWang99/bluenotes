'use strict';

const Controller = require('egg').Controller;
// 定义创建接口的请求参数规则
const createRule = {
  title: 'string',
  content: 'string',
};

class NoteController extends Controller {
  async index() {
    const ctx = this.ctx;
    const result = await ctx.service.notes.index(ctx.query);

    ctx.body = result;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.notes.show(ctx.params.id);
    ctx.body = result;
  }

  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);

    const result = await ctx.service.notes.create(ctx.request.body);

    ctx.body = result;
  }

  async update() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // ctx.validate(createRule, ctx.request.body);
    const note = { ...ctx.request.body, ...ctx.params };
    // ctx.validate(createRule, note);
    const result = await ctx.service.notes.update(note);
    ctx.body = result;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.notes.destroy(ctx.params);

    ctx.status = 200;
    ctx.body = result;
  }
}

module.exports = NoteController;

'use strict';

const Controller = require('egg').Controller;
// 定义创建接口的请求参数规则
const createRule = {
  user_name: 'string',
  email: 'email',
  password: 'password',
};

class UserController extends Controller {
  async register() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);

    const result = await ctx.service.users.create(ctx.request.body);

    ctx.body = result;
  }

  async login() {
    const ctx = this.ctx;
    ctx.validate({
      user_name: 'string',
      password: 'password',
    }, ctx.request.body);
    const result = await ctx.service.users.login(ctx.request.body);
    if (result.error) {
      ctx.status = result.code;
      ctx.body = result;
      return;
    }
    ctx.status = 200;
    ctx.body = result;

  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.users.show(ctx.params.id);
    ctx.body = result;
  }
  // async index() {
  //   const ctx = this.ctx;
  //   const result = await ctx.service.users.index(ctx.query);

  //   ctx.body = result;
  // }

  // async update() {
  //   const ctx = this.ctx;
  //   // 校验 `ctx.request.body` 是否符合我们预期的格式
  //   // 如果参数校验未通过，将会抛出一个 status = 422 的异常
  //   ctx.validate(createRule, ctx.request.body);
  //   const result = await ctx.service.users.update(ctx.request.body);
  //   ctx.body = result;
  // }

  // async destroy() {
  //   const ctx = this.ctx;
  //   const user = await ctx.service.users.destroy(ctx.params);
  //   if (!user) {
  //     ctx.status = 404;
  //     return;
  //   }
  //   ctx.status = 200;
  // }
}

module.exports = UserController;

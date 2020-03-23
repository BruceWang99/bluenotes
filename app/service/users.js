'use strict';

const Service = require('egg').Service;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserService extends Service {
  async login(params) {
    const { ctx, app } = this;
    const user = await ctx.model.User.findOne({ user_name: params.user_name });
    if (!user) {
      return {
        error: true,
        msg: '不存在该用户,请先去注册',
        code: 422,
      };
    }
    if (user.password === params.password) {
      // 生成 token 的方式
      const token = app.jwt.sign({ // 需要存储的 token 数据
        username: user.user_name,
        userid: user.id,
      }, app.config.jwt.secret);
      const obj = {
        token,
        user_name: user.user_name,
        email: user.email,
      };
      return {
        error: false,
        data: obj,
        msg: '登陆成功',
        code: 422,
      };
    }
    return {
      error: true,
      msg: '账号或密码错误',
      code: 422,
    };
  }

  async index(q) {
    const ctx = this.ctx;
    const query = { limit: toInt(q.limit), offset: toInt(q.offset) };
    const result = await ctx.model.User.findAll(query);
    return result;
  }

  async show(id) {
    const ctx = this.ctx;
    const result = await ctx.model.User.findByPk(toInt(id));

    return result;
  }

  async create(params) {
    const ctx = this.ctx;
    const user = await ctx.model.User.create(params);

    return user;
  }

  async update(params) {
    const ctx = this.ctx;
    const id = toInt(params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      return;
    }

    const result = await user.update(params);
    return result;
  }

  async destroy(params) {
    const ctx = this.ctx;
    const id = toInt(params.id);
    const user = await ctx.model.User.findByPk(id);

    if (!user) {
      return;
    }
    const result = await user.destroy();
    return result;
  }
}

module.exports = UserService;

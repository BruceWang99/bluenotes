'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class NotebookService extends Service {

  async index(q) {
    const { ctx } = this;
    const user = await ctx.service.users.show(ctx.state.user.userid);

    const query = q.name ? {
      name: {
        $like: `%${q.name}%`,
      },
    } : {};
    const list = await user.getNotebooks({
      where: query,
      order: [
        [ sequelize.cast(sequelize.col('note_number'), 'INTEGER'), 'DESC' ],
        [ 'updated_at', 'DESC' ],
      ],
    });
    return list;
  }

  async show(id) {
    const ctx = this.ctx;
    const result = await ctx.model.Notebook.findByPk(toInt(id));

    return result;
  }

  async create(params) {
    const ctx = this.ctx;
    const notebook = await ctx.model.Notebook.create(params);

    return notebook;
  }

  async update(params) {
    const ctx = this.ctx;
    const id = toInt(params.id);
    const userId = toInt(params.userId);
    const notebook = await ctx.model.Notebook.findByPk(id);
    if (userId !== notebook.userId) {
      return {
        error: true,
        msg: '您没有权限修改',
        code: 403,
      };
    }
    if (!notebook) {
      return {
        error: true,
        msg: '没有这个笔记本',
        code: 422,
      };
    }

    const result = await notebook.update(params);
    return {
      error: false,
      msg: '更新成功',
      data: result,
    };
  }

  async destroy(params) {
    const ctx = this.ctx;
    const id = toInt(params.id);
    const notebook = await ctx.model.Notebook.findByPk(id);

    if (!notebook) {
      return {
        error: true,
        msg: '没有这个笔记本',
        code: 422,
      };
    }
    const result = await notebook.destroy();
    return {
      error: false,
      msg: '删除成功',
      data: result,
    };
  }
}

module.exports = NotebookService;

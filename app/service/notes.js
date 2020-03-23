'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class NoteService extends Service {

  async index(q) {
    const ctx = this.ctx;
    const conditions = {};
    let attributes = [ 'id', 'notebook_id', 'title', 'updated_at' ];
    if (q.notebookId)conditions.notebook_id = q.notebookId;
    if (q.obscure) {
      conditions.$or = [
        { title: { $like: `%${q.obscure}%` } },
        { content: { $like: `%${q.obscure}%` } },
      ];
      attributes = [ 'id', 'notebook_id', 'title', 'content', 'updated_at' ];
    }
    const result = await ctx.model.Note.findAll({
      attributes,
      limit: toInt(q.limit),
      offset: toInt(q.offset),
      order: [
        [ 'updated_at', 'DESC' ],
      ],
      where: conditions,
    });
    return result;
  }

  async show(id) {
    const ctx = this.ctx;
    const result = await ctx.model.Note.findOne({
      include: [{
        model: ctx.model.Notebook,
        attributes: [ 'name' ],
      }],
      where: { id: toInt(id) },
    }
    );

    return result;
  }

  async create(body) {
    const ctx = this.ctx;
    body.user_id = ctx.state.user.userid;
    const note = await ctx.model.Note.create(body);
    if (note.notebook_id) {
      await ctx.model.Notebook.update(
        {
          note_number: sequelize.literal('note_number + 1'),
        },
        {
          where: { id: note.notebook_id },
        }
      );
    }
    return note;
  }

  async update(data) {
    const ctx = this.ctx;
    const id = toInt(data.id);
    console.log('data', data);
    const note = await ctx.model.Note.findByPk(id);
    if (!note) {
      return {
        error: true,
        msg: '没有这个笔记',
      };
    }

    const result = await note.update(data);
    return result;
  }

  async destroy(params) {
    const ctx = this.ctx;
    const id = toInt(params.id);
    const note = await ctx.model.Note.findByPk(id);
    if (!note) {
      return {
        error: true,
        msg: '没有这个笔记',
      };
    }
    const result = await note.destroy();
    if (result.notebook_id) {
      await ctx.model.Notebook.update(
        {
          note_number: sequelize.literal('note_number - 1'),
        },
        {
          where: { id: result.notebook_id },
        }
      );
    }
    return {
      error: false,
      data: result,
      msg: '删除成功',
    };
  }
}

module.exports = NoteService;

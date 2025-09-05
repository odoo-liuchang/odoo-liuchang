# -*- coding: utf-8 -*-
from odoo import models, fields, api
from odoo.exceptions import ValidationError


class LearningRecord(models.Model):
    _name = 'df.learning.record'
    _description = '东风的学习记录'

    name = fields.Char('名称', required=True)
    line_ids = fields.One2many('df.learning.record.line', 'learning_id', '明细')
    done_date = fields.Date(string='完成日期')
    description = fields.Text('详情')

    @api.constrains('name')
    def _constraint_name(self):
        for record in self:
            if self.search([('id', '!=', record.id), ('name', '=', record.id)]):
                raise ValidationError('名称已存在！')


class LearningRecordLine(models.Model):
    _name = 'df.learning.record.line'
    _description = '东风的学习记录明细'

    name = fields.Char('名称', required=True)
    learning_id = fields.Many2one('df.learning.record', '学习记录')
    plan_done_date = fields.Date(string='计划完成日期')
    actual_done_date = fields.Date(string='实际完成日期')
    description = fields.Text('详情')

    @api.model
    def batch_modify_wizard(self, res_ids):
        return {
            'type': 'ir.actions.act_window',
            'target': 'new',
            'res_model': 'df.learning.record.batch.modify.wizard',
            'name': "批量修改",
            'views': [(False, 'form')],
            'context': {'res_ids': res_ids},
        }

    @api.model
    def batch_add_wizard(self, res_ids, learning_id):
        learning_list = self.env['df.learning.list'].browse(res_ids)
        add_vals = [{
            'name': learning.name,
            'description': learning.description,
            'learning_id': learning_id
        } for learning in learning_list]
        self.create(add_vals)

# -*- coding: utf-8 -*-
from odoo import models, fields, api
from odoo.exceptions import ValidationError


class LearningList(models.Model):
    _name = 'df.learning.list'
    _description = '东风的学习清单'

    name = fields.Char('名称', required=True)
    description = fields.Text('详情')

    @api.constrains('name')
    def _constraint_name(self):
        for record in self:
            if self.search([('id', '!=', record.id), ('name', '=', record.id)]):
                raise ValidationError('名称已存在！')

# -*- coding: utf-8 -*-

from odoo import models, fields


class DFLearningRecordBatchModifyWizard(models.TransientModel):
    _name = 'df.learning.record.batch.modify.wizard'
    _description = '东风学习记录批量修改弹窗'

    name = fields.Char(string='名称')
    plan_done_date = fields.Date(string='计划完成日期')
    actual_done_date = fields.Date(string='实际完成日期')
    description = fields.Text('详情')

    def button_ok(self):
        self.ensure_one()
        res_ids = self._context.get('res_ids')
        print(res_ids)
        write_vals = {}
        for field in ['name', 'description']:
            if self[field]:
                write_vals.update({field: self[field]})
        self.env['df.learning.record.line'].browse(res_ids).write(write_vals)

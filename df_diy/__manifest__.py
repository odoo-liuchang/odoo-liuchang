# -*- coding: utf-8 -*-
{
    'name': "df_diy",

    'summary': "Short (1 phrase/line) summary of the module's purpose",

    'description': """
        自定义odoo18模块，用来测试创建一些odoo常用的组件widget，如：明细列表批量添加修改删除，整行字段变色加背景色，字段变色加背景色
    等
    """,

    'author': "DongFeng",
    'website': "https://www.yourcompany.com",

    'category': 'DF',
    'version': '1.0',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',

        'wizards/df_learning_record_batch_modify_wizard.xml',

        'views/df_learning_record_views.xml',

        'views/action_menus.xml',

        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],

    'assets': {
        'web.assets_backend': [
            'df_diy/static/src/**/*',
        ],
    },
}
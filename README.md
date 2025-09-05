基于odoo18的一些常用前端组件

1. list视图指定字段设置背景色
   在ListRenderer中覆写 getRowClass 函数
   注意td的背景色会遮挡tr的背景色，所以需要让td的背景继承tr或者直接去掉td的背景色设置为unset
   
2. 字段或整行设置字体颜色
   在filed或list上使用属性 decoration-danger="condition"
   
3. 批量操作（add/delete/write）
   在o2m字段上使用widget=one2many_batch_operation
   

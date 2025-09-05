基于odoo18的一些常用前端组件
Some commonly used owl components based on Odoo 18

1. list视图指定字段设置背景色  
   To set the background color of specific fields in a list view  
   

   * 在ListRenderer中覆写 getRowClass 函数  
   Override the `getRowClass` function in the ListRenderer

   
   * 注意td的背景色会遮挡tr的背景色，所以需要让td的背景继承tr或者直接去掉td的背景色(设置为unset)  
   Note that the background color of `td` will cover that of `tr`, so either make the background of `td` inherit from`tr`
   or directly remove the background color setting of `td` and just set it to `unset`.

   
2. 字段或整行设置字体颜色  
   在filed或list上使用属性 decoration-danger="condition"  
   To set the font-color for a field or an entire row, use the attribute `decoration-danger="condition"` on the field or list. 

   
3. 批量操作（add/delete/write）  
   Batch operations (add/delete/write)
   
   在o2m字段上使用widget=one2many_batch_operation  
   on o2m fields can be performed by using widget=one2many_batch_operation.

import { X2ManyField, x2ManyField } from "@web/views/fields/x2many/x2many_field";
import { registry } from "@web/core/registry";
import { listView } from "@web/views/list/list_view";
import { SpecificListController } from "@df_diy/js/df_list_controller";
import { DFOne2manyListRenderer } from "@df_diy/js/one2many_list_renderer";

export class One2ManyBatchEdit extends X2ManyField {
    static components = {
        ...X2ManyField.components,
        ListRenderer: DFOne2manyListRenderer,
    };

}

export const One2ManyBatchEditWidget = {
    ...x2ManyField,
    component: One2ManyBatchEdit,
};


export const SpecificListView = {
    ...listView,
    Controller: SpecificListController,
};


registry.category("fields").add("one2many_batch_operation", One2ManyBatchEditWidget);
registry.category("views").add('multi_select_list', SpecificListView);

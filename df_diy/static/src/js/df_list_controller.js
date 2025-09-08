import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { ListController } from "@web/views/list/list_controller";
import { SelectCreateDialog } from "@web/views/view_dialogs/select_create_dialog";

export class SpecificListController extends ListController {
    setup() {
        super.setup();
        this.dialog = useService("dialog");  // 界面中间的弹窗
    }

    async openRecord(record) {
        this.dialog.add(SelectCreateDialog, {
            resModel: record.resModel + '.line',
            title: _t("选择条目"),
            multiSelect: true,
            noCreate: true,
            domain: [['learning_id', '=', record.resId]],
            onSelected: async resIds => {
                await this.model.orm.call(
                    'df.learning.record.line',
                    'advanced_batch_add_wizard',
                    [resIds, record.resId]
                );
            },
        }, {
            onClose: () => this.dialog.closeAll()
        });
    }

}

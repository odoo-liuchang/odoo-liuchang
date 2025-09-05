/** @odoo-module */

import { ListRenderer } from "@web/views/list/list_renderer";
import { SelectCreateDialog } from "@web/views/view_dialogs/select_create_dialog";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";


export class DFOne2manyListRenderer extends ListRenderer {
    static template = "df_diy.one2manyListRenderer";
    static recordRowTemplate = "df_diy.one2manyListRenderer.RecordRow";
    setup() {
        super.setup();
        this.notification = useService("notification");  // 界面右上角通知框
        this.dialog = useService("dialog");  // 界面中间的弹窗
        this.orm = useService("orm");
        this.action = useService("action");
    }

    /* 修改tr的背景色 change the background-color of line */
    getRowClass(record) {
        const rowClass = super.getRowClass(record);
        if (!record.data.actual_done_date) {  // 给字段actual_done_date为空的行设置class（添加背景色）
            return `${rowClass} o_row_red`; // 添加自定义 CSS 类
        }
        return rowClass;
    }

    get selectAll() {
        if (!this.props.list?.records?.length) {
            return false;
        }
        return this.props.list.records.every((record) => record.selected);
    }
    get hasSelectedRecords() {
        if (!this.props.list?.records?.length) {
            return false;
        }
        return this.props.list.records.some((record) => record.selected);
    }

    get selectedRecordsCount() {
        if (!this.props.list?.records) {
            return 0;
        }
        return this.props.list.records.filter((record) => record.selected).length;
    }

    toggleSelection() {
        if (!this.props.list?.records?.length) {
            return;
        }
        const selected = !this.selectAll;
        for (const record of this.props.list.records) {
            record.selected = selected;
        }
        this.render();
    }

    onRowCheckboxClick(record, checked) {
        record.selected = checked;
        this.render();
    }

    // 批量修改 - Multi write lines
    async onBatchEdit() {
        const selectedRecords = this.props.list.records.filter(
            (record) => record.selected
        );
        if (!selectedRecords.length) {
            this.dialog.add(ConfirmationDialog, {
                title: "警告",
                body: "请至少选择一条记录。",
            });
            return;
        }

        const recordIds = selectedRecords.map((record) => record.resId);

        const action = await this.orm.call(
            'df.learning.record.line',
            'batch_modify_wizard',
            [recordIds],
        );
        this.action.doAction(action, {
            onClose: async (closeInfo) => {
                await this.props.list.model.load();
                this.notification.add("修改成功.", {
                    type: "success",
                });
            }
        });

    }

    // 批量删除 - Multi delete lines
    async onBatchDel() {
        const selectedRecords = this.props.list.records.filter(
            (record) => record.selected
        );
        if (!selectedRecords.length) {
            this.dialog.add(ConfirmationDialog, {
                title: "警告",
                body: "请至少选择一条记录。",
            });
            return;
        }

        const confirmed = await new Promise((resolve) => {
            this.dialog.add(ConfirmationDialog, {
                title: _t("批量删除"),
                body: _t("确定要删除这些记录?"),
                confirm: () => resolve(true),
                cancel: () => resolve(false),
            });
        });
        if (confirmed) {
            const recordIds = selectedRecords.map((record) => record.resId);
            try {
                await this.orm.unlink(this.props.list.resModel, recordIds);
                // Force reload and re-render
                await this.props.list.model.load();
                this.notification.add("删除成功。", {
                    type: "success",
                });
            } catch (error) {
                let msg = error?.message;
                if (error?.data?.message) {
                    msg = error.data.message;
                } else if (error?.message?.data?.message) {
                    msg = error.message.data.message;
                }
                this.notification.add(msg || error, { type: "danger" });
            }
        }

    }

    // 批量添加 - Multi add lines
    async onBatchAdd () {
        const current_id = this.props.list._parent.resId;
        this.dialog.add(SelectCreateDialog, {
            resModel: 'df.learning.list',
            domain: [],
            title: "批量添加",
            multiSelect: true,
            context: this.props.context,
            noCreate: true,
            onSelected: async (resIds) => {
                await this.orm.call(
                    'df.learning.record.line',
                    'batch_add_wizard',
                    [resIds, current_id]
                );
            },
        }, {
            onClose: () => this.props.list.model.load()
        });
    }
}

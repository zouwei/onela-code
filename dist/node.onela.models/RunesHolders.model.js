/**
 * ord_runes_holders ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class RunesHolders extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    RunesHolders.configs = {
        fields: [
            {"name": "amount", "type": "numeric", "default": null, "comment": "信号类型：mint、buy、sell"},
            {"name": "created_time", "type": "timestamp without time zone", "default": "now()", "comment": "emoji表情"},
            {"name": "id", "type": "bigint", "default": null, "comment": "主键id"},
            {"name": "owner_address", "type": "character varying", "default": null, "comment": "接收地址"},
            {"name": "ratio", "type": "numeric", "default": null, "comment": "链上总消耗量"},
            {"name": "rune_id", "type": "character varying", "default": null, "comment": "交易id"},
            {"name": "rune_name", "type": "character varying", "default": null, "comment": "链上总接收笔数"},
            {"name": "update_time", "type": "timestamp without time zone", "default": "now()", "comment": "接收地址"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "是否有效（1有效；0无效）"},
        ],
        tableName: "ord_runes_holders",
        engine: "default"
    };

    return RunesHolders;
};
/**
 * ord_runes_holders_history ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class RunesHoldersHistory extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    RunesHoldersHistory.configs = {
        fields: [
            {"name": "amount", "type": "character varying", "default": null, "comment": "持仓数量"},
            {"name": "created_time", "type": "timestamp without time zone", "default": "now()", "comment": "创建时间"},
            {"name": "id", "type": "integer", "default": null, "comment": "主键id"},
            {"name": "ownerAddress", "type": "character varying", "default": null, "comment": "持仓地址"},
            {"name": "ratio", "type": "numeric", "default": null, "comment": "占股比例"},
            {"name": "ticker", "type": "character varying", "default": null, "comment": "符文价格"},
            {"name": "ticker_id", "type": "character varying", "default": null, "comment": "符文名称"},
            {"name": "update_time", "type": "timestamp without time zone", "default": "now()", "comment": "更新时间"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "ticket名称"},
        ],
        tableName: "ord_runes_holders_history",
        engine: "default"
    };

    return RunesHoldersHistory;
};
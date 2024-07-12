/**
 * ord_runes_market_history ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class RunesMarketHistory extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    RunesMarketHistory.configs = {
        fields: [
            {"name": "created_time", "type": "timestamp without time zone", "default": "now()", "comment": "创建时间"},
            {"name": "id", "type": "integer", "default": null, "comment": "符文id"},
            {"name": "market_name", "type": "character varying", "default": null, "comment": "符文名称"},
            {"name": "price_sats", "type": "character varying", "default": null, "comment": "符文价格"},
            {"name": "update_time", "type": "timestamp without time zone", "default": "now()", "comment": "更新时间"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "是否有效（1有效；0无效）"},
        ],
        tableName: "ord_runes_market_history",
        engine: "default"
    };

    return RunesMarketHistory;
};
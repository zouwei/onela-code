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
            {"name": "created_time", "type": "timestamp without time zone", "default": "now()", "comment": "内存中总交易笔数"},
            {"name": "id", "type": "bigint", "default": null, "comment": "主键id"},
            {"name": "market_name", "type": "character varying", "default": null, "comment": "已经验证得区块高度"},
            {"name": "price_sats", "type": "character varying", "default": null, "comment": "NFT slug"},
            {"name": "rune_id", "type": "character varying", "default": null, "comment": "内存中总消耗笔数"},
            {"name": "rune_name", "type": "character varying", "default": null, "comment": "供应总量"},
            {"name": "update_time", "type": "timestamp without time zone", "default": "now()", "comment": "区块时间"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "更新时间"},
        ],
        tableName: "ord_runes_market_history",
        engine: "default"
    };

    return RunesMarketHistory;
};
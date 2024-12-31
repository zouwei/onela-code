/**
 * ord_smart_address ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class SmartAddress extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    SmartAddress.configs = {
        fields: [
            {"name": "address", "type": "character varying", "default": null, "comment": "转账地址"},
            {"name": "chain_funded_txo_count", "type": "integer", "default": null, "comment": "转账地址"},
            {"name": "chain_funded_txo_sum", "type": "bigint", "default": null, "comment": "创建时间"},
            {"name": "chain_spent_txo_count", "type": "integer", "default": null, "comment": "是否有效（1有效；0无效）"},
            {"name": "chain_spent_txo_sum", "type": "bigint", "default": null, "comment": "链上总消耗量"},
            {"name": "chain_tx_count", "type": "integer", "default": null, "comment": "创建时间"},
            {"name": "created_time", "type": "timestamp without time zone", "default": "now()", "comment": "早/晚鸟奖励小计"},
            {"name": "id", "type": "bigint", "default": null, "comment": "主键id"},
            {"name": "mempool_funded_txo_count", "type": "integer", "default": null, "comment": "内存中总接收笔数"},
            {"name": "mempool_funded_txo_sum", "type": "bigint", "default": null, "comment": "是否有效（1有效；0无效）"},
            {"name": "mempool_spent_txo_count", "type": "integer", "default": null, "comment": "落点"},
            {"name": "mempool_spent_txo_sum", "type": "bigint", "default": null, "comment": "爆块分数"},
            {"name": "mempool_tx_count", "type": "character varying", "default": null, "comment": "聪明钱包地址：默认-0、1-接收地址钱包为聪明钱包"},
            {"name": "update_time", "type": "timestamp without time zone", "default": "now()", "comment": "mints"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "是否为合集"},
        ],
        tableName: "ord_smart_address",
        engine: "default"
    };

    return SmartAddress;
};
/**
 * con_duck_block ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class DuckBlock extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    DuckBlock.configs = {
        fields: [
            {"name": "block_height", "type": "integer", "default": null, "comment": "链上总消耗量"},
            {"name": "blocktime", "type": "bigint", "default": null, "comment": "早/晚鸟奖励小计"},
            {"name": "created_time", "type": "timestamp without time zone", "default": null, "comment": "创建时间"},
            {"name": "event_type", "type": "character varying", "default": null, "comment": "是否有效（1有效；0无效）"},
            {"name": "from_address", "type": "character varying", "default": null, "comment": "转账地址"},
            {"name": "id", "type": "bigint", "default": null, "comment": "主键id"},
            {"name": "ord_id", "type": "character varying", "default": null, "comment": "转账地址"},
            {"name": "pre_tx_id", "type": "character varying", "default": null, "comment": "聪明钱包地址：默认-0、1-接收地址钱包为聪明钱包"},
            {"name": "request_dmitem", "type": "integer", "default": null, "comment": "mints"},
            {"name": "slug", "type": "character varying", "default": null, "comment": "落点"},
            {"name": "status", "type": "character varying", "default": null, "comment": "是否为合集"},
            {"name": "to_address", "type": "character varying", "default": null, "comment": "创建时间"},
            {"name": "tx_id", "type": "character varying", "default": null, "comment": "爆块分数"},
            {"name": "update_time", "type": "timestamp without time zone", "default": null, "comment": "内存中总接收笔数"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "是否有效（1有效；0无效）"},
        ],
        tableName: "con_duck_block",
        engine: "default"
    };

    return DuckBlock;
};
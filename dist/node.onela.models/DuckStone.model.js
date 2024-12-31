/**
 * con_duck_stone ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class DuckStone extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    DuckStone.configs = {
        fields: [
            {"name": "block_height", "type": "integer", "default": null, "comment": "创建时间"},
            {"name": "created_time", "type": "timestamp without time zone", "default": null, "comment": "currentWorkcsupply"},
            {"name": "duck_level", "type": "smallint", "default": null, "comment": "更新时间"},
            {"name": "from_address", "type": "character varying", "default": null, "comment": "持仓数量"},
            {"name": "id", "type": "bigint", "default": null, "comment": "符文id"},
            {"name": "multiplier", "type": "numeric", "default": null, "comment": "内存中总交易笔数"},
            {"name": "ord_id", "type": "character varying", "default": null, "comment": "符文id"},
            {"name": "request_dmitem", "type": "integer", "default": null, "comment": "预挖总量"},
            {"name": "slug", "type": "character varying", "default": null, "comment": "过去1小时确认"},
            {"name": "surprise", "type": "integer", "default": null, "comment": "供应总量"},
            {"name": "to_address", "type": "character varying", "default": null, "comment": "可分性"},
            {"name": "update_time", "type": "timestamp without time zone", "default": null, "comment": "ticket类型:ARC20、BRC20、HTML、Images、Runes、3D等"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "是否有效（1有效；0无效）"},
        ],
        tableName: "con_duck_stone",
        engine: "default"
    };

    return DuckStone;
};
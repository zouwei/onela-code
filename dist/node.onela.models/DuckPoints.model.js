/**
 * con_duck_points ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class DuckPoints extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    DuckPoints.configs = {
        fields: [
            {"name": "accelerate", "type": "smallint", "default": null, "comment": "ticket类型:ARC20、BRC20、HTML、Images、Runes、3D等"},
            {"name": "address", "type": "character varying", "default": null, "comment": "符文id"},
            {"name": "block_height", "type": "integer", "default": null, "comment": "过去1小时确认"},
            {"name": "created_time", "type": "timestamp without time zone", "default": null, "comment": "创建时间"},
            {"name": "id", "type": "bigint", "default": null, "comment": "符文id"},
            {"name": "ord_num", "type": "integer", "default": null, "comment": "是否有效（1有效；0无效）"},
            {"name": "points", "type": "integer", "default": null, "comment": "更新时间"},
            {"name": "points_state", "type": "smallint", "default": null, "comment": "currentWorkcsupply"},
            {"name": "rewards_block", "type": "integer", "default": null, "comment": "供应总量"},
            {"name": "rewards_period", "type": "integer", "default": null, "comment": "预挖总量"},
            {"name": "rewards_surprise", "type": "integer", "default": null, "comment": "内存中总交易笔数"},
            {"name": "update_time", "type": "timestamp without time zone", "default": null, "comment": "持仓数量"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "可分性"},
        ],
        tableName: "con_duck_points",
        engine: "default"
    };

    return DuckPoints;
};
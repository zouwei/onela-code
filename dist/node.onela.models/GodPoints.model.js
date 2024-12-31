/**
 * con_god_points ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class GodPoints extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    GodPoints.configs = {
        fields: [
            {"name": "address", "type": "character varying", "default": null, "comment": "符文名称"},
            {"name": "block_height", "type": "integer", "default": null, "comment": "交易id,对应atomical_id"},
            {"name": "created_time", "type": "timestamp without time zone", "default": null, "comment": "区块高度"},
            {"name": "id", "type": "bigint", "default": null, "comment": "符文id"},
            {"name": "miner_mode", "type": "smallint", "default": null, "comment": "持仓地址"},
            {"name": "multiplier", "type": "smallint", "default": null, "comment": "持有者"},
            {"name": "ord_num", "type": "integer", "default": null, "comment": "是否有效（1有效；0无效）"},
            {"name": "perfect", "type": "json", "default": null, "comment": "聪明钱包地址：默认-0、1-接收地址钱包为聪明钱包"},
            {"name": "points", "type": "integer", "default": null, "comment": "事件类型"},
            {"name": "points_state", "type": "smallint", "default": null, "comment": "是否有效（1有效；0无效）"},
            {"name": "update_time", "type": "timestamp without time zone", "default": null, "comment": "currentWorkcsupply"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "更新时间"},
        ],
        tableName: "con_god_points",
        engine: "default"
    };

    return GodPoints;
};
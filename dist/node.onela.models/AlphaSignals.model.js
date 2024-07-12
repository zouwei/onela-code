/**
 * ord_alpha_signals ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class AlphaSignals extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    AlphaSignals.configs = {
        fields: [
            {"name": "amount", "type": "character varying", "default": null, "comment": "单张数量"},
            {"name": "block_height", "type": "integer", "default": null, "comment": "区块高度"},
            {"name": "created_time", "type": "timestamp without time zone", "default": null, "comment": "持币地址数量"},
            {"name": "emoji", "type": "character varying", "default": null, "comment": "创建时间"},
            {"name": "from_address", "type": "character varying", "default": null, "comment": "符文价格"},
            {"name": "id", "type": "bigint", "default": null, "comment": "主键id"},
            {"name": "inscription_ids", "type": "json", "default": null, "comment": "供应总量"},
            {"name": "is_alpha_minter", "type": "smallint", "default": null, "comment": "预挖总量"},
            {"name": "is_high_volue_minter", "type": "smallint", "default": null, "comment": "高产铸币者:默认-0，1-高产铸币者"},
            {"name": "is_smart", "type": "smallint", "default": null, "comment": "聪明钱包地址：默认-0、1-接收地址钱包为聪明钱包"},
            {"name": "signals_type", "type": "character varying", "default": null, "comment": "信号类型：mint、buy、sell"},
            {"name": "tick_name", "type": "character varying", "default": null, "comment": "ticket名称"},
            {"name": "tick_protocol", "type": "character varying", "default": null, "comment": "ticket类型:ARC20、BRC20、HTML、Images、Runes、3D等"},
            {"name": "to_address", "type": "character varying", "default": null, "comment": "持仓地址"},
            {"name": "total_price", "type": "numeric", "default": null, "comment": "价格小计"},
            {"name": "update_time", "type": "timestamp without time zone", "default": "now()", "comment": "更新时间"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "是否有效（1有效；0无效）"},
        ],
        tableName: "ord_alpha_signals",
        engine: "default"
    };

    return AlphaSignals;
};
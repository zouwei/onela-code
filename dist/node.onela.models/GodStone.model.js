/**
 * con_god_stone ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class GodStone extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    GodStone.configs = {
        fields: [
            {"name": "block_height", "type": "integer", "default": null, "comment": "接收地址"},
            {"name": "created_time", "type": "timestamp without time zone", "default": null, "comment": "ticket名称"},
            {"name": "from_address", "type": "character varying", "default": null, "comment": "currentWorkcsupply"},
            {"name": "gem_properties", "type": "smallint", "default": null, "comment": "属性：全能属性 -7、光（Light）-0、水（Water）-1、暗（Darkness）-2、火（Fire）-3、地（Earth）-4、电（Lightning）-5、风（wind）-6"},
            {"name": "gemstone", "type": "smallint", "default": null, "comment": "地址积分"},
            {"name": "id", "type": "bigint", "default": null, "comment": "主键id"},
            {"name": "ord_id", "type": "character varying", "default": null, "comment": "交易id,对应atomical_id"},
            {"name": "slug", "type": "character varying", "default": null, "comment": "NFT slug"},
            {"name": "to_address", "type": "character varying", "default": null, "comment": "内存中总接收笔数"},
            {"name": "update_time", "type": "timestamp without time zone", "default": null, "comment": "落点"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "符文名称"},
        ],
        tableName: "con_god_stone",
        engine: "default"
    };

    return GodStone;
};
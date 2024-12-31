/**
 * con_duck_verify ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class DuckVerify extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    DuckVerify.configs = {
        fields: [
            {"name": "block_height", "type": "integer", "default": null, "comment": "区块高度"},
            {"name": "block_status", "type": "smallint", "default": null, "comment": "NFT slug"},
            {"name": "created_time", "type": "timestamp without time zone", "default": null, "comment": "过去24小时确认"},
            {"name": "ducks_num", "type": "integer", "default": null, "comment": "属性：全能属性 -7、光（Light）-0、水（Water）-1、暗（Darkness）-2、火（Fire）-3、地（Earth）-4、电（Lightning）-5、风（wind）-6"},
            {"name": "id", "type": "bigint", "default": null, "comment": "主键id"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "事件类型:transfer"},
        ],
        tableName: "con_duck_verify",
        engine: "default"
    };

    return DuckVerify;
};
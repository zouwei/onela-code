/**
 * ord_runes_info ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class RunesInfo extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    RunesInfo.configs = {
        fields: [
            {"name": "amount", "type": "numeric", "default": null, "comment": "NFT slug"},
            {"name": "burned", "type": "numeric", "default": null, "comment": "燃烧总量"},
            {"name": "cap", "type": "numeric", "default": null, "comment": "铸币部署后保持有效的铸币次数"},
            {"name": "circulating_supply", "type": "numeric", "default": null, "comment": "流通供应"},
            {"name": "cnt_smart_money", "type": "integer", "default": null, "comment": "聪明钱数量"},
            {"name": "created_time", "type": "timestamp without time zone", "default": "now()", "comment": "创建时间"},
            {"name": "divisibility", "type": "integer", "default": null, "comment": "区块高度上txid记录数量"},
            {"name": "etching", "type": "character varying", "default": null, "comment": "ticket名称"},
            {"name": "etching_block", "type": "integer", "default": null, "comment": "更新时间"},
            {"name": "etching_time", "type": "bigint", "default": null, "comment": "数据状态：0-未计算stone、1-已经计算stone"},
            {"name": "fdv_btc", "type": "character varying", "default": null, "comment": "tickerType"},
            {"name": "floor_price_marketplace", "type": "character varying", "default": null, "comment": "地板价市场"},
            {"name": "floor_price_marketplace_mapping", "type": "json", "default": null, "comment": "各市场地板价"},
            {"name": "height_end", "type": "character varying", "default": null, "comment": "mint进度"},
            {"name": "height_start", "type": "character varying", "default": null, "comment": "开始高度"},
            {"name": "holders", "type": "integer", "default": null, "comment": "持币地址数量"},
            {"name": "inscription_content_type", "type": "character varying", "default": null, "comment": "铭刻类型"},
            {"name": "inscription_delegate", "type": "character varying", "default": null, "comment": "铭刻代表"},
            {"name": "inscription_id", "type": "character varying", "default": null, "comment": "更新时间"},
            {"name": "last_mint_time", "type": "integer", "default": null, "comment": "最新铸造时间"},
            {"name": "market_cap_btc", "type": "character varying", "default": null, "comment": "tickerId"},
            {"name": "market_cap_usd", "type": "numeric", "default": null, "comment": "美元交易总量"},
            {"name": "mem_pool_mints", "type": "integer", "default": null, "comment": "内存池中的mint数量"},
            {"name": "mint_status", "type": "character varying", "default": null, "comment": "铸造状态"},
            {"name": "mint_time_start_history", "type": "character varying", "default": null, "comment": "mint 时间开始历史记录"},
            {"name": "minters_next_block", "type": "integer", "default": null, "comment": "铸币者的下一个区块"},
            {"name": "mints", "type": "integer", "default": null, "comment": "NFT编号"},
            {"name": "mints_10_block", "type": "integer", "default": null, "comment": "最近10个区块mint数量"},
            {"name": "mints_1_block", "type": "integer", "default": null, "comment": "最近1个区块mint数量"},
            {"name": "mints_1_day", "type": "integer", "default": null, "comment": "最近1天mint数量"},
            {"name": "mints_next_block", "type": "integer", "default": null, "comment": "铸造下一个区块"},
            {"name": "premine", "type": "numeric", "default": null, "comment": "批次排序"},
            {"name": "price_change", "type": "numeric", "default": null, "comment": "mint总数"},
            {"name": "price_sats", "type": "character varying", "default": null, "comment": "ticker"},
            {"name": "price_usd", "type": "numeric", "default": null, "comment": "美元价格"},
            {"name": "rune_id", "type": "character varying", "default": null, "comment": "主键id"},
            {"name": "rune_name", "type": "character varying", "default": null, "comment": "符文id"},
            {"name": "rune_number", "type": "integer", "default": null, "comment": "验证状态：0-未验证成功、1-验证成功"},
            {"name": "sales_cnt", "type": "integer", "default": null, "comment": "销售总量"},
            {"name": "sales_cnt_1h", "type": "integer", "default": null, "comment": "交易量"},
            {"name": "sales_cnt_24h", "type": "integer", "default": null, "comment": "24小时销售量"},
            {"name": "sales_cnt_7d", "type": "integer", "default": null, "comment": "交易量货币网址"},
            {"name": "spacers", "type": "integer", "default": null, "comment": "转账地址"},
            {"name": "supply", "type": "numeric", "default": null, "comment": "持有者变更率"},
            {"name": "symbol", "type": "character varying", "default": null, "comment": "持仓地址"},
            {"name": "update_time", "type": "timestamp without time zone", "default": "now()", "comment": "更新时间"},
            {"name": "valid", "type": "smallint", "default": "1", "comment": "是否有效（1有效；0无效）"},
            {"name": "volume_1h_btc", "type": "numeric", "default": null, "comment": "交易总数"},
            {"name": "volume_1h_usd", "type": "numeric", "default": null, "comment": "最近1小时美元交易量"},
            {"name": "volume_24h_btc", "type": "numeric", "default": null, "comment": "24小时BTC交易量"},
            {"name": "volume_24h_usd", "type": "numeric", "default": null, "comment": "最近24小时美元交易量"},
            {"name": "volume_7d_btc", "type": "numeric", "default": null, "comment": "usd价格"},
            {"name": "volume_7d_usd", "type": "numeric", "default": null, "comment": "最近7天美元交易量"},
            {"name": "volume_btc", "type": "numeric", "default": null, "comment": "BTC交易总量"},
            {"name": "volume_usd", "type": "numeric", "default": null, "comment": "美元交易量"},
        ],
        tableName: "ord_runes_info",
        engine: "default"
    };

    return RunesInfo;
};
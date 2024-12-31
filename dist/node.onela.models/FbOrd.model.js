/**
 * ord_fb_ord ORM实例对象
 */
module.exports = exports = function (OnelaBaseModel) {
    class FbOrd extends OnelaBaseModel {
        // 可以在此自定义扩展方法（默认封装没有的方法）
    }

    // 【重要】单例模式，数据表配置
    FbOrd.configs = {
        fields: [
            {"name": "chain", "type": "character varying", "default": null, "comment": "alpha铸币:默认-0、1-alpha铸币"},
            {"name": "confirmedMinted", "type": "character varying", "default": null, "comment": "符文名称"},
            {"name": "confirmedMinted1h", "type": "character varying", "default": null, "comment": "符文名称"},
            {"name": "confirmedMinted24h", "type": "character varying", "default": null, "comment": "矿机模式：1-组合矿机、2-单矿机"},
            {"name": "currentBlock", "type": "character varying", "default": null, "comment": "当前区块"},
            {"name": "currentWorkcTotalMinted", "type": "character varying", "default": null, "comment": "是否有效（1有效；0无效）"},
            {"name": "currentWorkcsupply", "type": "character varying", "default": null, "comment": "链上总交易笔数"},
            {"name": "deployedTime", "type": "character varying", "default": null, "comment": "更新时间"},
            {"name": "extraInfo", "type": "json", "default": null, "comment": "蚀刻id"},
            {"name": "holders", "type": "character varying", "default": null, "comment": "单张数量"},
            {"name": "holdersChangeRate", "type": "character varying", "default": null, "comment": "基础奖励小计"},
            {"name": "holdersChangeRate24H", "type": "character varying", "default": null, "comment": "前一个交易id"},
            {"name": "id", "type": "integer", "default": null, "comment": "主键id"},
            {"name": "image", "type": "character varying", "default": null, "comment": "NFT编号"},
            {"name": "isCollect", "type": "smallint", "default": null, "comment": "是否有效（1有效；0无效）"},
            {"name": "isLimitSupply", "type": "boolean", "default": null, "comment": "更新时间"},
            {"name": "limitPerMint", "type": "character varying", "default": null, "comment": "铭刻类型"},
            {"name": "marketCap", "type": "character varying", "default": null, "comment": "市值"},
            {"name": "mintType", "type": "character varying", "default": null, "comment": "时间戳"},
            {"name": "mintedProgress", "type": "integer", "default": null, "comment": "mint进度"},
            {"name": "price", "type": "character varying", "default": null, "comment": "当前价格"},
            {"name": "priceChangeRate", "type": "character varying", "default": null, "comment": "价格变动率"},
            {"name": "supply", "type": "character varying", "default": null, "comment": "最新铸造时间"},
            {"name": "supportInscribe", "type": "boolean", "default": null, "comment": "支持Inscribe"},
            {"name": "ticker", "type": "character varying", "default": null, "comment": "sats价格"},
            {"name": "tickerId", "type": "character varying", "default": null, "comment": "tickerId"},
            {"name": "tickerType", "type": "character varying", "default": null, "comment": "tickerType"},
            {"name": "totalMinted", "type": "character varying", "default": null, "comment": "价格变动"},
            {"name": "transactions", "type": "character varying", "default": null, "comment": "交易总数"},
            {"name": "usdMarketCap", "type": "character varying", "default": null, "comment": "usd市值"},
            {"name": "usdPrice", "type": "character varying", "default": null, "comment": "usd价格"},
            {"name": "usdVolume", "type": "character varying", "default": null, "comment": "usd交易量"},
            {"name": "volume", "type": "character varying", "default": null, "comment": "交易量"},
            {"name": "volumeChangeRate", "type": "character varying", "default": null, "comment": "24小时销售量"},
            {"name": "volumeCurrencyUrl", "type": "character varying", "default": null, "comment": "7天销售量"},
        ],
        tableName: "ord_fb_ord",
        engine: "default"
    };

    return FbOrd;
};
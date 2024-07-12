const fs = require("fs");
const { Onela, OnelaBaseModel } = require("onela");
// 申明一个单例实例对象
class SingletonModel extends OnelaBaseModel {
    // 模型字段可以配置为空

}

/**
 * onela实例访问数据库
 * 可以采用其他的ORM模型或者直连数据库
 */
class OnelaBase {

    /**
     * onela工具方法构造函数
     * 
     * @param databaseConfig 实例对象配置
     * {
     *      "database":"MYSQL",          //指定数据库类型：MYSQL
     *      "instance":"DEFAULT",        //数据库实例名称
     *      "tableName":"information_schema.tables"
     * }
     */
    constructor(databaseConfig) {
        // 数据库配置信息
        this.databaseConfig = databaseConfig;
        console.log("bug修复>>", databaseConfig);
        // // 初始化Onela模块
        Onela.init([this.databaseConfig]);          // 需要传值数组对象
        // 配置
        SingletonModel.configs = {
            fields: [
                // 表字段配置可以为空
            ],
            tableName: "",     //表名也可以为空 
            engine: databaseConfig.engine || "default"
        }

        //初始化配置
        this.instance = SingletonModel;
    }


    /**
     * 获取任意数据表的字段结构数组
     * 注意：数据表中至少有一条数据才能导出表结构字段的数组
     */



    /**
     * 获取指定表字段结构信息
     * @param {String} tableName // 必须指明数据库表名
     */
    getConfigFields(tableName) {
        // 获取表字段列表
        //获取实例对象
        let self = this;
         // 查询条件 ['column_name', 'is_nullable', 'data_type', 'character_maximum_length', 'column_comment']
         // 记录在创建表时提供的特定于类型的数据（例如， varchar 列的最大长度）。它被传递给特定于类型的输入函数和长度强制函数。对于不需要 atttypmod 的类型，该值通常为 -1。
        var sql = `
            SELECT tt.* FROM (
                SELECT DISTINCT cc.*,d.description as column_comment,row_number() over (partition by ordinal_position order by ordinal_position desc nulls last) as row_num
                    FROM pg_description as d,information_schema.columns as cc
                    WHERE d.objsubid = cc.ordinal_position AND "table_name" ='${tableName}' 
            ) as tt WHERE tt.row_num = 1;`;
        // console.log("sql>>>",sql)

        // 瀑布流查询(直接执行SQL，仅仅对单一数据库支持) 
        //执行数据请求
        return self.instance.streak(sql).then((data) => {
        //   console.log('获取到字段列表', JSON.stringify(data.rows));
            return Promise.resolve(data.rows);
        }).catch((ex) => {
            console.log("异常", ex.message);
            return Promise.reject(ex);
        });
    }

    /**
     * 获取表名称列表
     * instanceConfig
     */
    getTableNames() {
        //获取实例对象
        let self = this;
        //参数 select * from pg_tables WHERE schemaname='public'
        let paras = {
            "select": ['t.tablename as table_name', 't.schemaname as table_schema'],
            "where": [
                { "logic": "and", "key": "schemaname", "operator": "=", "value": 'public' }
            ]
        };

        //指定配置
        self.instance.configs.tableName = "pg_tables";
        // self.instanceConfig['tableName'] = "information_schema.tables";
        // let db_instance = onela(self.oodbc, self.instanceConfig);

         console.log("获取表名称列表：", paras)

        //数据请求
        return self.instance.getEntity(paras).then(function (data) {
            // console.log('data', data);
            return Promise.resolve(data);
        }).catch(function (ex) {
            console.log("异常", ex);
            return Promise.reject(ex);
        });

    }

}


module.exports = OnelaBase;
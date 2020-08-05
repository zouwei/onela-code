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
     * 
     * @param {String} tableName // 必须指明数据库表名
     */
    getConfigFields(tableName) {
        //获取实例对象
        let self = this;
        console.log("tableName>>>",tableName)
        let p = {
            // "select": ['column_name', 'is_nullable', 'data_type', 'character_maximum_length', 'column_comment'],
            "where": [
                { "logic": "and", "key": "table_name", "operator": "=", "value": tableName }
            ]
        };
        //指定配置
        self.instance.configs.tableName = "information_schema.columns";
        //执行数据请求
        return self.instance.getEntity(p).then((data) => {
            // console.log('获取到字段列表', data);
            return Promise.resolve(data);
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
        //参数

        let paras = {
            "select": ['t.table_name', 't.table_schema'],
            "where": [
                { "logic": "and", "key": "TABLE_SCHEMA", "operator": "=", "value": self.databaseConfig.value.database },
                { "logic": "and", "key": "TABLE_TYPE", "operator": "=", "value": "BASE TABLE" }
            ]
        };

        //指定配置
        self.instance.configs.tableName = "information_schema.tables";
        // self.instanceConfig['tableName'] = "information_schema.tables";
        // let db_instance = onela(self.oodbc, self.instanceConfig);

        // console.log("p参数", paras)

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
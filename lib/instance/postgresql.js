/**
 * 基于Mysql数据库
 */

const SingletonModel = require("./postgresql/postgresql.base.js");
const { DataName } = require("../data.name.js");

class Postgresql {


    /**
      * 数据库配置（直接复用onela配置结构）
      * @param {*} databaseConfig 
      */
    constructor(databaseConfig) {
        // 数据库配置
        this.databaseConfig = databaseConfig;
        // 数据库实例对象
        this.singletonModel = new SingletonModel(databaseConfig);
    }

    /**
     * 获取受支持的数据库组建模块
     */
    getCostruireAM() {
        const self = this;
        let database = self.databaseConfig.type;       // 数据库类型
        console.log('database>>>>>>', database);
        if (!database) {
            return Promise.reject(new Error(`${database} can not found action`))
        }
        let mod;

        const modePath = `./${database}/models.js`
        try {
            console.debug(`${database} path %s match successfully`, modePath);
            const am = require(modePath);
            // 初始化类对象
            mod = new am(this.singletonModel, self.databaseConfig);
        } catch (ex) {
            console.log('ex', ex)
            const message = `${database} can not found action，${ex.message}`;
            console.error(message)

            return Promise.reject(new Error(message));
        }
        return Promise.resolve(mod);
    }



    /**
     * 生产models代码
     * @param {*} args 
     * {
     *      path:"",            // 生成代码输出路径
     *      author:"onela",     // 作者
     *      nameSpace:"",       // 命名空间
     *      lu
     * }
     */
    async makeModels(args) {
        console.log(`....makeModels`)
        const self = this;
        // 处理模块
        let mod;
        return self.getCostruireAM().then(data => {
            mod = data;
            // 首先读取整库的数据库表
            return self.singletonModel.getTableNames();
        }).then(tables => {
            // 过滤不需要生成的表 allow 
            let newTables = DataName.allowTables(tables, args.allow);      // 如果不限制，则全部输出
            // 执行输出
            return Promise.resolve(newTables);         // 先不设定过滤逻辑
        }).then(tables => {
            // 获取全部的
            return mod.makeModels(args, tables);
        }).catch(ex => {
            throw ex;
        });
    }


    /**
     * 构建mappers映射层代码
     * @param {*} args 
     */
    makeMappers(args) {
        const self = this;
        // 处理模块
        let mod;
        return self.getCostruireAM().then(data => {
            mod = data;
            // 首先读取整库的数据库表
            return self.singletonModel.getTableNames();
        }).then(tables => {
            // 过滤不需要生成的表 allow 
            let newTables = DataName.allowTables(tables, args.allow);      // 如果不限制，则全部输出
            // 执行输出
            return Promise.resolve(newTables);         // 先不设定过滤逻辑
        }).then(tables => {
            // 获取全部的
            return mod.makeMappers(args, tables);
        }).catch(ex => {
            throw ex;
        });
    }

    /**
     * 构建mappers映射层代码
     * @param {*} args 
     */
    makeDaos(args) {
        const self = this;
        // 处理模块
        let mod;
        return self.getCostruireAM().then(data => {
            mod = data;
            // 首先读取整库的数据库表
            return self.singletonModel.getTableNames();
        }).then(tables => {
            // 过滤不需要生成的表 allow 
            let newTables = DataName.allowTables(tables, args.allow);      // 如果不限制，则全部输出
            // 执行输出
            return Promise.resolve(newTables);         // 先不设定过滤逻辑
        }).then(tables => {
            // 获取全部的
            return mod.makeDaos(args, tables);
        }).catch(ex => {
            throw ex;
        });
    }
    

}

module.exports = Postgresql;
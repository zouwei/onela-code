/**
 * 基于Node.js Onela实现的代码辅助代码生成工具
 * 工具方法，用来创建onela数据库表映射的初始配置文件
 */
class OnelaTools {

    /**
     * 数据库配置（直接复用onela配置结构）
     * @param {*} databaseConfig 
     */
    constructor(databaseConfig) {
        // 数据库配置
        this.databaseConfig = databaseConfig;
    }

    /**
     * 获取受支持的数据库组建模块
     * @param {JSON} database 
     */
    getCostruireAM() {
        let self = this;

        let database = self.databaseConfig.type;      // 数据库类型

        console.log('database>>>>>>', database);
        if (!database) {
            return Promise.reject(new Error(`${database} can not found action`))
        }
        let mod;

        const modePath = `./lib/instance/${database}.js`
        try {
            console.debug(`${database} path %s match successfully`, modePath);
            let am = require(modePath);
            console.log("引用文件...", am);
            mod = new am(self.databaseConfig);          // 实例化对象
        } catch (ex) {
            console.log('ex', ex)
            const message = `${database} can not found action，${ex.message}`;
            console.error(message)

            return Promise.reject(new Error(message));
        }
        return Promise.resolve(mod);
    }

    /**
     * 构建models代码
     * @param {*} args 
     */
    makeModels(args) {
        let self = this;
        // 获取组建
        return self.getCostruireAM().then(mod => {
            // 第二步，从组建中执行方法
            return mod.makeModels(args);
        }).then(data => {
            return Promise.resolve(data);           // 
        }).catch(ex => {
            return Promise.reject(ex);
        });
    }


    /**
     * 构建mappers映射层代码
     * @param {*} args 
     */
    makeMappers(args) {

        let self = this;
        const databaseConfig = self.databaseConfig; // 读取数据库结构
        // 获取组建
        return self.getCostruireAM(databaseConfig.type).then(mod => {
            // 第二步，从组建中执行方法
            return mod.makeMappers(args);
        }).then(data => {
            return Promise.resolve(data);           // 
        }).catch(ex => {
            return Promise.reject(ex);
        });
    }

}


module.exports = { OnelaTools };
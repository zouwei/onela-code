
const fs = require("fs");
const mustache = require("mustache");
// 加载编码转换模块
const iconv = require('iconv-lite');
const { DataType } = require("../../data.type.js");
const { DataName } = require("../../data.name.js");
const MysqlFields = require("./postgresql.fields.js");

class Models {

    /**
     * 
     * @param {*} instance 
     * @param {*} databaseConfig 
     */
    constructor(instance, databaseConfig) {

        this.instance = instance;
        this.databaseConfig = databaseConfig;
    }


    /**
     * Auto：获取全部的代码文件
     * @param {*} args 
     * @param {*} tables 
     */
    async makeModels(args, tables) {
        const self = this;
        let successCount = 0;       // 成功生成表数量
        // 默认值处理
        args.logic = "Model";
        // 遍历生成
        for (let i = 0; i < tables.length; i++) {
            console.log("表名>>>", tables[i])
            args.tableName = tables[i].table_name;       // 表名
            try {
                // 同步执行
                await self.massModelCode(args);
                successCount++;          // 成功数+1
            } catch (ex) {
                console.log(`出现异常：`, ex);
                // 继续执行
            }
        }
        // 代码执行完毕
        return Promise.resolve(`makeModels代码生成执行完毕，总表数量：${tables.length}，成功生成：${successCount}`);
    }


    /**
     * 量产Model代码
     * @param {*} args 
     */
    async massModelCode(args) {
        const self = this;
        // 量产代码 
        let defaultParam = {
            "engine": self.databaseConfig.engine,
            "createTime": (new Date()).toDateString(),
            "author": args.author || "onela",
            "nameSpace": args.nameSpace || ""               // 命名空间
            // 默认参数可继续添加
        }

        // 获取单例表全部字段（根据开发语言+框架模型处理字段输出）
        return self.getSingletonTableFields(args).then(newParam => {
            // 输出参数
            let outParam = Object.assign(newParam, defaultParam);          // 输出参数

            // 输出路径 
            let outFilePath = args.path + newParam.fileNmme; //输出文件路径

            console.log('输入文件路径验证', outFilePath);
            //输出判断
            try {
                // 检查写入权限
                fs.accessSync(outFilePath);
            }
            catch (ex) {

            }
            let file_exists = fs.existsSync(outFilePath);
            // 文件存在，删除源文件
            if (file_exists) {
                fs.unlinkSync(outFilePath);             // 删除文件，重新生成文件
            }
            // 把代码内容写入文件
            let text = mustache.render(newParam.templateContent, outParam);
            // appendFile，如果文件不存在，会自动创建新文件
            // 如果用writeFile，那么会删除旧文件，直接写新文件
            // 把中文转换成字节数组
            text = text
                .replace(/&#x2F;/g, '/')
                .replace(/&quot;/g, '"')
                .replace(/&#x3D;/g, '=')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#39;/g, "'");
            let arr = iconv.encode(text, 'utf-8');
            // 追加文本内容 
            fs.appendFileSync(outFilePath, text);

            return Promise.resolve(true);
        });
    }


    /**
     * Auto：获取全部的Mapper代码文件
     * @param {*} args 
     * @param {*} tables 
     */
    async makeMappers(args, tables) {
        const self = this;
        let successCount = 0;       // 成功生成表数量
        // 默认值处理
        args.logic = "Mapper";
        // 遍历生成
        for (let i = 0; i < tables.length; i++) {
            console.log("表名>>>", tables[i])
            args.tableName = tables[i].table_name;       // 表名
            try {
                // 同步执行
                await self.massMapperCode(args);
                successCount++;          // 成功数+1
            } catch (ex) {
                console.log(`出现异常：`, ex);
                // 继续执行
            }
        }
        // 代码执行完毕
        return Promise.resolve(`makeMappers代码生成执行完毕，总表数量：${tables.length}，成功生成：${successCount}`);
    }

    /**
     * 量产Mapper代码
     * @param {*} args 
     */
    async massMapperCode(args) {
        console.log("massMapperCode>>", args);
        const self = this;
        // 量产代码 
        let defaultParam = {
            "dataSource": args.dataSource ? `.${args.dataSource}` : "",          // 前面加点
            "createTime": (new Date()).toDateString(),
            "author": args.author || "onela",
            "nameSpace": args.nameSpace || ""               // 命名空间
            // 默认参数可继续添加
        }
        // 获取单例表全部字段（根据开发语言+框架模型处理字段输出）
        return self.getSingletonTableFields(args).then(newParam => {
            // 输出参数
            let outParam = Object.assign(newParam, defaultParam);          // 输出参数

            // 输出路径 
            let outFilePath = args.path + newParam.fileNmme; //输出文件路径

            console.log('输入文件路径验证', outFilePath);
            //输出判断
            try {
                // 检查写入权限
                fs.accessSync(outFilePath);
            }
            catch (ex) {

            }
            let file_exists = fs.existsSync(outFilePath);
            // 文件存在，删除源文件
            if (file_exists) {
                fs.unlinkSync(outFilePath);             // 删除文件，重新生成文件
            }
            // 把代码内容写入文件
            let text = mustache.render(newParam.templateContent, outParam);
            // appendFile，如果文件不存在，会自动创建新文件
            // 如果用writeFile，那么会删除旧文件，直接写新文件
            // 把中文转换成字节数组
            text = text
                .replace(/&#x2F;/g, '/')
                .replace(/&quot;/g, '"')
                .replace(/&#x3D;/g, '=')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#39;/g, "'");
            let arr = iconv.encode(text, 'utf-8');
            // 追加文本内容 
            fs.appendFileSync(outFilePath, arr);

            return Promise.resolve(true);
        });
    }


    /**
     * Auto：获取全部的代码文件
     * @param {*} args 
     * @param {*} tables 
     */
    async makeDaos(args, tables) {
        const self = this;
        let successCount = 0;       // 成功生成表数量
        // 默认值处理
        args.logic = "Dao";
        // 遍历生成
        for (let i = 0; i < tables.length; i++) {
            console.log("表名>>>", tables[i])
            args.tableName = tables[i].table_name;       // 表名
            try {
                // 同步执行
                await self.massDaoCode(args);
                successCount++;          // 成功数+1
            } catch (ex) {
                console.log(`出现异常：`, ex);
                // 继续执行
            }
        }
        // 代码执行完毕
        return Promise.resolve(`makeDaos代码生成执行完毕，总表数量：${tables.length}，成功生成：${successCount}`);
    }

    /**
    * 量产Dao代码
    * @param {*} args 
    */
    async massDaoCode(args) {
        const self = this;
        // 量产代码 
        let defaultParam = {
            "dataSource": args.dataSource ? `.${args.dataSource}` : "",          // 前面加点
            "engine": self.databaseConfig.engine,
            "createTime": (new Date()).toDateString(),
            "author": args.author || "onela",
            "nameSpace": args.nameSpace || ""               // 命名空间
            // 默认参数可继续添加
        }

        // 获取单例表全部字段（根据开发语言+框架模型处理字段输出）
        return self.getSingletonTableFields(args).then(newParam => {
            // 输出参数
            let outParam = Object.assign(newParam, defaultParam);          // 输出参数

            // 输出路径 
            let outFilePath = args.path + newParam.fileNmme; //输出文件路径

            console.log('输入文件路径验证', outFilePath);
            //输出判断
            try {
                // 检查写入权限
                fs.accessSync(outFilePath);
            }
            catch (ex) {

            }
            let file_exists = fs.existsSync(outFilePath);
            // 文件存在，删除源文件
            if (file_exists) {
                fs.unlinkSync(outFilePath);             // 删除文件，重新生成文件
            }
            // 把代码内容写入文件
            let text = mustache.render(newParam.templateContent, outParam);
            // appendFile，如果文件不存在，会自动创建新文件
            // 如果用writeFile，那么会删除旧文件，直接写新文件
            // 把中文转换成字节数组
            text = text
                .replace(/&#x2F;/g, '/')
                .replace(/&quot;/g, '"')
                .replace(/&#x3D;/g, '=')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#39;/g, "'");
            let arr = iconv.encode(text, 'utf-8');
            // 追加文本内容 
            fs.appendFileSync(outFilePath, arr);

            return Promise.resolve(true);
        });
    }

    /**
     * 获取单表全部字段
     * 
     * @param {*} args 
     * {
     *      tableName:"XXXX",       // 数据库表名
     *      language:"java",        // 开发语言
     *      logic:"",               // 逻辑层
     *      framework:"",           // 开发框架，默认为空
     * }
     */
    getSingletonTableFields(args) {

        const self = this;

        let instanceConfig = {
            "database": self.databaseConfig.type || "MYSQL",
            "instance": self.databaseConfig.engine || "DEFAULT",
            "tableName": args.tableName
        };
        

        // 查询字段
        return self.instance.getConfigFields(args.tableName).then(fields => {
            if (fields.length == 0) {
                return Promise.reject(new Error("未查询到表字段数据"));
            }
            // 处理字段列表
            let fieldModel = `${args.language}${args.logic || "Model"}${args.framework || ""}`;         // 如果一种语言超过

            console.log(`fieldModel>>${fieldModel}`);
            // 检查model处理方法是否存在
            const modFields = MysqlFields[fieldModel];       // 
            // 判断方法是否存在
            if (!modFields) {
                return Promise.reject(new Error(`未找到${args.language}${args.logic || "Model"}${args.framework || ""}，请检查开发语言以及框架模型是否支持代码自动创建`));
            }
            // 处理字段 
            return modFields(args.tableName, fields);       // 获取参数
        }).then(newParam => {
            return Promise.resolve(newParam);
        });
    }


}

module.exports = Models;
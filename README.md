# onela-tools辅助工具项目源码
> 基于node实现了辅助代码生成工具



有一定开发基础的同学，可以根据自己项目的需要，自行配置代码生成的模型来适应项目代码的自动化创建。



### 使用帮助

~~~shell
第一步：克隆代码
git clone https://github.com/zouwei/onela-tools.git

第二步：进入项目根目录
cd onela-tools

第三步：安装工程依赖
npm i

第四步：配置调用
下面给出单独的调用代码
~~~

**调用示例代码**

~~~js
/**
 * 配置数据源
 */
const DBCONFIG = [
    {
        "engine": "default",    // 数据库实例引擎，默认default即可
        "type": "mysql",        // 数据库类型：暂时只支持：mysql、postgresql（可扩展到其他数据库）
        "value": {
            "connectionLimit": 5,               // 连接池大小(工具项目此参数无所谓)
            "host": "127.0.0.1",                // 数据库host
            "port": 3306,                       // 数据库端口
            "user": "dev",                      // 账户
            "password": "xxxxxxxxxxxxxxxxxxx",  // 密码
            "database": "dev_db"                // 数据库
        }
    }
];

// 项目
const { OnelaTools } = require("./index.js");	// 引入工具代码（入口文件）
// 实例化工具模型
const tools = new OnelaTools(DBCONFIG[0]);		// 取数据源的第一个

// *************************************** Deno Code ************************************************

// 生成deno-model
let denoModelsParas = {
    "language": "deno",          // 生成代码语言版本
    "path": "./dist/deno.models/",            // 输出文件路径，指向到目录即可，结尾“/”
    //可选参数，否则会填写默认值【用来描述注释】
    "author": "huzou"
};
console.log(tools.makeModels(denoModelsParas));  			// Auto自动化构建项目代码

// *************************************** Nodejs Code ************************************************

// 生成node-model（Sequelize ORM框架代码）
let nodeModelsParas = {
    "language": "node",          // 生成代码语言版本
    "path": "./dist/node.sequelize.models/",            // 输出文件路径，指向到目录即可，结尾“/”
    //可选参数，否则会填写默认值【用来描述注释】
    "author": "huzou"
};
console.log(tools.makeModels(nodeModelsParas));  			// Auto自动化构建项目代码

// 生成node-model（Onela ORM框架代码）
let nodeModelsOnelaParas = {
    "language": "node",          // 生成代码语言版本
    "framework": "Onela",        // ORM框架
    "path": "./dist/node.onela.models/",            //输出文件路径，指向到目录即可，结尾“/”
    //可选参数，否则会填写默认值【用来描述注释】
    "author": "huzou"
};
console.log(tools.makeModels(nodeModelsOnelaParas));         // Auto自动化构建项目代码

// *************************************** Java Code ************************************************
// 生成java-models代码
let javaModelsParas = {
    "language": "java",          		// 生成代码语言版本
    "path": "./dist/java.models/",      //输出文件路径，指向到目录即可，结尾“/”
    //可选参数，否则会填写默认值【用来描述注释】
    "author": "huzou",
    "nameSpace": "com.mySpaceName.myProject.api.model"        // 命名空间
};
console.log(tools.makeModels(javaModelsParas));            // Auto自动化构建项目代码

// 生成java-mapper代码
let javaMappersParas = {
    "language": "java",          		// 生成代码语言版本
    "path": "./dist/java.mapper/",      //输出文件路径，指向到目录即可，结尾“/”
    "dataSource": "one",         		// 数据源标识
    //可选参数，否则会填写默认值【用来描述注释】
    "author": "huzou",
    "nameSpace": "com.mySpaceName.myProject"        // 命名空间
}
console.log(tools.makeMappers(javaMappersParas));         // Auto自动化构建项目代码

// 生成java-dao代码
let javaDaoParas = {
    "language": "java",          // 生成代码语言版本
    "path": "./dist/java.dao/",            //输出文件路径，指向到目录即可，结尾“/”
    "dataSource": "one",         // 数据源标识
    //可选参数，否则会填写默认值【用来描述注释】
    "author": "胡邹",
    "nameSpace": "com.mySpaceName.myProject"        // 命名空间
}
console.log(tools.makeDaos(javaDaoParas));         // 执行


// *************************************** C# Code ************************************************
// 生成csharp-models代码
let csharpModelsParas = {
    "language": "csharp",          		// 生成代码语言版本
    "path": "./dist/csharp.models/",      //输出文件路径，指向到目录即可，结尾“/”
    //可选参数，否则会填写默认值【用来描述注释】
    "author": "huzou",
    "nameSpace": "mySpaceName.myProject"        // 命名空间
};
console.log(tools.makeModels(csharpModelsParas));            // Auto自动化构建项目代码



~~~



根据需要调用，也可自行进行二次开发，构建你想要的代码。

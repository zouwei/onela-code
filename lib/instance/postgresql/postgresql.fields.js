const fs = require("fs");
const { DataType } = require("../../data.type.js");
const { DataName } = require("../../data.name.js");

class PostgresqlFields {
  /**
   * nodeModel代码
   * @param {*} tableName
   * @param {*} fields
   */
  static nodeModel(tableName, fields) {
    let new_param = {
      fields: [], // 字段列表
    };
    for (let i of fields) {
      // 局部变量
      let _datatype = DataType.getNodeDataTypeByMysql(
        i.column_default,
        i.character_maximum_length
      );
      // let _columnname = DataName.namingRules(i.column_name);      // 首字母小写驼峰
      // let _humpname = DataName.NamingRules(i.column_name);        // 首字母大写驼峰
      // type 需要单独处理下
      let dataTypes = `DataTypes.` + `${_datatype}`;
      if (i.data_type.toUpperCase() == "datetime")
        dataTypes = `DataTypes.` + `${_datatype}`;
      let item = {
        name: i.column_name,
        type: `DataTypes.` + `${_datatype}`,
        default: i.column_default ? " + i.column_default + " : "null",
        comment: i.column_comment,
        other: "",
      };
      // 是否为主键
      if (i.is_identity == "YES") item.other += `, primaryKey: true`;
      // 是否可以为空
      if (i.is_nullable.toUpperCase() == "NO")
        item.other += `, allowNull: false`;
      // 默认值
      if (i.column_default && i.column_default != "")
        item.other += `, defaultValue: "${i.column_default}"`;

      // if (i.EXTRA == "auto_increment")
      //     item.other += ", \"increment\": true";
      new_param.fields.push(item);
    }

    /**
     * 其他参数处理
     */
    new_param.className = DataName.NamingRules(tableName, 1); // 类名处理
    new_param.tableFullName = tableName; // 表全名
    let tableObject = DataName.tableObjectName(tableName); // 表对象名称处理
    new_param.prefix = tableObject.prefix; // 表前缀处理
    new_param.tableName = tableObject.tableName; // 表名（去掉前缀）

    // 输出文件名
    new_param.fileNmme = DataName.NamingRules(tableName, 1) + ".model.js"; // 可以自行添加后缀

    // 读取模板路径
    let templatePath =  ".\\lib\\templates\\node.models.sequelize.template";
    console.log(`路径输出:${templatePath}`)
    // 读取模板内容
    return PostgresqlFields.getTemplate(templatePath)
      .then((templateContent) => {
        new_param.templateContent = templateContent; // 模板内容
        // 返回页面元素替换参数
        return Promise.resolve(new_param);
      })
      .catch((ex) => {
        return Promise.reject(ex);
      });
  }

  /**
   * nodeModelOnela代码
   * @param {*} tableName
   * @param {*} fields
   */
  static nodeModelOnela(tableName, fields) {
    // 字段列表输出处理
    let new_param = {
      fields: [],
    };

    // console.log(`fields.....:${JSON.stringify(fields)}`)

    for (let i of fields) {
      let item = {
        name: i.column_name,
        type: i.data_type,
        default: i.column_default ? '"' + i.column_default + '"' : "null",
        comment: i.column_comment,
        other: "",
      };
      // 是否为主键
      if (i.COLUMN_KEY == "PRI") item.other = ', "primary": true';

      if (i.EXTRA == "auto_increment") item.other += ', "increment": true';
      new_param.fields.push(item);
    }

    // {
    //     TABLE_CATALOG: 'def',
    //     TABLE_SCHEMA: 'payment_db',
    //     TABLE_NAME: 'pay_account',
    //     COLUMN_NAME: 'id',
    //     ORDINAL_POSITION: 1,
    //     COLUMN_DEFAULT: null,
    //     IS_NULLABLE: 'NO',
    //     DATA_TYPE: 'varchar',
    //     CHARACTER_MAXIMUM_LENGTH: 50,
    //     CHARACTER_OCTET_LENGTH: 200,
    //     NUMERIC_PRECISION: null,
    //     NUMERIC_SCALE: null,
    //     DATETIME_PRECISION: null,
    //     CHARACTER_SET_NAME: 'utf8mb4',
    //     COLLATION_NAME: 'utf8mb4_general_ci',
    //     COLUMN_TYPE: 'varchar(50)',
    //     COLUMN_KEY: 'PRI',
    //     EXTRA: '',
    //     PRIVILEGES: 'select,insert,update,references',
    //     COLUMN_COMMENT: '主键ID',
    //     GENERATION_EXPRESSION: '' }

    /**
     * 其他参数处理
     */
    new_param.className = DataName.NamingRules(tableName, 1); // 类名处理
    new_param.tableFullName = tableName; // 表全名
    let tableObject = DataName.tableObjectName(tableName); // 表对象名称处理
    new_param.prefix = tableObject.prefix; // 表前缀处理
    new_param.tableName = tableObject.tableName; // 表名（去掉前缀）

    // 输出文件名
    new_param.fileNmme = DataName.NamingRules(tableName, 1) + ".model.js"; // 可以自行添加后缀

    // 读取模板路径
    let templatePath =  ".\\lib\\templates\\node.models.onela.template";
    // 读取模板内容
    return PostgresqlFields.getTemplate(templatePath)
      .then((templateContent) => {
        new_param.templateContent = templateContent; // 模板内容
        // 返回页面元素替换参数
        return Promise.resolve(new_param);
      })
      .catch((ex) => {
        return Promise.reject(ex);
      });
  }

  /**
   * denoMode代码
   * @param {*} tableName
   * @param {*} fields
   */
  static denoModel(tableName, fields) {
    let new_param = {
      fields: [],
    };
    for (let i of fields) {
      let item = {
        name: i.column_name,
        type: DataType.getDatabaseTypeConvert(
          i.data_type,
          "DENOTYPEBYMYSQL"
        ).toUpperCase(),
        default: i.column_default ? '"' + i.column_default + '"' : "null",
        comment: i.column_comment,
        other: " ",
      };
      // 是否为主键
      if (i.is_identity == "YES") item.other += ', "primaryKey": true';
      // 是否主键自增
      if (i.identity_generation == "ALWAYS") item.other += ', "autoIncrement": true';
      new_param.fields.push(item);
    }

    /**
     * 其他参数处理
     */
    new_param.className = DataName.NamingRules(tableName, 1); // 类名处理
    new_param.tableFullName = tableName; // 表全名
    let tableObject = DataName.tableObjectName(tableName); // 表对象名称处理
    new_param.prefix = tableObject.prefix; // 表前缀处理
    new_param.tableName = tableObject.tableName; // 表名（去掉前缀）

    // 输出文件名
    new_param.fileNmme = DataName.NamingRules(tableName, 1) + "Model.ts"; // 可以自行添加后缀

    // 读取模板路径
    let templatePath =  ".\\lib\\templates\\deno.models.template";
    // 读取模板内容
    return PostgresqlFields.getTemplate(templatePath)
      .then((templateContent) => {
        new_param.templateContent = templateContent; // 模板内容
        // 返回页面元素替换参数
        return Promise.resolve(new_param);
      })
      .catch((ex) => {
        return Promise.reject(ex);
      });
  }

  /**
   * javaModel代码
   * @param {*} tableName
   * @param {*} fields
   */
  static javaModel(tableName, fields) {
    // 私有属性、共有属性
    let new_param = {},
      private_args = [],
      public_args = [];
    // 遍历
    for (let i of fields) {
      // 局部变量
      let _datatype = DataType.getJavaDataTypeByMysql(i.data_type);
      let _columnname = DataName.namingRules(i.column_name); // 首字母小写驼峰
      let _humpname = DataName.NamingRules(i.column_name); // 首字母大写驼峰
      // 私有变量
      private_args.push(`    // ${i.column_comment}`);
      private_args.push(`    private ${_datatype} ${_columnname};`);
      // 共有变量
      public_args.push(`	/**`);
      public_args.push(`	 * 获取：${i.column_comment}`);
      public_args.push(`	 * @return`);
      public_args.push(`	 */`);
      public_args.push(`	public ${_datatype} get${_humpname}() {`);
      public_args.push(`		return ${_columnname};`);
      public_args.push(`	}`);
      public_args.push(`	/**`);
      public_args.push(`	 * 设置：${i.column_comment}`);
      public_args.push(`	 * @param ${_columnname}`);
      public_args.push(`	 */`);
      public_args.push(
        `	public void set${_humpname}(${_datatype} ${_columnname}) {`
      );
      public_args.push(`		this.${_columnname} = ${_columnname};`);
      public_args.push(`	}`);
    }

    new_param.privateStr = private_args.join("\n");
    new_param.publicStr = public_args.join("\n");

    /**
     * 其他参数处理
     */
    new_param.className = DataName.NamingRules(tableName, 1); // 类名处理
    new_param.tableFullName = tableName; // 表全名
    let tableObject = DataName.tableObjectName(tableName); // 表对象名称处理
    new_param.prefix = tableObject.prefix; // 表前缀处理
    new_param.tableName = tableObject.tableName; // 表名（去掉前缀）
    // 输出文件名
    new_param.fileNmme = DataName.NamingRules(tableName, 1) + ".java"; // 可以自行添加后缀

    // 读取模板路径
    let templatePath =  ".\\lib\\templates\\java.models.template";
    // 读取模板内容
    return PostgresqlFields.getTemplate(templatePath)
      .then((templateContent) => {
        new_param.templateContent = templateContent; // 模板内容
        // 返回页面元素替换参数
        return Promise.resolve(new_param);
      })
      .catch((ex) => {
        return Promise.reject(ex);
      });
  }

  /**
   * CsharpMode代码
   * @param {*} tableName
   * @param {*} fields
   */
  static csharpModel(tableName, fields) {
    let new_param = {
      fields: [],
    };
    for (let i of fields) {
      let item = {
        name: i.column_name,
        type: DataType.getDatabaseTypeConvert(i.data_type, "CSHARPTYPEBYMYSQL"), // 类型
        default: i.column_default ? i.column_default : "", // 默认值
        comment: i.column_comment .replace(/\n/g, ' '), // 字段备注，(可能有换行，需要处理)
        other: " ",
      };

      // 是否为主键
      if (i.is_identity == "YES") new_param.primaryKey = i.column_name; // 主键名称
      // // 是否主键自增
      // if (i.EXTRA == "auto_increment")
      //     item.other += ", \"autoIncrement\": true";
      new_param.fields.push(item);
    }

    /**
     * 其他参数处理
     */
    new_param.className = DataName.NamingRules(tableName, 1); // 类名处理
    new_param.tableFullName = tableName; // 表全名
    let tableObject = DataName.tableObjectName(tableName); // 表对象名称处理
    new_param.prefix = tableObject.prefix; // 表前缀处理
    new_param.tableName = tableObject.tableName; // 表名（去掉前缀）

    // 纠偏用户命名
    if (new_param.className == "")
      new_param.className = DataName.NamingRules(tableName, 0);

    // 输出文件名
    new_param.fileNmme = DataName.NamingRules(tableName, 1) + "Model.cs"; // 可以自行添加后缀

    // 临时文件命名
    new_param.fileNmme = new_param.tableFullName + ".cs"; // 类名与文件名保持一致

    // 读取模板路径
    let templatePath =  ".\\lib\\templates\\cshap.models.template";
    // 读取模板内容
    return PostgresqlFields.getTemplate(templatePath)
      .then((templateContent) => {
        new_param.templateContent = templateContent; // 模板内容
        // 返回页面元素替换参数
        return Promise.resolve(new_param);
      })
      .catch((ex) => {
        return Promise.reject(ex);
      });
  }

  /**
   * javaMapper代码
   * @param {*} tableName
   * @param {*} fields
   */
  static javaMapper(tableName, fields) {
    // 定义私有属性、共有属性
    let new_param = {},
      field_args = [],
      insert_field = [], // 单条插入，字段
      values_content = [], // 单条插入，值
      insert_cloumns = [], // 批量插入，字段列表
      insert_batch_field = [], // 批量插入，字段值
      where_query_record = [], // 查询记录表的条件
      where_query_exist = [];
    // 遍历
    for (let i of fields) {
      // 局部变量
      let _datatype = DataType.removeDataTypeIncompatible(i.data_type); // 转换成为java需要的类型
      let _columnname = DataName.namingRules(i.column_name); // 首字母小写驼峰 column_name
      let _humpname = DataName.NamingRules(i.column_name); // 首字母大写驼峰
      // 字段标记
      let full_column_name = i.column_name.toLowerCase();

      // 单条插入
      if (i.COLUMN_KEY == "PRI") {
        // （map映射字段—）
        field_args.push(
          `		<id column="${i.column_name}" property="${_columnname}" jdbcType="${_datatype}" />     <!--${i.column_comment}-->`
        );
      } else {
        field_args.push(
          `		<result column="${i.column_name}" property="${_columnname}" jdbcType="${_datatype}" />     <!--${i.column_comment}-->`
        );
      }

      if (full_column_name != "valid") {
        insert_field;
        insert_field.push(
          `			<if test="${_columnname} != null">${i.column_name},</if>`
        );
        values_content;
        values_content.push(
          `			<if test="${_columnname} != null">#{${_columnname},jdbcType=${_datatype}},</if>`
        );
      }

      //  批量插入
      insert_cloumns.push(i.column_name); // 列名追加
      insert_batch_field.push(`#{item.${_columnname}}`);

      if (full_column_name != "id" && full_column_name != "valid") {
        // 查询记录列表
        where_query_record.push(
          `		<if test="${_columnname}!=null and ${_columnname}!=''">`
        );
        where_query_record.push(
          `		 	and ${i.column_name} =#{${_columnname},jdbcType=${_datatype}}`
        );
        where_query_record.push(`		</if>`);

        // 查询记录存在的列表
        where_query_exist.push(`		<choose>`);
        where_query_exist.push(
          `			<when test="${_columnname} ==null  or ${_columnname} ==''">`
        );
        where_query_exist.push(
          `				and ( ${i.column_name} is null  or ${i.column_name}='' )`
        );
        where_query_exist.push(`			</when>`);
        where_query_exist.push(
          `			<when test="${_columnname}!=null  and ${_columnname} !=''">`
        );
        where_query_exist.push(
          `				and ${i.column_name} = #{${i.column_name},jdbcType=${_datatype}}`
        );
        where_query_exist.push(`			</when>`);
        where_query_exist.push(`		</choose>`);
      }
    }

    // 填充内容
    new_param.content_str = field_args.join("\n");
    new_param.insert_field = insert_field.join("\n");
    new_param.values_content = values_content.join("\n");
    // 批量插入
    new_param.insert_cloumns = insert_cloumns.join(",");
    new_param.insert_batch_field = insert_batch_field.join(",");
    // 查询记录列表
    new_param.where_query_exist = where_query_exist.join("\n");
    // 查询记录列表
    new_param.where_query_record = where_query_record.join("\n");

    // 内容处理
    // 输出配置更新，根据表名更新
    // new_param.output_path = new_param.path.replace('.', '') + item.table_name + "/";
    // console.log(" new_param.output_path ", new_param.output_path);

    // 默认参数处理
    new_param.className = DataName.NamingRules(tableName, 1); // 类名处理
    new_param.tableFullName = tableName; // 表全名
    let tableObject = DataName.tableObjectName(tableName); // 表对象名称处理
    new_param.prefix = tableObject.prefix; // 表前缀处理
    new_param.tableName = tableObject.tableName; // 表名（去掉前缀）

    /**
     * 模板
     */

    // 输出文件名
    new_param.fileNmme = DataName.NamingRules(tableName, 1) + "Mapper.xml"; // 可以自行添加后缀

    // 读取模板路径

    let templatePath =  ".\\lib\\templates\\java.mapper.template";
    // 读取模板内容
    return PostgresqlFields.getTemplate(templatePath)
      .then((templateContent) => {
        new_param.templateContent = templateContent; // 模板内容
        // 返回页面元素替换参数
        return Promise.resolve(new_param);
      })
      .catch((ex) => {
        return Promise.reject(ex);
      });
  }

  /**
   * javaDao代码
   * @param {*} tableName
   * @param {*} fields
   */
  static javaDao(tableName, fields) {
    // 私有属性、共有属性
    let new_param = {};

    /**
     * 其他参数处理
     */
    new_param.className = DataName.NamingRules(tableName, 1); // 类名处理
    new_param.tableFullName = tableName; // 表全名
    let tableObject = DataName.tableObjectName(tableName); // 表对象名称处理
    new_param.prefix = tableObject.prefix; // 表前缀处理
    new_param.tableName = tableObject.tableName; // 表名（去掉前缀）
    // 输出文件名
    new_param.fileNmme = DataName.NamingRules(tableName, 1) + "Mapper.java"; // 可以自行添加后缀

    // 读取模板路径
    let templatePath =  ".\\lib\\templates\\java.dao.template";
    // 读取模板内容
    return PostgresqlFields.getTemplate(templatePath)
      .then((templateContent) => {
        new_param.templateContent = templateContent; // 模板内容
        // 返回页面元素替换参数
        return Promise.resolve(new_param);
      })
      .catch((ex) => {
        return Promise.reject(ex);
      });
  }

  /**
   * 读取代码模块
   */
  static getTemplate(path) {
    return new Promise(function (resolve, reject) {
      //容错判断没有做，可能存在文件存在，里面没有JSON结构的情况
      try {
        fs.readFile(path, function (err, text) {
          if (err) {
            console.log(err);
            reject(new Error("模板配置不存在"));
          } else {
            //这里可能出现错误的情况，暂时不考虑了
            resolve(text.toString());
          }
        });
      } catch (ex) {
        console.log(ex);
        reject(ex);
      }
    });
  }
}
module.exports = PostgresqlFields;

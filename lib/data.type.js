

// mysql（java）数据类型映射表
const JAVATYPEBYMYSQL = [
    ["VARCHAR", "String"],
    ["CHAR", "String"],
    ["BLOB", "byte[]"],
    ["TEXT", "String"],
    ["LONGTEXT", "String"],
    ["INT", "Integer"],
    ["INTEGER", "Integer"],
    ["TINYINT", "Integer"],
    ["SMALLINT", "Integer"],
    ["MEDIUMINT", "Integer"],
    ["BIT", "byte[]"],
    ["MEDIUMBLOB", "byte[]"],
    ["LONGBLOB", "byte[]"],
    ["BIGINT", "Long"],
    ["FLOAT", "Float"],
    ["DOUBLE", "Double"],
    ["DECIMAL", "BigDecimal"],
    ["BOOLEAN", "BOOLEAN"],
    ["ID", "Long"],
    ["DATE", "Date"],
    ["TIME", "Time"],
    ["DATETIME", "String"],
    ["TIMESTAMP", "Timestamp"],
    ["YEAR", "Date"]
]
// mysql（deno）数据库类型对照表
const DENOTYPEBYMYSQL = [
    ["VARCHAR", "String"],
    ["CHAR", "String"],
    ["BLOB", "binary"],
    ["TEXT", "String"],
    ["LONGTEXT", "String"],
    ["INT", "Integer"],
    ["INTEGER", "Integer"],
    ["TINYINT", "Integer"],
    ["SMALLINT", "Integer"],
    ["MEDIUMINT", "Integer"],
    ["BIT", "Binary"],
    ["MEDIUMBLOB", "Binary"],
    ["LONGBLOB", "Binary"],
    ["BIGINT", "BIG_INTEGER"],
    ["FLOAT", "Float"],
    ["DOUBLE", "BIG_INTEGER"],
    ["DECIMAL", "BigDecimal"],
    ["BOOLEAN", "BOOLEAN"],
    ["ID", "BIG_INTEGER"],
    ["DATE", "Date"],
    ["TIME", "Time"],
    ["DATETIME", "String"],
    ["TIMESTAMP", "Timestamp"],
    ["YEAR", "Date"]
]

// jdbcType（未使用）
const JDBCTYPE = [
    ["ARRAY", "ARRAY"],            // ARRAY(2003),
    ["BIT", "BIT"],      // BIT(-7),
    ["TINYINT", "TINYINT"],    // -6),
    ["SMALLINT", "SMALLINT"],    // 5),
    ["INTEGER", "INTEGER"],    // 4),
    ["BIGINT", "BIGINT"],    // -5),
    ["FLOAT", "FLOAT"],    // 6),
    ["REAL", "REAL"],    // 7),
    ["DOUBLE", "DOUBLE"],    // 8),
    ["NUMERIC", "NUMERIC"],    // 2),
    ["DECIMAL", "DECIMAL"],    // 3),
    ["CHAR", "CHAR"],    // 1),
    ["VARCHAR", "VARCHAR"],    // 12),
    ["LONGVARCHAR", "LONGVARCHAR"],    // -1),
    ["DATE", "DATE"],    // 91),
    ["TIME", "TIME"],    // 92),
    ["TIMESTAMP", "TIMESTAMP"],    // 93),
    ["BINARY", "BINARY"],    // -2),
    ["VARBINARY", "VARBINARY"],    // -3),
    ["LONGVARBINARY", "LONGVARBINARY"],    // -4),
    ["NULL", "NULL"],    // 0),
    ["OTHER", "OTHER"],    // 1111),
    ["BLOB", "BLOB"],    // 2004),
    ["CLOB", "CLOB"],    // 2005),
    ["BOOLEAN", "BOOLEAN"],    // 16),
    ["CURSOR", "CURSOR"],    // -10),
    ["UNDEFINED", "UNDEFINED"],    // -2147482648),
    ["NVARCHAR", "NVARCHAR"],    // -9),
    ["NCHAR", "NCHAR"],    // -15),
    ["NCLOB", "NCLOB"],    // 2011),
    ["STRUCT", "STRUCT"],    // 2002),
    ["JAVA_OBJECT", "JAVA_OBJECT"],    // 2000),
    ["DISTINCT", "DISTINCT"],    // 2001),
    ["REF", "REF"],    // 2006),
    ["DATALINK", "DATALINK"],    // 70),
    ["ROWID", "ROWID"],    // -8),
    ["LONGNVARCHAR", "LONGNVARCHAR"],    // -16),
    ["SQLXML", "SQLXML"],    // 2009),
    ["DATETIMEOFFSET", "DATETIMEOFFSET"]    // -155)
]

// jdbcType 偏差值
const JDBCTYPEDEVIATION = [
    ["DATETIME", "VARCHAR"],
    ["INT", "INTEGER"],
    ["JSON", "VARCHAR"],
    ["TEXT", "VARCHAR"],
    ["LONGTEXT", "VARCHAR"]
]



class DataType {

    /**
     * 数据库字段类型转换
     * @param {*} typeName 数据库字段名称
     * @param {*} CODINGTABLE 码表
     */
    static getDatabaseTypeConvert(typeName, CODINGTABLE) {
        let map = new Map(eval(CODINGTABLE));

        let s = map.get(typeName.toUpperCase());

        if (!s || typeof (s) == "undefined" && exp == 0) {
            s = "String";
            console.log("字段类型>>", typeName);
            console.log(typeName)
        }

        return s;
    }


    /**
     * 获取java类型
     * @param {*} typeName 
     */
    static getJavaDataTypeByMysql(typeName) {

        let map = new Map(JAVATYPEBYMYSQL);

        let s = map.get(typeName.toUpperCase());

        if (!s || typeof (s) == "undefined" && exp == 0) {
            s = "String";
            console.log("字段类型>>", typeName);
            console.log(typeName)
        }

        return s;
    }

    /**
     * 消除DataType不兼容部分
     * @param {*} typeName 
     */
    static removeDataTypeIncompatible(typeName) {
        let map = new Map(JDBCTYPEDEVIATION);

        let s = map.get(typeName.toUpperCase());

        if (!s || typeof (s) == "undefined" && exp == 0) {
            s = typeName.toUpperCase();
        }

        return s;
    }
}


module.exports = { DataType };



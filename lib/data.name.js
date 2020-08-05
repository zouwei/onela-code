
class DataName {


    /**
     * 命名规则
     * @param {*} column_name                                                                                                                                
     */
    static namingRules(column_name, position = 0) {
        // 首期母小写，后续单词首字母大写
        let result = "";
        let names = column_name.split("_");
        names.forEach((name, index) => {
            if (index >= position) {
                if (index == position) {
                    // 首字母小写 toUpperCase  toLowerCase
                    result += name.toLowerCase();
                }
                else {
                    result += name.substr(0, 1).toUpperCase();
                    result += name.substr(1).toLowerCase();
                }
            }
        });
        return result;
    }

    /**
     * 命名规则
     * @param {*} column_name 
     */
    static NamingRules(column_name, position = 0) {
        // 首期母小写，后续单词首字母大写 
        let result = "";
        let names = column_name.split("_");
        names.forEach((name, index) => {
            if (index >= position) {
                // 首字母大写 toUpperCase  toLowerCase
                result += name.substr(0, 1).toUpperCase();
                result += name.substr(1).toLowerCase();
            }
        });
        return result;
    }

    /**
     * 表对象名称处理
     * @param {*} tableFullName 
     */
    static tableObjectName(tableFullName) {
        let prefix = "one";           // 前缀
        let tableName = "";           // 表对象名
        //通过下划线分割
        let ts = tableFullName.split('_');
        if (ts.length > 1) {
            //前缀小写
            prefix = ts[0].toLowerCase();
            //名称，首字母大写
            for (let ti = 1; ti < ts.length; ti++)
                tableName += ts[ti].substr(0, 1).toUpperCase() + ts[ti].substr(1);
        } else {
            tableName = tableFullName.toLowerCase();           // 全小写
        }
        // 返回对象
        return { prefix, tableName };
    }
}

module.exports = { DataName };

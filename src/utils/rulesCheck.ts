// 注释类型
interface fromModel {
    // 任意 key 传入的类型
    [propName: string]: string;
}
interface ruleModel {
    // 任意 key 传入的类型： 返回 true 或 string 的一组函数
    [propName: string]: Array<((val: string) => true | string)>;
}

// 检查是否全部属性通过验证
export function check_rules(form: fromModel, rule: ruleModel) {
    for (const key in form) {
        // 取出相同 key 并判断 key 是否存在
        if (Object.prototype.hasOwnProperty.call(rule, key)) {
            for (const iterator of rule[key]) {
                // 返回不为 true
                if (iterator(form[key]) != true) {
                    return false;
                };
            }
        }
    }

    // 通过验证
    return true;
}
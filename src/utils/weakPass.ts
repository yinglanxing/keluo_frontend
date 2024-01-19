
// 弱密码表
const week_pass_list = [
    '01234567890',
    '09876543210',
    'qwertyuiopasdfghjklzxcvbnm',
    'QWERTYUIOPASDFGHJKLZXCVBNM',
    'mnbvcxzlkjhgfdsapoiuytrewq',
    'MNBVCXZLKJHGFDSAPOIUYTREWQ',
    'zyxwvutsrqponmlkjihgfedcba',
    'ZYXWVUTSRQPONMLKJIHGFEDCBA',
];

// 检查是否全部属性通过验证 返回等级 0 - 3
export function check_week_pass(pass: string) {
    console.log(pass, 'check');

    // 密码是其中规律的一种
    for (const iterator of week_pass_list) {
        if (iterator.indexOf(pass) > -1) {
            return 0;
        }
    }

    // 检查复文字高密度出现
    for (const iterator of pass) {
        let count = 0;
        for (const key of pass) {
            if (iterator == key) {
                count++;
                // 高密度重复四次以上
                if (count > 4) {
                    return 0;
                }
            } else {
                count = 0;
            }
        }
    }

    const reg1 = pass.length >= 6 && pass.length <= 18;  // 长度在6到18之间
    const reg2 = /(?:.*[a-z].*)/.test(pass); // 包含小写
    const reg3 = /(?:.*[A-Z].*)/.test(pass); // 包含大写
    const reg4 = /(?:.*\d.*)/.test(pass); // 包含数字
    const reg5 = /(?:.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]].*)/.test(pass); // 包含特殊字符
    const reg6 = pass.length >= 8;  // 大于8位

    // console.log('2包含小写', reg2);
    // console.log('3包含大写', reg3);
    // console.log('4包含数字', reg4);
    // console.log('5包含特殊字符', reg5);
    if (reg6 && reg2 && reg3 && reg4 && reg5) {
        // 符合所有要求 绿色
        return 3;
    } else if (reg6 && reg4 && (reg2 || reg3 || reg5)) {
        // 大于 8 含数字，但2、3、5条件完成了一种 (黄色)
        return 2;
    } else if (reg1) {
        // 长度达到 6 不超过 18
        return 1;
    } else {
        return 0;
    }
}
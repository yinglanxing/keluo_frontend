// 登录用户自身信息
export interface SelfInfo {
    // 登录板状态
    loginPlain: number,
    // 用户身份
    userToken: string | null,
    // 当前用户
    info: UserInfo,
}

// 用户信息
export interface UserInfo {
    // id
    id: number,
    // 头像
    avatar?: string,
    // 背景图
    backgroundImage?: string,

    // 积分
    score: number,
    // 评论统计
    commentCount: number,
    // 文章统计
    topicCount: number,
    // 被关注统计
    fansCount: number,
    // 关注统计
    followCount: number,
    // 创建时间
    createTime: number,

    // 被 ban 禁用用户
    forbidden: boolean,
    // 已关注
    followed: boolean,

    // todo create
    // 名称
    // name: string,
    // 座右铭 | 简述
    // motto: number,
    // 管理员身份
    // readonly admin: boolean,

    // todo delete
    // 昵称 绰号 外号
    nickname: string,
    // 自我介绍
    description: string,
    // 用户主页
    homePage: string,

    // ? 唯一账号名？
    username: string,
    // ? 封禁状态？其他状态?
    status: number,
}

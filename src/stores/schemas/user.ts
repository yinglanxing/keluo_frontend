// token 格式
export interface TokenJson{
    a_token: string,
    r_token: string,
}

// 登录用户自身信息
export interface SelfInfo {
    // 登录板状态
    loginPlain: number,
    // 用户身份
    userToken: string | null,
    resetToken: string | null,
    // 当前用户
    info: UserInfo,
}

// 用户信息
export interface UserInfo {

    // "userID": "203492",
    // "email": "root@qq.com",
    // "github": "",
    // "position": "",

    // id
    id: number,
    // 头像
    avatar: string,
    // 背景图
    backgroundImage: string,
    // 账号名
    username: string,

    // 积分
    score: number,
    // 评论统计
    commentCount: number,
    // 文章统计
    topicCount: number,
    // 被关注统计
    follower: number,
    // 关注统计
    following: number,
    // 创建时间
    createTime: number,
    // 用户主页
    homePage: string,
    // 介绍
    introduction: string,
    // 已关注
    isFollow: boolean,

    // 封禁状态 其他状态
    status: number,
}

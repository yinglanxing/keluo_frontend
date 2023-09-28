// 用户信息接口


// 用户信息
interface UserInfo {
    // id
    id: number
    // 头像
    avatar: string | null
    // 背景图
    backgroundImage: string | null

    // 积分
    score: number
    // 评论统计
    commentCount: number
    // 被关注统计
    fansCount: number
    // 关注统计
    followCount: number
    // 创建时间
    createTime: number

    // 被 ban 禁用用户
    forbidden: boolean
    // 已关注
    followed: boolean

    // todo create
    // // 名称
    // name: string
    // // 座右铭 | 简述
    // motto: number
    // // 管理员身份
    // admin: boolean

    // todo delete
    // 昵称 绰号 外号
    nickname: string
    // 自我介绍
    description: string

    // 迷惑变量
    // ??? 唯一账号名？
    username: string
    // ??? 封禁状态？其他状态?
    status: number
}

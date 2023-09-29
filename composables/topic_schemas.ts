// 用户信息接口


// Topic信息
interface TopicInfo {
    topicId: number
    type: number
    user: UserInfo
    node: NodeInfo
    tags: [string] | null
    title: string
    // 总结;概要;概括
    summary: string
    // 内容
    content: string
    // 图片列表
    imageList: [string]
    // 最后评论时间
    lastCommentTime: number
    viewCount: number
    // 评论统计
    commentCount: number
    // 喜欢统计
    likeCount: number
    liked: boolean
    // 创建时间
    createTime: number
    // 用户已收藏
    favorited: boolean
    // ip位置
    ipLocation: string
    recommend: false
    recommendTime: number
    sticky: boolean
    stickyTime: number
}

// 节点分类
interface NodeInfo {
    nodeId: number
    name: string
    // 图标
    logo: string
    // 简述
    description: string
}


// // 文章信息
// interface ArticleInfo {
//     // id
//     id: number
//     // 标题
//     title: string
//     // 标签
//     tags: []
//     // 划分到的主区域
//     basic: string
//     // 时间
//     time: number
//     // 作者 id
//     author: number
//
// }

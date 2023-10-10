// 回复详情
import { UserInfo } from 'stores/schemas/user';

export interface CommentReplies {
    // 内容列表
    'results': CommentInfo[],
    // 翻页信息
    'cursor': string,
    // 可翻页 flag
    'hasMore': boolean,
}

// 评论信息
export interface CommentInfo {
    // id
    'commentId': number,
    // 用户信息
    'user': UserInfo,

    // 评论目标
    'entityType': 'article',
    'entityId': 6208735,

    // 内容类型
    'contentType': 'text',
    // 内容
    'content': 'wqw',

    // 图片列表
    'imageList'?: string[],
    // 回复统计
    'commentCount': 1,
    // 已点赞
    'liked': boolean,
    // 总赞数
    'likeCount': 0,

    // ! 回复内容1
    'quote'?: CommentInfo,
    'quoteId': 0,

    // ! 回复内容2
    'replies'?: CommentReplies,
    // ip位置
    'ipLocation': string,

    // 状态码
    'status': number,
    // 创建时间
    'createTime': number,
}

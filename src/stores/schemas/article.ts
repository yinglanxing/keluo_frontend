// 用户信息模型
import {UserInfo} from 'stores/schemas/user';

// 封面细节
interface CoverDetail {
    url: string,
    preview: string,
}

// 标签细节
interface TagsDetail {
    tagId: number,
    tagName: string
}

// Article信息
export interface ArticleInfo {
    // id
    articleId: number,
    // 标题
    title: string,
    // 简述、摘要
    summary: string,
    // 用户
    user: UserInfo,
    // 原文路径
    sourceUrl: string,

    // 封面
    cover?: CoverDetail,
    // 标签
    tags?: TagsDetail[],
    // 文章内容
    content?: string

    // ? 状态
    status: number,

    // 看过统计
    viewCount: number,
    // 评论统计
    commentCount: number,
    // 收藏统计
    likeCount: number,
    // 创建时间
    createTime: number,
    // 用户已收藏
    favorited: boolean,
}

// 取得 article 时的所有信息
export interface ArticleListInfo {
    // 错误码
    errorCode: number,
    // 相关信息
    message: string,
    // 成功
    success: boolean,
    // 数据
    data: {
        // 列表
        results: ArticleInfo,
        // 获取下一页的状态码
        cursor: string,
        // 有更多数据
        hasMore: boolean,
    },

}

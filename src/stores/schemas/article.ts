// 用户信息模型
import { UserInfo } from 'stores/schemas/user';
import { TagInfoDetail } from './tag';

// 封面细节
export interface ArticleDetail {
    article: ArticleInfo,
    isCollected: boolean,
    isLiked: boolean,
    tags: TagInfoDetail[],
    userInfo: UserInfo,
}

// Article信息
export interface ArticleInfo {
    // 用户 id
    authorID: number,
    // draft id
    did: number,
    // id
    id: number,
    // 标题
    title: string,
    // 副标题
    subtitle: string,
    // 用户
    user: UserInfo,
    // 原文路径
    sourceUrl: string,
    // 封面
    image: string,
    // 文章内容
    content: string;
    // 看过统计
    viewCount: number,
    // 评论统计
    comments: number,
    // 推荐统计
    likes: number,
    // 创建时间
    createTime: number,
    // 格式化后的时间
    format: string,
    // 已收藏
    isCollected: boolean,
    // 已喜欢
    isLiked: boolean,
    // tags
    tags: TagInfoDetail[];

    html: string,
    markdown: string,

    source: string,
}

// Article页面内容
export interface ApiArticleInfo {
    authorName: string,
    avatar: string;
    articleInfo: ArticleInfo,
}


export interface DraftInfo {
    id: number,
    authorID: number,
    title: string,
    subtitle: string,
    content: string,
    format: string,
    image: string,
}

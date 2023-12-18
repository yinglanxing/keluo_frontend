// 回复详情
export interface CommentListItem {
    comment_id: string,
    comment_info: CommentInfo,
    user_info: CommentUserInfo,
    reply_infos: ReplyInfos[],
}

export interface CommentInfo {
    is_like: boolean,
    is_click: boolean,
    reply_count: number,
    item_type: number,
    comment_status: number,
    likes: number,
    comment_id: string,
    user_id: string,
    item_id: string,
    content: string,
    picture: string,
    format: string,
    create_time: string,
    binding: string,
    comment_replies: CommentReply[],
}

// 评论列表类型
export interface CommentReply {
    is_like: boolean,
    is_click: boolean,
    level: number,
    item_type: number,
    likes: number,
    reply_status: number,
    reply_comment_id: string,
    reply_id: string,
    reply_to_reply_id: string,
    user_id: string,
    reply_to_user_id: string,
    item_id: string,
    reply_content: string,
    reply_picture: string,
    format: string,
    binding: string,
    create_time: string,
}


export interface ReplyInfos {
    reply_id: string,
    reply_info: CommentReply,
    parent_reply: CommentReply,
    user_info: CommentUserInfo,
    reply_user: CommentUserInfo,
}


export interface CommentUserInfo {
    userID: string,
    follower: number,
    following: number,
    username: string,
    avatar: string,
    email: string,
    introduction: string,
    homePage: string,
    github: string,
    position: string,
    isFollow: boolean,
}

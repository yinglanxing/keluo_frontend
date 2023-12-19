
// 标签细节
export interface TagInfoDetail {
    id:             number
    name:           string,
    image:          string,
    introduction:   string,
    isFollow:       boolean,
    followerNum:    number,
    articleNum:     number,
}


export interface SelectableTag {
    id:             number
    num:            string,
    f_num:          number,
    name:           string,
    image:          string,
    isFollow:       boolean,
}

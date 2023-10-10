// dom 目标
interface DomElement {
    // 客户端矩形的底部
    bottom: number,
    // 客户端矩形的高度
    height: number,
    // 客户端矩形的左侧
    left: number,
    // 客户矩形的右侧
    right: number,
    // 客户端矩形的顶部
    top: number,
    // 客户端矩形的宽度
    width: number,
    // 客户端矩形的x位置
    x: number,
    // 客户端矩形的y位置
    y: number,
}

// 鼠标位置
interface MousePixel {
    // 鼠标相对于顶部的像素
    top: number,
    // 鼠标相对于左侧的像素
    left: number,
}

// 像素
interface Pixel {
    x: number,
    y: number,
}

// touch-pan 事件
export interface TouchPanEvent {
    // 由触摸事件触发
    touch?: boolean,
    // 由鼠标事件触发
    mouse?: boolean,
    // 事件位置对象
    position?: MousePixel,
    // 移动方向
    direction?: 'up' | 'right' | 'down' | 'left',
    // 自从移动开始以来第一次调用
    isFirst?: boolean,
    // 自上次移动结束以来是最后一次被调用
    isFinal?: boolean,
    // 触发事件所花费的时间(毫秒)
    duration?: number,
    // 从初始点开始移动的距离的绝对值(像素)
    distance?: Pixel,
    // 从初始点开始移动的距离(像素)
    offset?: Pixel,
    // 自上次调用处理程序以来的距离增量(像素)
    delta?: Pixel,
}

// Intersection 事件

export interface IntersectionEvent {
    // 包含客户端矩形信息的对象
    boundingClientRect?: DomElement,
    // 观察对象的可见性比率
    intersectionRatio?: number,
    // 包含客户端矩形信息的对象
    intersectionRect?: DomElement,
    // 如果与可滚动区域相交，则为Boolean true
    isIntersecting?: boolean,
    // 包含客户端矩形信息的对象
    rootBounds?: DomElement,
    // 目标元素
    target?: Element,
    // 事件的时间戳
    time?: number,
}

import error from './notify/errors';
import status from './notify/status';
import button from './notify/button';
import other from './other';

export default {
    ...error,
    ...status,
    ...button,
    ...other,

    // nav bar
    'nav.hot': '热门',
    'nav.new': '最新',
    'nav.follow': '关注',


    // 登录界面
    'form.name': '账户名称',
    'form.email': '用户邮箱',
    'form.pass': '用户密码',
    'form.repass': '确认密码',
    'form.v_code': '验证码',

    // 登录提示
    'login_tips.title': '登录开启更多功能',
    'login_tips.p1': '更懂你的优质内容',
    'login_tips.p2': '更专业的大咖答主',
    'login_tips.p3': '更深度的互动交流',
    'login_tips.p4': '更高效的创作环境',
    'login_tips.req_account': '没有账号？',
    'login_tips.signup': '前往注册',
    'login_tips.other_account': '第三方账号登录',

    // 侧边栏内容
    'side.github_hot': '开源热榜',
    'side.point_rank': '积分排行',
    'side.full_rank': '完整榜单',
    'side.related': '精选内容',

    // 跳转按钮
    'article.author': '作者',
    'article.comment': '评论',
    'article.collect': '收藏',
    'article.share': '分享',
    'article.report': '举报',

    // 个人主页
    'self.points': '积分',
    'self.a_count': '关注',
    'self.f_count': '文章',
    'self.r_count': '评论',
    'self.achievements': '个人成就',
    'self.signup_rank': '注册排名',
    'self.info': '账号信息',
    'self.name': '名称',
    'self.motto': '签名',
    'self.index': '主页',
    'self.change_info': '修改信息',
    'self.safe': '账号安全',
    'self.ban_7': '封禁七天',
    'self.ban_ever': '永久封禁',
    'self.fans': '粉丝',
    'self.follow': '关注',
};

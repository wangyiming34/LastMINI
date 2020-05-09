import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://apis.zhongemaoyi.com/api',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}

// 正式请求api 0.测试用的
export const banner = (data) => {
    return http.request({
        url: '/Myself/club_login_out_reason',
        method: 'POST', 
        data,
		// handle:true
    })
}

// 1电话号归属地
export const phone = (data) => {
    return http.request({
        url: '/user/locales',
        data,
		// handle:true
    })
}
// 2短信接口
export const Sms = (data) => {
    return http.request({
        url: '/Sms/send',
        data,
		// handle:true
    })
}
// 3验证码登录接口
export const mobilelogin = (data) => {
    return http.request({
        url: '/user/mobilelogin_detion',
        data,
		// handle:true
    })
}
// 4验证码登录成功后,设置密码
export const SetPwd = (data) => {
    return http.request({
        url: '/user/set_pwd',
        data,
		// handle:true
    })
}
// 5微信授权登录
export const Wechataction = (data) => {
    return http.request({
        url: '/Wxapplet/login',
        data,
		// handle:true
    })
}
// 6用户账号密码登录/

export const UserLogin = (data) => {
    return http.request({
        url: '/user/login_detion',
        data,
		// handle:true
    })
}

// 7实名认真，填写身份证姓名和教育
export const UserAddUserInfo = (data) => {
    return http.request({
        url: '/user/add_users_info',
        data,
		// handle:true
    })
}
// 8忘记密码 然后设置密码 
export const ForgetPass = (data) => {
    return http.request({
        url: '/user/resetpwd_detion',
        data,
		// handle:true
    })
}
// 9 轮播图和热搜 
export const Swiper = (data) => {
    return http.request({
        url: '/Resource/index_up',
        data,
		// handle:true
    })
}
// 10 热门项目
export const HotProject = (data) => {
    return http.request({
        url: '/Resource/supplies_demands',
        data,
		// handle:true
    })
}

// 11 我的
export const MyselfIndex = (data) => {
    return http.request({
        url: '/Myself/index',
        data,
		// handle:true
    })
}
// 12 粉丝/关注/互关
export const MyFans = (data) => {
    return http.request({
        url: '/Myself/g_f_h',
        data,
		// handle:true
    })
}

// 13 审核俱乐部列表，有权限多个图标点进去没有别的操作，让他下载app
export const ReportCheckClubApplyList = (data) => {
    return http.request({
        url: '/Report/check_club_apply_list',
        data,
		// handle:true
    })
}
// 14 德申公告
export const DetionNotice = (data) => {
    return http.request({
        url: '/Myself/new_detion_notice',
        data,
		// handle:true
    })
}
// 15 俱乐部消息
export const ClubMsg = (data) => {
    return http.request({
        url: '/Myself/messagebox',
        data,
		// handle:true
    })
}
// 16 德申公告详情
export const DetionNoticeDetails = (data) => {
    return http.request({
        url: '/Myself/new_detion_notice_default',
        data,
		// handle:true
    })
}
//  17 设置-是否在主页显示手机号/是否在主页显示微信号/手机号/微信号 默认值
export const MyselfSetDefaultMobileWechat = (data) => {
    return http.request({
        url: '/Myself/set_default_mobile_wechat',
        data,
		// handle:true
    })
}
//  18 设置-是否在主页显示微信号开关
export const ShowWechat = (data) => {
    return http.request({
        url: '/Myself/set_show_wechat',
        data,
		// handle:true
    })
}
//  19 设置-是否在主页显示手机号开关
export const ShowPhone = (data) => {
    return http.request({
        url: '/Myself/set_show_mobile',
        data,
		// handle:true
    })
}

//  20 修改密码
export const ChangePassword = (data) => {
    return http.request({
        url: '/user/detion_resetpwd',
        data,
		// handle:true
    })
}

//  21 修改绑定手机
export const ChangePhone = (data) => {
    return http.request({
        url: '/user/detion_changemobile',
        data,
		// handle:true
    })
}
//  22 微信绑定的默认值
export const WechatDefault = (data) => {
    return http.request({
        url: '/Myself/set_wechat_default',
        data,
		// handle:true
    })
}

//  23 微信绑定
export const SetWechat = (data) => {
    return http.request({
        url: '/Myself/set_wechat',
        data,
		// handle:true
    })
}

//  24 反馈与建议 
export const FeedBack = (data) => {
    return http.request({
        url: '/Myself/set_suggest',
        data,
		// handle:true
    })
}

//  25 个人主页
export const MyHomePage = (data) => {
    return http.request({
        url: '/Myself/personal_homepage',
        data,
		// handle:true
    })
}

//  26 我的资讯圈 替补
export const MyselfUserDynamics = (data) => {
    return http.request({
        url: '/Myself/user_dynamic',
        data,
		// handle:true
    })
}

//  27  资讯-资讯圈-点赞
export const NewsUpvotes = (data) => {
    return http.request({
        url: '/News/upvotes',
        data,
		// handle:true
    })
}

//  28  资讯-资讯圈详情
export const NewsUserDynamicsDetail = (data) => {
    return http.request({
        url: '/News/user_dynamics_detail',
        data,
		// handle:true
    })
}
//  29  资讯详情-评论列表
export const NewsUserDynamicsComments = (data) => {
    return http.request({
        url: '/News/user_dynamics_comments',
        data,
		// handle:true
    })
}
//  30  资讯详情-点赞列表--现在是资讯圈
export const NewsUpvotesUserList = (data) => {
    return http.request({
        url: '/News/upvotes_user_list',
        data,
		// handle:true
    })
}
//  31  资讯详情-头像列表
export const NewsUpvotesAvatar = (data) => {
    return http.request({
        url: '/News/upvotes_avatar',
        data,
		// handle:true
    })
}
//  32  资讯详情-删除评论
export const NewsUserDynamicsCommentsDel = (data) => {
    return http.request({
        url: '/News/user_dynamics_comments_del',
        data,
		// handle:true
    })
}
//  33  资讯详情-发布评论
export const NewsUDComment = (data) => {
    return http.request({
        url: '/News/u_d_comment',
        data,
		// handle:true
    })
}

//  34  关注用户 NewsFollow
export const NewsFollow = (data) => {
    return http.request({
        url: '/News/follow',
        data,
		// handle:true
    })
}
//  35  小申展banner
export const SmallStretchBanner = (data) => {
    return http.request({
        url: '/Exhibitions/et_banner',
        data,
		// handle:true
    })
}
//  36  小申展商品分类
export const SmallStretchGoodsCategory = (data) => {
    return http.request({
        url: '/Exhibitions/category_list',
        data,
		// handle:true
    })
}
//  37  小申展首页(包含聚划算,友好物列表)
export const SmallStretchIndex = (data) => {
    return http.request({
        url: '/Exhibitions/et_index',
        data,
		// handle:true
    })
}
//  38  小申展详情
export const SmallStretchDetail = (data) => {
    return http.request({
        url: '/Exhibitions/et_detail',
        data,
		// handle:true
    })
}
//  39  小申展点赞/取消点赞
export const SmallStretchVote = (data) => {
    return http.request({
        url: '/Exhibitions/vote',
        data,
		// handle:true
    })
}
//  40  小申展发布
export const SmallStretchCreate = (data) => {
    return http.request({
        url: '/Exhibitions/create_et',
        data,
		// handle:true
    })
}
//  41  小申展我的关注
export const SmallStretchMyVote = (data) => {
    return http.request({
        url: '/Exhibitions/myself_vote',
        data,
		// handle:true
    })
}

//  42  小申展大家都在看
export const SmallStretchLook = (data) => {
    return http.request({
        url: '/Exhibitions/everybody_look',
        data,
		// handle:true
    })
}

//  43  小申展我的发布
export const SmallStretchMyCreate = (data) => {
    return http.request({
        url: '/Exhibitions/myself_create',
        data,
		// handle:true
    })
}

//  44 小申展上下架
export const SmallStretchIsSaleOut = (data) => {
    return http.request({
        url: '/Exhibitions/is_sale_out',
        data,
		// handle:true
    })
}

//  45 小申展编辑
export const SmallStretchUpdate = (data) => {
    return http.request({
        url: '/Exhibitions/update_et',
        data,
		// handle:true
    })
}
//  46 小申展-我的发布-删除
export const SmallStretchIndexDel = (data) => {
    return http.request({
        url: '/Exhibitions/myself_create_del',
        data,
		// handle:true
    })
}

//  47 路顶记-列表
export const NewsRoadShowsProject = (data) => {
    return http.request({
        url: '/Resource/ppt',
        data,
		// handle:true
    })
}

//  48 路顶记-详情
export const LuDetails = (data) => {
    return http.request({
        url: '/Resource/ppt_detail',
        data,
		// handle:true
    })
}

//  49 路顶记-投票
export const LuDingJiVote = (data) => {
    return http.request({
        url: '/Resource/vote',
        data,
		// handle:true
    })
}

//  50 支付
export const Payway = (data) => {
    return http.request({
        url: '/Payway/index',
        data,
		// handle:true
    })
}

//  51 填写推荐人
export const AddReferrer = (data) => {
    return http.request({
        url: '/Clubmanage/addreferrer',
        data,
		// handle:true
    })
}

//  52 获取会费金额接口
export const VipMoney = (data) => {
    return http.request({
        url: '/Payway/get_money',
        data,
		// handle:true
    })
}

//  53 选择充值礼品
export const ChooseGift = (data) => {
    return http.request({
        url: '/Payway/choose_gift',
        data,
		// handle:true
    })
}

//  54 选择地址最后一步跳回首页
export const add_address = (data) => {
    return http.request({
        url: '/Payway/add_address',
        data,
		// handle:true
    })
}

//  55 资讯-资讯圈(全球儿)-就是推荐
export const news_circle = (data) => {
    return http.request({
        url: '/News/news_circle',
        data,
		// handle:true
    })
}

//  55 资讯-资讯圈(关注列表)
export const news_attention = (data) => {
    return http.request({
        url: '/News/news_attention',
        data,
		// handle:true
    })
}

//  55 资讯-资讯圈(视频列表)
export const video_list = (data) => {
    return http.request({
        url: '/Newsfriend/video_list',
        data,
		// handle:true
    })
}

//  55 资讯-资讯圈删除
export const del_user_dynamic = (data) => {
    return http.request({
        url: '/Myself/del_user_dynamic',
        data,
		// handle:true
    })
}

//  56 资讯-资讯圈举报
export const report_dynamic = (data) => {
    return http.request({
        url: '/Newsfriend/report',
        data,
		// handle:true
    })
}

//  57 资讯-资讯圈举报内容
export const get_reports = (data) => {
    return http.request({
        url: '/Newsfriend/get_reports',
        data,
		// handle:true
    })
}

//  58 资讯-资讯圈转发统计
export const reports_transpond = (data) => {
    return http.request({
        url: '/News/transpond',
        data,
		// handle:true
    })
}

//  59 资讯-资讯圈评论列表
export const comment_list = (data) => {
    return http.request({
        url: '/Newsfriend/comment_list',
        data,
		// handle:true
    })
}

//  60 资讯-资讯圈添加评论带@ /News/create_user_dynamics
export const comment_add = (data) => {
    return http.request({
        url: '/Newsfriend/comment_add',
        data,
		// handle:true
    })
}

//  61 资讯-资讯圈发布 
export const create_user_dynamics = (data) => {
    return http.request({
        url: '/News/create_user_dynamics',
        data,
		// handle:true
    })
}

//  62 本地生活列表
export const local_life_list = (data) => {
    return http.request({
        url: '/Resource/local_life_list',
        data,
		// handle:true
    })
}
//  63 本地生活分类列表
export const local_life_category_list = (data) => {
    return http.request({
        url: '/Resource/local_life_category_list',
        data,
		// handle:true
    })
}

//  64 首页搜索(全部)
export const search = (data) => {
    return http.request({
        url: '/Resource/search',
        data,
		// handle:true
    })
}
//  65 搜索人脉
export const search_user_v2 = (data) => {
    return http.request({
        url: '/Resource/search_user_v2',
        data,
		// handle:true
    })
}

//  66 搜索资讯
export const search_news_v2 = (data) => {
    return http.request({
        url: '/Resource/search_news_v2',
        data,
		// handle:true
    })
}

//  67 搜索路顶记
export const search_ppt = (data) => {
    return http.request({
        url: '/Resource/search_ppt',
        data,
		// handle:true
    })
}

//  68 搜索小申展
export const et_index_search = (data) => {
    return http.request({
        url: '/Exhibitions/et_index_search',
        data,
		// handle:true
    })
}

//  69 搜索会友汇
export const op_index_search = (data) => {
    return http.request({
        url: '/Opportunity/op_index_search',
        data,
		// handle:true
    })
}

// 70 会友汇列表,代替了首页的热门项目
export const Opportunity_index = (data) => {
    return http.request({
        url: '/Opportunity/index',
        data,
		// handle:true
    })
}

// 71 个人主页-修改(默认值)123
export const update_user_info = (data) => {
    return http.request({
        url: '/Myself/update_user_info',
        data,
		// handle:true
    })
}

// 72 个人主页-修改保存按钮124
export const update_button = (data) => {
    return http.request({
        url: '/Myself/update_button',
        data,
		// handle:true
    })
}

// 72 创建俱乐部----地址(国家)20
export const locales_list = (data) => {
    return http.request({
        url: '/Club/locales_list',
        data,
		// handle:true
    })
}

// 73 会友汇详情(就是首页的机会)
export const Opportunity_detail = (data) => {
    return http.request({
        url: '/Opportunity/detail',
        data,
		// handle:true
    })
}

// 74 会友汇收藏
export const Opportunity_vote = (data) => {
    return http.request({
        url: '/Opportunity/vote',
        data,
		// handle:true
    })
}

// 75 会友汇发布历史
export const myself_Oppor = (data) => {
    return http.request({
        url: '/Opportunity/myself_Oppor',
        data,
		// handle:true
    })
}

// 76 会友汇收藏的列表
export const myself_vote = (data) => {
    return http.request({
        url: '/Opportunity/myself_vote',
        data,
		// handle:true
    })
}

// 77 会友汇历史删除
export const Opportunity_del_op = (data) => {
    return http.request({
        url: '/Opportunity/del_op',
        data,
		// handle:true
    })
}

// 78 会友汇所需资金
export const Opportunity_money = (data) => {
    return http.request({
        url: '/Opportunity/money',
        data,
		// handle:true
    })
}

// 79 会友汇标签
export const Opportunity_label = (data) => {
    return http.request({
        url: '/Opportunity/label',
        data,
		// handle:true
    })
}

// 79 会友汇发布
export const Opportunity_create_et = (data) => {
    return http.request({
        url: '/Opportunity/create_et',
        data,
		// handle:true
    })
}

// 80 会友汇重新编辑后发布
export const Opportunity_update_op = (data) => {
    return http.request({
        url: '/Opportunity/update_op',
        data,
		// handle:true
    })
}
// 81 身份认证获取国籍
export const User_country_list = (data) => {
    return http.request({
        url: '/User/country_list',
        data,
		// handle:true
    })
}

// 82 海外用户认证
export const register_applies = (data) => {
    return http.request({
        url: '/User/register_applies',
        data,
		// handle:true
    })
}

// 83 海外用户认证-判断状态
export const register_applies_status = (data) => {
    return http.request({
        url: '/User/register_applies_status',
        data,
		// handle:true
    })
}

// 84 海外用户认证-重新认证默认值
export const update_detail = (data) => {
    return http.request({
        url: '/User/update_detail',
        data,
		// handle:true
    })
}

// 85 海外用户认证-重新认证提交
export const register_update = (data) => {
    return http.request({
        url: '/User/register_update',
        data,
		// handle:true
    })
}

// 86 意向成交额列表
export const Turnover_index = (data) => {
    return http.request({
        url: '/Turnover/index',
        data,
		// handle:true
    })
}

// 87 上传意向成交额
export const Turnover_store = (data) => {
    return http.request({
        url: '/Turnover/store',
        data,
		// handle:true
    })
}

// 88 我的
export const Myself_index = (data) => {
    return http.request({
        url: '/Myself/index',
        data,
		// handle:true
    })
}

// 89 时间轴俱乐部列表
export const Club_club_list = (data) => {
    return http.request({
        url: '/Club/club_list',
        data,
		// handle:true
    })
}

// 90 交易额-上传历史
export const Turnover_user_detail = (data) => {
    return http.request({
        url: '/Turnover/user_detail',
        data,
		// handle:true
    })
}

// 90 交易额-城市详情
export const city_rank_clublist = (data) => {
    return http.request({
        url: '/Turnover/city_rank_clublist',
        data,
		// handle:true
    })
}

// 91 交易额-俱乐部详情列表
export const club_user_list = (data) => {
    return http.request({
        url: '/Turnover/club_user_list',
        data,
		// handle:true
    })
}

// 92 交易额-自由港
export const city_user_list = (data) => {
    return http.request({
        url: '/Turnover/city_user_list',
        data,
		// handle:true
    })
}

// 93 企业认证-判断状态
export const company_auth_status = (data) => {
    return http.request({
        url: '/Myself/company_auth_status',
        data,
		// handle:true
    })
}

// 94 企业认证-第一次提交
export const company_authentication = (data) => {
    return http.request({
        url: '/Myself/company_authentication_first_47',
        data,
		// handle:true
    })
}

// 95 企业认证-ocr
export const Myself_ocr = (data) => {
    return http.request({
        url: '/Myself/ocr',
        data,
		// handle:true
    })
}

// 96 我的-我的企业-状态
export const myself_company = (data) => {
    return http.request({
        url: '/Myself/myself_company',
        data,
		// handle:true
    })
}

// 97 企业走访-企业主页-企业信息
export const corporate_home_page = (data) => {
    return http.request({
        url: '/News/corporate_home_page',
        data,
		// handle:true
    })
}

// 98 企业走访-企业主页-企业商品
export const corporate_shop = (data) => {
    return http.request({
        url: '/News/corporate_shop',
        data,
		// handle:true
    })
}

// 99 企业走访-企业主页-企业产品服务
export const corporate_product_service = (data) => {
    return http.request({
        url: '/News/corporate_product_service',
        data,
		// handle:true
    })
}

// 100 企业认证-所属行业下拉列表
export const Myself_industry_list = (data) => {
    return http.request({
        url: '/Myself/industry_list',
        data,
		// handle:true
    })
}

// 101 v2.0俱乐部-我的俱乐部(上半部分)
export const Club_index_myself = (data) => {
    return http.request({
        url: '/Club/index_myself',
        data,
		// handle:true
    })
}

// 102 v2.0俱乐部-其他的俱乐部(下半部分)
export const Club_index_other = (data) => {
    return http.request({
        url: '/Club/index_other',
        data,
		// handle:true
    })
}

// 103 俱乐部主页(包含成员)
export const club_homepage = (data) => {
    return http.request({
        url: '/Club/club_homepage',
        data,
		// handle:true
    })
}

// 104 普通俱乐部会员列表
export const club_users = (data) => {
    return http.request({
        url: '/Club/club_users',
        data,
		// handle:true
    })
}

// 104 岗位职责
export const Club_duty_content = (data) => {
    return http.request({
        url: '/Club/Club_duty_content',
        data,
		// handle:true
    })
}

// 105 v2.0俱乐部主页(活动)
export const club_activity = (data) => {
    return http.request({
        url: '/Club/club_activity',
        data,
		// handle:true
    })
}

// 106 v2.0俱乐部主页(动态)
export const club_timer = (data) => {
    return http.request({
        url: '/Club/club_timer',
        data,
		// handle:true
    })
}

// 107 v2.0俱乐部主页(公告)
export const club_notice = (data) => {
    return http.request({
        url: '/Club/club_notice',
        data,
		// handle:true
    })
}

// 108 v2.0比如点哈尔滨都有哪些俱乐部列表
export const city_detail = (data) => {
    return http.request({
        url: '/Club/city_detail',
        data,
		// handle:true
    })
}

// 109 v2.0比如点哈尔滨自由港成员
export const freedom_harbor_list_v2 = (data) => {
    return http.request({
        url: '/Club/freedom_harbor_list_v2',
        data,
		// handle:true
    })
}

// 110 创建俱乐部--判断状态
export const create_city_status = (data) => {
    return http.request({
        url: '/Club/create_city_status',
        data,
		// handle:true
    })
}

// 111 创建俱乐部----俱乐部标签
export const create_club_get_duty = (data) => {
    return http.request({
        url: '/Club/create_club_get_duty',
        data,
		// handle:true
    })
}

// // 112 创建俱乐部----地址(国家)
// export const locales_list = (data) => {
//     return http.request({
//         url: '/Club/locales_list',
//         data,
// 		// handle:true
//     })
// }

// 113 创建俱乐部----省
export const areas_list = (data) => {
    return http.request({
        url: '/Club/areas_list',
        data,
		// handle:true
    })
}

// 114 创建俱乐部----市
export const city_list = (data) => {
    return http.request({
        url: '/Club/city_list',
        data,
		// handle:true
    })
}

// 115 新版创建俱乐部(增加会长信息)
export const create_city_v2 = (data) => {
    return http.request({
        url: '/Club/create_city_v2',
        data,
		// handle:true
    })
}

// 116 退出俱乐部列表
export const club_login_out_list = (data) => {
    return http.request({
        url: '/Myself/club_login_out_list',
        data,
		// handle:true
    })
}

// 117 退出原因列表
export const club_login_out_reason = (data) => {
    return http.request({
        url: '/Myself/club_login_out_reason',
        data,
		// handle:true
    })
}

// 118 提交退会
export const club_login_out_commit = (data) => {
    return http.request({
        url: '/Myself/club_login_out_commit',
        data,
		// handle:true
    })
}
// 119 退出详情
export const club_login_out_detail = (data) => {
    return http.request({
        url: '/Myself/club_login_out_detail',
        data,
		// handle:true
    })
}
// 120 留下
export const remove_club_stay = (data) => {
    return http.request({
        url: '/Myself/remove_club_stay',
        data,
		// handle:true
    })
}
// 121 退出
export const remove_club_out = (data) => {
    return http.request({
        url: '/Clubmanage/remove_club_out',
        data,
		// handle:true
    })
}

// 122 加入俱乐部判断状态
export const join_club_status = (data) => {
    return http.request({
        url: '/Club/join_club_status',
        data,
		// handle:true
    })
}

// 123 加入俱乐部列表
export const join_club_list = (data) => {
    return http.request({
        url: '/Club/join_club_list',
        data,
		// handle:true
    })
}

// 124 加入俱乐部列表城市选择
export const city_choose = (data) => {
    return http.request({
        url: '/Club/city_choose_47',
        data,
		// handle:true
    })
}

// 125 加入俱乐部
export const join_club_info_v2 = (data) => {
    return http.request({
        url: '/Club/join_club_info_v2',
        data,
		// handle:true
    })
}

// 126 默认不可删除频道
export const default_label = (data) => {
    return http.request({
        url: '/Opportunity/default_label',
        data,
		// handle:true
    })
}

// 124 我添加的频道
export const myself_label = (data) => {
    return http.request({
        url: '/Opportunity/myself_label',
        data,
		// handle:true
    })
}

// 125 项目机会-筛选列表
export const opportunity_list = (data) => {
    return http.request({
        url: '/Opportunity/opportunity_list',
        data,
		// handle:true
    })
}

// 126 项目机会-添加频道
export const add_label = (data) => {
    return http.request({
        url: '/Opportunity/add_label',
        data,
		// handle:true
    })
}

// 127 获取全部自定义标签
export const get_user_label = (data) => {
    return http.request({
        url: '/Opportunity/get_user_label',
        data,
		// handle:true
    })
}

// 128 添加自定义标签
export const add_user_label = (data) => {
    return http.request({
        url: '/Opportunity/add_user_label',
        data,
		// handle:true
    })
}

// 129 德申新闻列表
export const detion_news = (data) => {
    return http.request({
        url: '/News/detion_news',
        data,
		// handle:true
    })
}

// 130 德申新闻详情
export const detion_news_detail = (data) => {
    return http.request({
        url: '/News/detion_news_detail',
        data,
		// handle:true
    })
}

// 131 德申新闻详情-评论列表
export const detion_news_comments = (data) => {
    return http.request({
        url: '/News/detion_news_comments',
        data,
		// handle:true
    })
}

// 132 德申新闻详情-评论
export const d_n_comment = (data) => {
    return http.request({
        url: '/News/d_n_comment',
        data,
		// handle:true
    })
}

// 133 成长学院列表
export const grow_school = (data) => {
    return http.request({
        url: '/News/grow_school',
        data,
		// handle:true
    })
}

// 134 成长学院详情
export const grow_school_detail = (data) => {
    return http.request({
        url: '/News/grow_school_detail',
        data,
		// handle:true
    })
}

// 135 成长学院详情-评论列表
export const grow_school_comments = (data) => {
    return http.request({
        url: '/News/grow_school_comments',
        data,
		// handle:true
    })
}

// 136 成长学院评论
export const g_s_comment = (data) => {
    return http.request({
        url: '/News/g_s_comment',
        data,
		// handle:true
    })
}

// 137 友好物前三个
export const high_quality_three = (data) => {
    return http.request({
        url: '/Exhibitions/high_quality_three',
        data,
		// handle:true
    })
}

// 138 活动-平台活动列表
export const activity_public_list = (data) => {
    return http.request({
        url: '/News/activity_public_list',
        data,
		// handle:true
    })
}

// 139 活动-俱乐部活动列表
export const activity_private_list = (data) => {
    return http.request({
        url: '/News/activity_private_list',
        data,
		// handle:true
    })
}
// 140 活动-详情
export const activity_detail = (data) => {
    return http.request({
        url: '/News/activity_detail',
        data,
		// handle:true
    })
}
// 141 活动-评论
export const a_comment = (data) => {
    return http.request({
        url: '/News/a_comment',
        data,
		// handle:true
    })
}
// 142 活动-评论列表
export const a_comment_list = (data) => {
    return http.request({
        url: '/News/comment_list',
        data,
		// handle:true
    })
}
// 143 活动-报名
export const activity_apply = (data) => {
    return http.request({
        url: '/News/activity_apply',
        data,
		// handle:true
    })
}
// 144 活动-签到
export const activity_sign = (data) => {
    return http.request({
        url: '/News/activity_sign',
        data,
		// handle:true
    })
}

// 145 活动类型及默认值
export const topic_activity_apply_auth = (data) => {
    return http.request({
        url: '/News/topic_activity_apply_auth',
        data,
		// handle:true
    })
}
// 146 取消报名
export const cancel_activity_apply = (data) => {
    return http.request({
        url: '/News/cancel_activity_apply',
        data,
		// handle:true
    })
}

// 147 秘书处联系电话
export const tel = (data) => {
    return http.request({
        url: '/Club/tel',
        data,
		// handle:true
    })
}

// 148 企业认证完善信息省市区下拉
export const E_areas_list = (data) => {
    return http.request({
        url: '/Myself/areas_list',
        data,
		// handle:true
    })
}

// 149 企业认证第二页
export const company_authentication_second = (data) => {
    return http.request({
        url: '/Myself/company_authentication_second',
        data,
		// handle:true
    })
}

// 150 编辑企业信息-默认值
export const update_company_default = (data) => {
    return http.request({
        url: '/Myself/update_company_default',
        data,
		// handle:true
    })
}

// 151 编辑企业信息-提交
export const update_company = (data) => {
    return http.request({
        url: '/Myself/update_company',
        data,
		// handle:true
    })
}

// 152 我的-我的企业-企业产品/服务列表
export const company_services_products = (data) => {
    return http.request({
        url: '/Myself/company_services_products',
        data,
		// handle:true
    })
}

// 153 我的-我的企业-删除企业产品/服务
export const del_company_services_products = (data) => {
    return http.request({
        url: '/Myself/del_company_services_products',
        data,
		// handle:true
    })
}

// 154 资源-产品/服务详情
export const pro_ser_detail = (data) => {
    return http.request({
        url: '/Resource/pro_ser_detail',
        data,
		// handle:true
    })
}

// 155 我的-我的企业-编辑企业产品/服务默认值--编辑
export const update_company_services_products_default = (data) => {
    return http.request({
        url: '/Myself/update_company_services_products_default',
        data,
		// handle:true
    })
}

// 156 我的-我的企业-编辑企业产品/服务确定按钮 编辑后确定
export const update_company_services_products = (data) => {
    return http.request({
        url: '/Myself/update_company_services_products',
        data,
		// handle:true
    })
}

// 157 我的-我的企业-发布企业产品/服务  发布
export const create_company_services_products = (data) => {
    return http.request({
        url: '/Myself/create_company_services_products',
        data,
		// handle:true
    })
}
// 158 我的-粉丝列表
export const fans_list = (data) => {
    return http.request({
        url: '/Myself/fans_list',
        data,
		// handle:true
    })
}
// 159 我的-关注列表
export const follow_list = (data) => {
    return http.request({
        url: '/Myself/follow_list',
        data,
		// handle:true
    })
}
// 160 我的-互相关注列表
export const friend_list = (data) => {
    return http.request({
        url: '/Myself/friend_list',
        data,
		// handle:true
    })
}

// 161 德申商城获取账号密码
export const shop_mobile = (data) => {
    return http.request({
        url: '/User/shop_mobile',
        data,
		// handle:true
    })
}
// 162 我的活动-全部
export const my_activity = (data) => {
    return http.request({
        url: '/Myself/my_activity',
        data,
		// handle:true
    })
}
// 163 我的活动-进行中
export const my_activity_ing = (data) => {
    return http.request({
        url: '/Myself/my_activity_ing',
        data,
		// handle:true
    })
}
// 164 我的活动-已结束
export const my_activity_end = (data) => {
    return http.request({
        url: '/Myself/my_activity_end',
        data,
		// handle:true
    })
}
// 165 地区干事列表
export const area_manager = (data) => {
    return http.request({
        url: '/Myself/area_manager',
        data,
		// handle:true
    })
}
// 166 我的->缴费历史->会员缴费历史
export const pay_record = (data) => {
    return http.request({
        url: '/Myself/pay_record',
        data,
		// handle:true
    })
}
// 167 开具发票订单列表
export const invoice_order_list = (data) => {
    return http.request({
        url: '/Myself/invoice_order_list',
        data,
		// handle:true
    })
}
// 168 开具发票->提交(纸质)
export const apply_invoice = (data) => {
    return http.request({
        url: '/Myself/apply_invoice',
        data,
		// handle:true
    })
}
// 169 开具发票->提交(电子)(未完成......)
export const apply_invoice_electronic = (data) => {
    return http.request({
        url: '/Myself/apply_invoice_electronic',
        data,
		// handle:true
    })
}
// 170 开票历史列表
export const invoice_history_list = (data) => {
    return http.request({
        url: '/Myself/invoice_history_list',
        data,
		// handle:true
    })
}
// 171 发票详情
export const invoice_detail = (data) => {
    return http.request({
        url: '/Myself/invoice_detail',
        data,
		// handle:true
    })
}
// 172 常见问题
export const faq = (data) => {
    return http.request({
        url: '/Myself/faq',
        data,
		// handle:true
    })
}
// 173 常见问题详情
export const faq_detail = (data) => {
    return http.request({
        url: '/Myself/faq_detail',
        data,
		// handle:true
    })
}
// 174 新用户
export const new_users = (data) => {
    return http.request({
        url: '/Imapi/new_users',
        data,
		// handle:true
    })
}
// 175 我的推荐
export const my_recommend = (data) => {
    return http.request({
        url: '/Imapi/my_recommend',
        data,
		// handle:true
    })
}
// 176 积分排行
export const credit_top = (data) => {
    return http.request({
        url: '/Imapi/credit_top',
        data,
		// handle:true
    })
}

// 177 经费申请审批入口权限及消息数量
export const fund_auth = (data) => {
    return http.request({
        url: '/Clubmanage/fund_auth',
        data,
		// handle:true
    })
}
// 178 报表系统查看权限
export const report_auth = (data) => {
    return http.request({
        url: '/Reportv2/report_auth',
        data,
		// handle:true
    })
}
// 179 俱乐部申请审批入口权限及消息数量
export const check_club_apply_Auth = (data) => {
    return http.request({
        url: '/Report/check_club_apply_Auth',
        data,
		// handle:true
    })
}

// 180 俱乐部审核列表
export const check_club_apply_list = (data) => {
    return http.request({
        url: '/Report/check_club_apply_list',
        data,
		// handle:true
    })
}
// 181 俱乐部审核详情
export const check_club_apply_detail = (data) => {
    return http.request({
        url: '/Report/check_club_apply_detail_v2',
        data,
		// handle:true
    })
}
// 182 俱乐部审核驳回
export const reject = (data) => {
    return http.request({
        url: '/Report/reject',
        data,
		// handle:true
    })
}
// 183 俱乐部审核通过
export const agree = (data) => {
    return http.request({
        url: '/Report/agree',
        data,
		// handle:true
    })
}

// 184 会员统计
export const users_report = (data) => {
    return http.request({
        url: '/Reportv2/users_report',
        data,
		// handle:true
    })
}
// 185 v2.0活跃度统计
export const activity_statistics = (data) => {
    return http.request({
        url: '/Reportv2/activity_statistics',
        data,
		// handle:true
    })
}

// 186 v2.0企业统计
export const company_statistics = (data) => {
    return http.request({
        url: '/Reportv2/company_statistics',
        data,
		// handle:true
    })
}
// 187 v2.0俱乐部人数统计-各个城市多少人
export const detion_report = (data) => {
    return http.request({
        url: '/Reportv2/detion_report',
        data,
		// handle:true
    })
}
// 187 v2.0俱乐部人数统计详情-各个俱乐部有多少人
export const club_report = (data) => {
    return http.request({
        url: '/Reportv2/club_report',
        data,
		// handle:true
    })
}
// 187 报表系统-应续费用户统计(城市)v2
export const renew_v2 = (data) => {
    return http.request({
        url: '/Reportv2/renew_v2',
        data,
		// handle:true
    })
}
// 188 报表系统-应续费用户统计(俱乐部)v2
export const club_report_renew_v2 = (data) => {
    return http.request({
        url: '/Reportv2/club_report_renew_v2',
        data,
		// handle:true
    })
}
// 189 无俱乐部的城市中超期自由港VIP列表
export const other_renew = (data) => {
    return http.request({
        url: '/Reportv2/other_renew',
        data,
		// handle:true
    })
}
// 190 应续费用户统计自由港列表
export const club_freedom_renew = (data) => {
    return http.request({
        url: '/Reportv2/club_freedom_renew',
        data,
		// handle:true
    })
}
// 191 报表系统-应续费用户统计(人)v2
export const club_renew_users_v2 = (data) => {
    return http.request({
        url: '/Reportv2/club_renew_users_v2',
        data,
		// handle:true
    })
}
// 192 v2.0预留编号
export const reserved_vip_no = (data) => {
    return http.request({
        url: '/Reportv2/reserved_vip_no',
        data,
		// handle:true
    })
}
// 193 v2.0用户总数
export const month_reg = (data) => {
    return http.request({
        url: '/Reportv2/month_reg',
        data,
		// handle:true
    })
}
// 194 v2.0用户总数
export const user_report = (data) => {
    return http.request({
        url: '/Reportv2/user_report',
        data,
		// handle:true
    })
}
// 195 v2.0国内/全球会员列表
export const user_list = (data) => {
    return http.request({
        url: '/Reportv2/user_list',
        data,
		// handle:true
    })
}
// 196 v2.0自由港人员统计
export const freedom = (data) => {
    return http.request({
        url: '/Reportv2/freedom',
        data,
		// handle:true
    })
}
// 197 v2.0自由港人员统计
export const freedom_harbor_list = (data) => {
    return http.request({
        url: '/Reportv2/freedom_harbor_list',
        data,
		// handle:true
    })
}
// 198 历史数据查询
export const month_open_renew = (data) => {
    return http.request({
        url: '/Reportv2/month_open_renew',
        data,
		// handle:true
    })
}
// 199 历史数据查询详情/总缴费人数详情
export const month_open_renew_list = (data) => {
    return http.request({
        url: '/Reportv2/month_open_renew_list',
        data,
		// handle:true
    })
}
// 200 v2.0总续费人数
export const month_reg_count = (data) => {
    return http.request({
        url: '/Reportv2/month_reg_count',
        data,
		// handle:true
    })
}
// 201 今日/本周/本月缴费列表
export const opened_list = (data) => {
    return http.request({
        url: '/Reportv2/opened_list',
        data,
		// handle:true
    })
}
// 202 截止今天应续费
export const today_over_renewed_list = (data) => {
    return http.request({
        url: '/Reportv2/today_over_renewed_list',
        data,
		// handle:true
    })
}
// 203 截止今天已经续费
export const today_overed_renewed_list = (data) => {
    return http.request({
        url: '/Reportv2/today_overed_renewed_list',
        data,
		// handle:true
    })
}
// 204 今日/本周/本月续费列表
export const renewed_list = (data) => {
    return http.request({
        url: '/Reportv2/renewed_list',
        data,
		// handle:true
    })
}
// 205 v2.0平台建群总数
export const im_count = (data) => {
    return http.request({
        url: '/Reportv2/im_count',
        data,
		// handle:true
    })
}
// 206 v2.0城市俱乐部管理(发现)--经费申请权限有
export const city_index_v2 = (data) => {
    return http.request({
        url: '/Clubmanage/city_index_v2',
        data,
		// handle:true
    })
}

// 207 俱乐部主页应该续费人数
export const club_renew = (data) => {
    return http.request({
        url: '/Club/club_renew',
        data,
		// handle:true
    })
}
// 208 应续费俱乐部列表
export const c_report = (data) => {
    return http.request({
        url: '/Club/club_report',
        data,
		// handle:true
    })
}
// 209 获取会费金额接口v2
export const get_money_v2 = (data) => {
    return http.request({
        url: '/Payway/get_money_v2',
        data,
		// handle:true
    })
}
// 210 支付成功二维码
export const service_er_mobile = (data) => {
    return http.request({
        url: '/Payway/service_er_mobile',
        data,
		// handle:true
    })
}
// 211 添加地址
export const add_address_badge = (data) => {
    return http.request({
        url: '/Payway/add_address_badge',
        data,
		// handle:true
    })
}
// 212 判断领取徽章了没有
export const is_get_badge = (data) => {
    return http.request({
        url: '/Payway/is_get_badge',
        data,
		// handle:true
    })
}

// 213 获取用户头像和名称
export const get_user_info = (data) => {
    return http.request({
        url: '/Myself/get_user_info',
        data,
		// handle:true
    })
}
// 214 经费申请列表
export const fund_list = (data) => {
    return http.request({
        url: '/Clubmanage/fund_list',
        data,
		// handle:true
    })
}
// 215 经费审批详情
export const fund_detail = (data) => {
    return http.request({
        url: '/Clubmanage/fund_detail',
        data,
		// handle:true
    })
}
// 216 申请端-拒绝
export const Clubmanage_refuse = (data) => {
    return http.request({
        url: '/Clubmanage/refuse',
        data,
		// handle:true
    })
}
// 217 申请端-同意/重新同意
export const Clubmanage_agree = (data) => {
    return http.request({
        url: '/Clubmanage/agree',
        data,
		// handle:true
    })
}

// 218 申请端-取消审批
export const cancel_approval = (data) => {
    return http.request({
        url: '/Clubmanage/cancel_approval',
        data,
		// handle:true
    })
}
// 219 银行列表
export const bank_list = (data) => {
    return http.request({
        url: '/Clubmanage/bank_list',
        data,
		// handle:true
    })
}
// 220 申请经费
export const fund_create = (data) => {
    return http.request({
        url: '/Clubmanage/fund_create',
        data,
		// handle:true
    })
}
// 221 申请经费-执委团队名单
export const auth_club_user_info = (data) => {
    return http.request({
        url: '/Clubmanage/auth_club_user_info',
        data,
		// handle:true
    })
}
// 222 审核端-经费审批列表
export const manage_fund_list = (data) => {
    return http.request({
        url: '/Clubmanage/manage_fund_list',
        data,
		// handle:true
    })
}
// 223 审核端-经费审批详情
export const manage_fund_detail = (data) => {
    return http.request({
        url: '/Clubmanage/manage_fund_detail',
        data,
		// handle:true
    })
}
// 224 审核端-同意
export const manage_agree = (data) => {
    return http.request({
        url: '/Clubmanage/manage_agree',
        data,
		// handle:true
    })
}
// 225 审核端-重新同意
export const manage_agree_to = (data) => {
    return http.request({
        url: '/Clubmanage/manage_agree_to',
        data,
		// handle:true
    })
}
// 226 审核端-拒绝
export const manage_refuse = (data) => {
    return http.request({
        url: '/Clubmanage/manage_refuse',
        data,
		// handle:true
    })
}
// 227 首页图片接口
export const home_page_img_2 = (data) => {
    return http.request({
        url: '/Resource/home_page_img_2',
        data,
		// handle:true
    })
}
// 228 微信登录
export const third_detion = (data) => {
    return http.request({
        url: '/user/third_detion',
        data,
		// handle:true
    })
}
// 229 绑定手机
export const bind_mobile = (data) => {
    return http.request({
        url: '/user/bind_mobile',
        data,
		// handle:true
    })
}
// 230 服务商分类
export const service_cate_list = (data) => {
    return http.request({
        url: '/Service/cate_list',
        data,
		// handle:true
    })
}
// 231 -推荐服务商
export const sp_recommend = (data) => {
    return http.request({
        url: '/Service/sp_recommend',
        data,
		// handle:true
    })
}

// 232 -服务商列表
export const sp_provider = (data) => {
    return http.request({
        url: '/Service/sp_provider',
        data,
		// handle:true
    })
}
// 233 -服务列表
export const sp_service = (data) => {
    return http.request({
        url: '/Service/sp_service',
        data,
		// handle:true
    })
}
// 234 -我关注的企业
export const my_attention_company = (data) => {
    return http.request({
        url: '/Service/my_attention_company',
        data,
		// handle:true
    })
}
// 235 -服务商---我收藏的服务
export const my_collect_sp = (data) => {
    return http.request({
        url: '/Service/my_collect_sp',
        data,
		// handle:true
    })
}

// 236 服务商---企业详情
export const company_detail = (data) => {
    return http.request({
        url: '/Service/company_detail',
        data,
		// handle:true
    })
}
// 237 服务商---企业关注 取消关注
export const attention_company = (data) => {
    return http.request({
        url: '/Service/attention_company',
        data,
		// handle:true
    })
}
// 238 服务商---添加企业咨询量
export const company_add_count = (data) => {
    return http.request({
        url: '/Service/company_add_count',
        data,
		// handle:true
    })
}
// 239 服务商---服务详情
export const sp_detail = (data) => {
    return http.request({
        url: '/Service/sp_detail',
        data,
		// handle:true
    })
}
// 240 服务商---服务 收藏取消收藏
export const collect_sp = (data) => {
    return http.request({
        url: '/Service/collect_sp',
        data,
		// handle:true
    })
}
// 241 服务商---添加服务咨询量
export const sp_add_count = (data) => {
    return http.request({
        url: '/Service/sp_add_count',
        data,
		// handle:true
    })
}
// 242 服务商---我的服务
export const my_sp = (data) => {
    return http.request({
        url: '/Service/my_sp',
        data,
		// handle:true
    })
}
// 243 服务商---分类下拉(二级)
export const cate_select = (data) => {
    return http.request({
        url: '/Service/cate_select',
        data,
		// handle:true
    })
}

// 244 服务商---上传编辑服务
export const sp_post = (data) => {
    return http.request({
        url: '/Service/sp_post',
        data,
		// handle:true
    })
}

// 245 删除
export const sp_del = (data) => {
    return http.request({
        url: '/Service/sp_del',
        data,
		// handle:true
    })
}
// 246 服务商---判断企业状态
export const company_status = (data) => {
    return http.request({
        url: '/Service/company_auth_status',
        data,
		// handle:true
    })
}
// 247 获取推荐人
export const referrer = (data) => {
    return http.request({
        url: '/Myself/referrer',
        data,
		// handle:true
    })
}
// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	referrer,
	company_status,
	sp_del,
	sp_post,
	cate_select,
	my_sp,
	sp_add_count,
	collect_sp,
	sp_detail,
	company_add_count,
	attention_company,
	company_detail,
	my_collect_sp,
	my_attention_company,
	sp_service,
	sp_provider,
	sp_recommend,
	service_cate_list,
	reports_transpond,
	bind_mobile,
	third_detion,
	home_page_img_2,
	manage_refuse,
	manage_agree_to,
	manage_agree,
	manage_fund_detail,
	manage_fund_list,
	auth_club_user_info,
	fund_create,
	bank_list,
	cancel_approval,
	Clubmanage_agree,
	Clubmanage_refuse,
	fund_detail,
	fund_list,
	get_user_info,
	is_get_badge,
	add_address_badge,
	service_er_mobile,
	get_money_v2,
	c_report,
	club_renew,
	city_index_v2,
	im_count,
	renewed_list,
	today_overed_renewed_list,
	today_over_renewed_list,
	opened_list,
	month_reg_count,
	month_open_renew_list,
	month_open_renew,
	freedom_harbor_list,
	freedom,
	user_list,
	user_report,
	month_reg,
	reserved_vip_no,
	club_renew_users_v2,
	club_freedom_renew,
	other_renew,
	club_report_renew_v2,
	renew_v2,
	club_report,
	detion_report,
	company_statistics,
	activity_statistics,
	users_report,
	agree,
	reject,
	check_club_apply_detail,
	check_club_apply_list,
	check_club_apply_Auth,
	report_auth,
	fund_auth,
	credit_top,
	my_recommend,
	new_users,
	faq_detail,
	faq,
	invoice_detail,
	invoice_history_list,
	apply_invoice_electronic,
	apply_invoice,
	invoice_order_list,
	pay_record,
	area_manager,
	my_activity_end,
	my_activity_ing,
	my_activity,
	shop_mobile,
	friend_list,
	follow_list,
	fans_list,
	create_company_services_products,
	update_company_services_products,
	update_company_services_products_default,
	pro_ser_detail,
	del_company_services_products,
	company_services_products,
	update_company,
	update_company_default,
	company_authentication_second,
	E_areas_list,
	tel,
	cancel_activity_apply,
	topic_activity_apply_auth,
	activity_sign,
	activity_apply,
	a_comment_list,
	a_comment,
	activity_detail,
	activity_private_list,
	activity_public_list,
	high_quality_three,
	g_s_comment,
	grow_school_comments,
	grow_school_detail,
	grow_school,
	d_n_comment,
	detion_news_comments,
	detion_news_detail,
	detion_news,
	add_user_label,
	get_user_label,
	add_label,
	opportunity_list,
	myself_label,
	default_label,
	join_club_info_v2,
	city_choose,
	join_club_list,
	join_club_status,
	remove_club_out,
	remove_club_stay,
	club_login_out_detail,
	club_login_out_commit,
	club_login_out_reason,
	club_login_out_list,
	create_city_v2,
	city_list,
	areas_list,
	// locales_list,
	create_club_get_duty,
	create_city_status,
	freedom_harbor_list_v2,
	city_detail,
	club_notice,
	club_timer,
	club_activity,
	Club_duty_content,
	club_users,
	club_homepage,
	Club_index_other,
	Club_index_myself,
	Myself_industry_list,
	corporate_product_service,
	corporate_shop,
	corporate_home_page,
	myself_company,
	Myself_ocr,
	company_authentication,
	company_auth_status,
	city_user_list,
	club_user_list,
	city_rank_clublist,
	Turnover_user_detail,
	Club_club_list,
	Myself_index,
	Turnover_store,
	Turnover_index,
	register_update,
	update_detail,
	register_applies_status,
	register_applies,
	User_country_list,
	Opportunity_update_op,
	Opportunity_create_et,
	Opportunity_label,
	Opportunity_money,
	Opportunity_del_op,
	myself_vote,
	myself_Oppor,
	Opportunity_vote,
	Opportunity_detail,
	locales_list,
	update_button,
	update_user_info,
	Opportunity_index,
	op_index_search,
	et_index_search,
	search_ppt,
	search_news_v2,
	search_user_v2,
	search,
	local_life_category_list,
	local_life_list,
	create_user_dynamics,
	comment_add,
	comment_list,
	get_reports,
	report_dynamic,
	del_user_dynamic,
	video_list,
	news_attention,
	news_circle,
	add_address,
	ChooseGift,
	VipMoney,
	AddReferrer,
	Payway,
	LuDingJiVote,
	LuDetails,
	NewsRoadShowsProject,
	SmallStretchIndexDel,
	SmallStretchUpdate,
	SmallStretchIsSaleOut,
	SmallStretchMyCreate,
	SmallStretchLook,
	SmallStretchMyVote,
	SmallStretchCreate,
	SmallStretchVote,
	SmallStretchDetail,
	SmallStretchIndex,
	SmallStretchGoodsCategory,
	SmallStretchBanner,
	NewsFollow,
	NewsUDComment,
	NewsUserDynamicsCommentsDel,
	NewsUpvotesAvatar,
	NewsUpvotesUserList,
	NewsUserDynamicsComments,
	NewsUserDynamicsDetail,
	NewsUpvotes,
	MyselfUserDynamics,
	MyHomePage,
	FeedBack,
	WechatDefault,
	SetWechat,
	ChangePhone,
	ChangePassword,
	ShowWechat,
	ShowPhone,
	MyselfSetDefaultMobileWechat,
	DetionNoticeDetails,
	ClubMsg,
	DetionNotice,
	test,
    banner,
	phone,
	Sms,
	mobilelogin,
	SetPwd,
	Wechataction,
	UserLogin,
	UserAddUserInfo,
	ForgetPass,
	Swiper,
	HotProject,
	MyselfIndex,
	MyFans,
	ReportCheckClubApplyList
}
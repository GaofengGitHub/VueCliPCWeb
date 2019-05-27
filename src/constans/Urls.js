	/*主机地址*/

	//	export const HOST_CONFIG =  'http://192.168.241.17:8080/zhssd/';//丁辉
	//  export const HOST_CONFIG = "http://192.168.241.42:8088/zhssd/"; //陆佳欣
	//	export const HOST_CONFIG = 'http://192.168.241.12:8080/zhssd/'; //李树春
//	  export const HOST_CONFIG =  "http://192.168.31.188:8080/zhssd/"; //俞俊杰
//		export const HOST_CONFIG = "http://192.168.241.53:8080/zhssd/"; //李志伟
		// export const HOST_CONFIG = 'http://192.168.241.48:8565/zhssd/'; //内网测试
//		export const HOST_CONFIG = 'http://101.132.222.139:8080/zhssd/'; //外网测试 
		// export const HOST_CONFIG = 'http://192.168.241.40:8093/njqc/';//黄梦舒
		// export const HOST_CONFIG = 'http://192.168.241.37:8080/';//桂程
		export const HOST_CONFIG = 'http://47.102.23.142:8380/zhssd/'; //阿里服务器负载均衡后
//		export const HOST_CONFIG = 'http://47.100.233.72:8080/zhssd/'; //阿里服务器

	/*图片服务器*/
//		export const IMAGE_SERVER = 'http://192.168.241.48:8069/fileServer/api/'; //测试图片服务
	export const IMAGE_SERVER = 'http://101.132.222.139:8086/fileServer/api/'; //外网测试

	/*图片操作*/
	export const IMAGE_GET_CONFIG = IMAGE_SERVER + 'getFile/'; //获取图片
	export const IMAGE_UPLOAD_CONFIG = IMAGE_SERVER + 'uploadImage/'; //上传图片
	export const IMAGE_GET_THUMB = IMAGE_SERVER + 'getThumb/';

	//自动更新地址
	export const APP_UPDATE_SERVER = 'http://cneecf.com/qgzb-qr/update_njqc.json';

	/*接口地址*/
	export const API_CONFIG = {
		//登录
		login: HOST_CONFIG + 'mobile/login/userLogin',
		//天气
		getWeather: HOST_CONFIG + 'mobile/weather/getWeather',
		//活动列表
		getActivityList: HOST_CONFIG + 'mobile/activity/getActivity',
		//培训列表
		getTrainList: HOST_CONFIG + 'mobile/activity/getTrain',
		//活动详情
		getActivityDetail: HOST_CONFIG + '/mobile/activity/getActivityDetails',
		//发送短信验证码
		sendCheckMsg: HOST_CONFIG + 'mobile/login/sendCheckMsg',
		//主页面推荐列表
		getListRecommend: HOST_CONFIG + 'mobile/info/listRecommend',
		//主页面新闻列表
		getNewsList: HOST_CONFIG + 'mobile/info/listNews',
		//主页面文章列表
		getArticleList: HOST_CONFIG + 'mobile/info/listArticle',
		//文章和新闻获详情
		getNewsDetail: HOST_CONFIG + 'mobile/info/getId',
		//查看文章和新闻的评论
		getNewsComment: HOST_CONFIG + 'mobile/info/listComment',
		//注册提交
		userRegister: HOST_CONFIG + 'mobile/login/userRegister',
		//获取区域
		getAreaList: HOST_CONFIG + 'mobile/login/getAreaList',
		//获取学校or班级数据
		getLinkage: HOST_CONFIG + 'mobile/login/getLinkage',
		//修改密码
		updatePassword: HOST_CONFIG + 'mobile/login/updatePassword',
		//清空手势密码
		closeGpassword: HOST_CONFIG + 'mobile/login/closeGpassword',
		//注册提交确认信息
		saveStudent: HOST_CONFIG + 'mobile/login/saveStudent',
		//公告
		getAnnoucementList: HOST_CONFIG + 'mobile/info/listAnnouncement',
		//对咨询添加评论
		addComment: HOST_CONFIG + 'mobile/info/addComment',
		//收藏新闻和活动
		collectActivity: HOST_CONFIG + 'mobile/activity/collectActivity',
		//取消收藏
		cancelCollect: HOST_CONFIG + 'mobile/activity/cancelCollect',
		//我的中队列表
		squadronIdxList: HOST_CONFIG + 'squadron/listData',
		//提交签到
		signIn: HOST_CONFIG + 'mobile/mine/signIn',
		//获取签到信息
		getSignInInfo: HOST_CONFIG + 'mobile/mine/getSignInInfo',
		//忘记密码
		forgotPwd: HOST_CONFIG + 'mobile/login/rememberPassword',
		//新增圈子
		addSquadron: HOST_CONFIG + 'mobile/squadron/save',
		//收藏列表
		collectList: HOST_CONFIG + 'mobile/mine/getMyCollect',
		//新闻点赞
		addNewsPraise: HOST_CONFIG + 'mobile/info/newsPraise',
		//活动报名
		activitySignIn: HOST_CONFIG + 'mobile/activity/activityApplyOption',
		//中队圈列表
		circleList: HOST_CONFIG + 'mobile/squadron/listData',
		//删除圈子
		delCircleItem: HOST_CONFIG + 'mobile/squadron/delete',
		//圈子点赞
		praiseCircleItem: HOST_CONFIG + 'mobile/squadron/admireInsert',
		//取消圈子点赞
		cancelPraise: HOST_CONFIG + 'mobile/squadron/admireDelete',
		//我的反馈列表
		getFeedbackList: HOST_CONFIG + 'mobile/feedback/feedbackList',
		//添加反馈
		addFeedback: HOST_CONFIG + 'mobile/feedback/addFeedback',
		//评论列表
		listData: HOST_CONFIG + 'mobile/newsComment/listData',
		//我的活动
		myActivity: HOST_CONFIG + 'mobile/activity/myActivity',
		//我的活动作品页面
		myActivityDetail: HOST_CONFIG + 'mobile/activity/myActivityDetail',
		//获取作品详情
		myWork: HOST_CONFIG + 'mobile/homework/getByActId',
		//提交作业
		uploadWork: HOST_CONFIG + 'mobile/homework/upload',
		//积分详情
		getMyPoints: HOST_CONFIG + 'mobile/mine/getMyPoints',
		//token旧换新
		tokenExchange: HOST_CONFIG + 'mobile/login/changToken',
		//景点介绍
		listScenic: HOST_CONFIG + 'mobile/tourist/listScenic',
		//获取区域列表
		getAreaSenseList: HOST_CONFIG + 'mobile/tourist/list',
		//景点详情
		listScenicDetail: HOST_CONFIG + 'mobile/tourist/listScenicDetail',
		//旅游路线列表
		listRoute: HOST_CONFIG + 'mobile/tourist/listRoute',
		//旅游路线详情
		listRouteDetail: HOST_CONFIG + 'mobile/tourist/listRouteDetail',
		//最新活动接口
		getNewActivityList: HOST_CONFIG + 'mobile/activity/getNewActivity',
		//宁聚青春注册接口
		userRegisterNjqc: HOST_CONFIG + 'mobile/login/userRegisterNjqc',
		//获取用户信息
		getUserInfo: HOST_CONFIG + 'mobile/userDetail/getByUserId',
		//提交修改用户信息
		saveUserInfo: HOST_CONFIG + 'mobile/userDetail/save',
		//修改用户头像
		changeImage: HOST_CONFIG + 'mobile/userDetail/changeImage',
		//MD5加密
		MD5String: HOST_CONFIG + 'mobile/tourist/MD5String',
		//获取岗位列表
		getJobList: HOST_CONFIG + 'mobile/position/getPositionList',
		//获取学校列表
		getSchoolList: HOST_CONFIG + 'mobile/position/getPositionList',
		//获取我的简历信息
		getMyResume: HOST_CONFIG + 'mobile/resume/getResume/mine',
		//获取行业列表
		getIndustryList: HOST_CONFIG + 'mobile/position/getPositionTagList',
		//获取地区列表
		getAreaListNew: HOST_CONFIG + 'mobile/position/getCompanyAreaList',
		//获取投递记录列表
		getSendList: HOST_CONFIG + 'mobile/position/getDeliverPositionList',
		//获取投递记录列表(PC)
		getPcSendList: HOST_CONFIG + 'mobile/position/getDeliverPositionPCList',
		//获取投递详情
		getPositionDeliverDetail: HOST_CONFIG + 'mobile/position/getPositionDeliverDetail',
		//获取收藏列表
		getCollectList: HOST_CONFIG + 'mobile/position/getCollectionPositionList',
		//获取收藏列表（PC）
		getCollectListPc: HOST_CONFIG + 'mobile/position/getCollectionPositionPCList',
		//获取岗位详情
		getJobDetail: HOST_CONFIG + 'mobile/position/getPositionDetail',
		//投递简历
		sendResume: HOST_CONFIG + 'mobile/resumeDeliver/deliver',
		//收藏岗位
		collectJob: HOST_CONFIG + 'mobile/position/collectPosition',
		//取消收藏岗位
		cancelCollectJob: HOST_CONFIG + 'mobile/position/cancellCollection',
		//添加简历基本信息
		addResumeUserInfo: HOST_CONFIG + 'mobile/resumeUserInfo/insert',
		//添加简历基本信息
		updateResumeUserInfo: HOST_CONFIG + 'mobile/resumeUserInfo/update',
		//获取学校列表
		getSchoolListNew: HOST_CONFIG + 'mobile/school/findAll',
		//添加一条语言
		addOneLanguage: HOST_CONFIG + 'mobile/resumeLanguage/insert',
		//更新一条语言
		updateOneLanguage: HOST_CONFIG + 'mobile/resumeLanguage/update',
		//添加一条专业技能
		addOneSkill: HOST_CONFIG + 'mobile/resumeUserSkill/insert',
		//更新一条专业技能
		updateOneSkill: HOST_CONFIG + 'mobile/resumeUserSkill/update',
		//添加一条证书
		addOneCertificate: HOST_CONFIG + 'mobile/resumeCertificate/insert',
		//更新一条证书
		updateOneCertificate: HOST_CONFIG + 'mobile/resumeCertificate/update',
		//添加简历所有信息
		addResumeAllInfo: HOST_CONFIG + 'mobile/resume/insertAll',
		//更新简历所有信息
		updateResumeAllInfo: HOST_CONFIG + 'mobile/resume/updateAll',
		//添加一条实践经历
		addOneShijian: HOST_CONFIG + 'mobile/resumeCertificate/insert',
		//已读操作
		isRead: HOST_CONFIG + 'mobile/resumeDeliver/isRead',
		//获取岗位列表
		getJobListPage: HOST_CONFIG + 'mobile/position/getPositionPageList',
	};


<script>
	export default {
		globalData: {  
			// 测试git
			// 电话号码前缀
			num:uni.getStorageSync('phoneCode') || 86,
			city:uni.getStorageSync('city') || '哈尔滨',
			// 会友汇三个标签
			pList:[],
			mList:[],
			eList:[],
			// 阿里上传图片地址
			
			// 分享图片
			shareImg:'https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.8oUQVJs9b8yZd65c7d4ff5c30b1e19579423aec6626c.png',
			token:'5d888fc9-1fc6-4a29-86aa-2c22e0cb4070',
			userId:8056
		},
		

	}
</script>

<style>
	/*每个页面公共css */
	@import url("./public/public.css");
	@import url("./pagesTwo/base/base.css");
	@import "/wxcomponents/vant/dist/common/index.wxss";
	.wrap{
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
/* 		background-color: #4CD964; */
		/* position: absolute; */
		background:rgba(250,250,250,1);
		
	}
	.wrap1{
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
/* 		background-color: #4CD964; */
		/* position: absolute; */
		position: relative;
		/* background:#F1F1F1; */
		background-color: #fafafa;
	}
	
</style>

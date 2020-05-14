<template>
	<view class="wrap1" style="padding-top: 108upx;" v-if="finish">
		<!-- 全屏透明遮罩 -->
		<view class="zhezhao" v-show="showActive" @click.stop="showActive = !showActive">
			
		</view>
		<!-- 上面的选项卡和搜索 -->
		<cover-view class="border-bottom-new2 information-tab-name1 flex justify-around align-center" v-if="statusShow==2">
				<cover-view v-for="(item,index) in tablist" :key="index" class="information-tablist" :class="{tabAct:index===tabCurrent}" @click="tabCheck(index)">
					{{item}}
				</cover-view>
			
		</cover-view>
		<cover-view class="border-bottom-new2 information-tab-name1 flex justify-around align-center" v-if="statusShow==1">
				德申资讯圈
		</cover-view>
		
		<!-- ================================下面第3个，视频============================== -->
		<view class="" v-if="tabCurrent===2">
			<view class="information" v-for="(item,index) in listv" :key="index">
				<!-- 显示是视频的 -->
				<view style="padding: 30upx 3% 0;width: 100%;" v-if="item.image">
		
					<!-- 头像名字 -->
					<view class="flex justify-center align-center top"  style="padding: 0 3% 0 0;">
						<view class="re" @click.stop="MyInfo(item.user_id)">
							<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
						</view>
						
						
						<view style="flex: 1;" class="flex flex-d justify-around" @click.stop="MyInfo(item.user_id)">
								<view class="nick flex align-center">
									<view class="nickname">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view>
								
								<view class="company" v-show="item.company!==null">
									<text v-if="item.job">{{item.job}}</text><text v-if="item.job" style="margin: 0 3px;">I</text><text>{{item.company}}</text>
								</view>
						</view>
						
						<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg(item,index)">
							<van-icon name="arrow-down" />
							<van-transition :show="n===index" custom-class="block" >
							  <view class="jubaobtn">
							  	<view class="" v-if="item.is_creator === 1" @click.stop="del_zixun(item,index)">
							  		删除
							  	</view>
							  	<view class="" v-if="item.is_creator === 0">
									<!-- item.is_report -->
							  		<text v-show="item.is_report===0" @click.stop="jubao_zixun(item,index)">举报</text>
									<text v-show="item.is_report===1">已举报</text>
							  	</view>
							  </view>
							</van-transition>
						</view>			
									
					</view>
					<!-- 描述 -->
					<view  class="oldContent"  @click="detail(item.id)" :class="{newContent:item.btn}">
						{{item.content}}
					</view>
					<!-- 全文那个 showTotalBtn-->
					<view class="" v-if="item.content.length>63">
						<view class="quanwen" v-if="item.btn" @click.stop="all(item)">
							全文
						</view>
						<view class="quanwen" v-else @click.stop="pack(item)">
							收起
						</view>
					</view>
					<!-- 视频 -->
					<view class="cover" :class="item.size.height>item.size.width?'long':'short'" v-if="indexCurrent == 'v'+index">
					    <video :id="'v'+index" :src="item.image[0]" v-if="indexCurrent == 'v'+index"  custom-cache="false" objectFit="cover" style="width: 100%;height: 100%;" autoplay="true"  @fullscreenchange="full"></video>
					</view>
					<view class="cover" v-else @click.stop="videoPlay('v'+index)" :class="item.size.height>item.size.width?'long':'short'">
						<van-icon name="play-circle-o"/>
						<image :src="item.cover_url" mode="scaleToFill"></image>
						<!-- <image :src="item.cover_url.indexOf('?Expires')==-1?item.cover_url:item.cover_url.split('?Expires')[0]" mode="scaleToFill"></image> -->
					</view>
					<!-- 时间 -->
					<view class="flex justify-between time border-bottom-new2" @click.stop="detail(item.id)" style="padding: 0 0 8px 0%">
						<view class="">
							{{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}}
						</view>
					</view>
					<!-- 点赞转发 -->
					<view class="flex justify-between align-center" style="padding: 5px 0px;">
						<!-- <view class="transpond"> -->
							<button  class="flex align-center diybtn transpond" open-type="share" style="background-color: white;"
							:data-id="item.id" :data-img="item.cover_url" :data-title="item.content">
								<van-icon name="share" size="16px"  style="margin-right:10upx" />
								<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
									{{item.transpond}}
								</view>
							</button>
						<!-- </view> -->
						
						<view class="flex align-center transpond" @click.stop="detail(item.id)">
							<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.comments}}
							</view>
						</view>
						
						
						<view class="flex align-center transpond" @click.stop="praise(item)">
							<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.upvotes}}
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
			<!-- 没有内容 -->
			<view class="LuDingJi-no" v-if="listv.length===0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
				<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true"  mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无内容
				</view>
			</view>

			<view  class="noMore1" v-if="allowv&&listv.length>0">
					暂无更多内容
			</view>
			<!-- 上拉加载 -->
			<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingv">
				   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		
		<!-- =============================下面第2个，关注=========================== -->
		<view class="" v-if="tabCurrent===1">
			<view class="information" v-for="(item,index) in listguan" :key="index" >
				
				<!-- 显示不是视频的 -->
				<view style="padding-top: 30upx;width: 100%;" v-if="item.kind=== 0" >
					<!-- 头像名字 -->
					<view class="flex justify-center align-center top"  style="padding: 0 3%;">
						<view class="re" @click.stop="MyInfo(item.user_id)">
							<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
						</view>
						
						
						<view style="flex: 1;" class="flex flex-d justify-around" @click.stop="MyInfo(item.user_id)">
								<view class="nick flex align-center">
									<view class="nickname">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view>
								
								<view class="company" v-show="item.company!==null">
									<text v-if="item.job">{{item.job}}</text><text v-if="item.job" style="margin: 0 3px;">I</text><text>{{item.company}}</text>
								</view>
						</view>
						
						<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg(item,index)">
							<van-icon name="arrow-down" />
							<van-transition :show="n===index" custom-class="block" >
							  <view class="jubaobtn">
							  	<view class="" v-if="item.is_creator === 1" @click.stop="del_zixun(item,index)">
							  		删除
							  	</view>
							  	<view class="" v-if="item.is_creator === 0">
									<!-- item.is_report -->
							  		<text v-show="item.is_report===0" @click.stop="jubao_zixun(item,index)">举报</text>
									<text v-show="item.is_report===1">已举报</text>
							  	</view>
							  </view>
							</van-transition>
						</view>			
									
					</view>
					<!-- 描述 -->
					<view  class="oldContent" style="padding: 0 3%;" @click="detail(item.id)" :class="{newContent:item.btn}">
						{{item.content}}
					</view>
					<!-- 全文那个 showTotalBtn-->
					<view class="" v-if="item.content.length>63">
						<view class="quanwen" v-if="item.btn" @click.stop="all(item)">
							全文
						</view>
						<view class="quanwen" v-else @click.stop="pack(item)">
							收起
						</view>
					</view>
					<!-- 图片 -->
					<view class="flex flex-wrap  zhuijia " style="padding-top: 20upx;" v-if="item.image.length>1">
						<image :src="img" mode="aspectFill" lazy-load="true" v-for="(img,index1) in item.image"  :key="index1" style="
						width: 226upx;height: 226upx;
						margin-bottom: 14upx;
						margin-left: 18upx;
						display: block;
						" @click.prevent.stop="preview(index1,item.image)"></image>
					</view>
					<view class="flex flex-wrap  zhuijia imgone" style="padding: 20upx 30upx 0;" v-if="item.image.length==1">
						<image :src="img" mode="widthFix" lazy-load="true" v-for="(img,index1) in item.image"  :key="index1" style="
						margin-bottom: 14upx;
						display: block;
						" @click.prevent.stop="preview(index1,item.image)"></image>
					</view>
					<!-- 时间 -->
					<view class="flex justify-between time border-bottom-new2" @click.stop="detail(item.id)" :class="{newtime:item.image.length==0}">
						<view class="">
							{{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}}
						</view>
					</view>
					<!-- 点赞转发 -->
					<view class="flex justify-between align-center" style="padding: 5px 0px;">
						<!-- <view class="transpond"> -->
							<button  class="flex align-center diybtn transpond" open-type="share" style="background-color: white;" 
							:data-id="item.id" :data-img="item.image[0]" :data-title="item.content">
								<van-icon name="share" size="16px"  style="margin-right:10upx" />
								
								<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
									{{item.transpond}}
								</view>
							</button>
						<!-- </view> -->
						
						<view class="flex align-center transpond" @click.stop="detail(item.id)">
							<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.comments}}
							</view>
						</view>
						
						
						<view class="flex align-center transpond" @click.stop="praise(item)">
							<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.upvotes}}
							</view>
						</view>
						
					</view>
				</view>
				
				<!-- 显示是视频的 -->
				<view style="padding: 30upx 3% 0;width: 100%;"  v-if="item.kind=== 1 && item.image">
		
					<!-- 头像名字 -->
					<view class="flex justify-center align-center top"  style="padding: 0 3% 0 0;">
						<view class="re" @click.stop="MyInfo(item.user_id)">
							<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
						</view>
						
						
						<view style="flex: 1;" class="flex flex-d justify-around" @click.stop="MyInfo(item.user_id)">
								<view class="nick flex align-center">
									<view class="nickname">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view>
								
								<view class="company" v-show="item.company!==null">
									<text v-if="item.job">{{item.job}}</text><text v-if="item.job" style="margin: 0 3px;">I</text><text>{{item.company}}</text>
								</view>
						</view>
						
						<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg(item,index)">
							<van-icon name="arrow-down" />
							<van-transition :show="n===index" custom-class="block" >
							  <view class="jubaobtn">
							  	<view class="" v-if="item.is_creator === 1" @click.stop="del_zixun(item,index)">
							  		删除
							  	</view>
							  	<view class="" v-if="item.is_creator === 0">
									<!-- item.is_report -->
							  		<text v-show="item.is_report===0" @click.stop="jubao_zixun(item,index)">举报</text>
									<text v-show="item.is_report===1">已举报</text>
							  	</view>
							  </view>
							</van-transition>
						</view>			
									
					</view>
					<!-- 描述 -->
					<view  class="oldContent"  @click="detail(item.id)" :class="{newContent:item.btn}">
						{{item.content}}
					</view>
					<!-- 全文那个 showTotalBtn-->
					<view class="" v-if="item.content.length>63">
						<view class="quanwen" v-if="item.btn" @click.stop="all(item)">
							全文
						</view>
						<view class="quanwen" v-else @click.stop="pack(item)">
							收起
						</view>
					</view>
					<!-- 视频 -->
					<view class="cover" :class="item.size.height>item.size.width?'long':'short'" v-if="indexCurrent == 'guan'+index">
					    <video :id="'guan'+index" :src="item.image[0]" v-if="indexCurrent == 'guan'+index"  custom-cache="false" objectFit="cover" style="width: 100%;height: 100%;" autoplay="true" @fullscreenchange="full"></video>
					</view>
					<view class="cover" v-else @click.stop="videoPlay('guan'+index)" :class="item.size.height>item.size.width?'long':'short'">
						<van-icon name="play-circle-o"/>
					    <!-- <image :src="item.cover_url.split('?Expires')[0]" mode="scaleToFill"></image> -->
						<image :src="item.cover_url" mode="scaleToFill"></image>
						<!-- <image :src="item.cover_url.indexOf('?Expires')==-1?item.cover_url:item.cover_url.split('?Expires')[0]" mode="scaleToFill"></image> -->
					</view>
					<!-- 时间 -->
					<view class="flex justify-between time border-bottom-new2" @click="detail(item.id)" style="padding: 0 0 8px 0%">
						<view class="">
							{{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}}
						</view>
					</view>
					<!-- 点赞转发 -->
					<view class="flex justify-between align-center" style="padding: 5px 0px;">
						<!-- <view class="transpond"> -->
							<button  class="flex align-center diybtn transpond" open-type="share" style="background-color: white;"
							:data-id="item.id" :data-img="item.cover_url" :data-title="item.content">
								<van-icon name="share" size="16px"  style="margin-right:10upx" />
								<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
									{{item.transpond}}
								</view>
							</button>
						<!-- </view> -->
						
						<view class="flex align-center transpond" @click.stop="detail(item.id)">
							<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.comments}}
							</view>
						</view>
						
						
						<view class="flex align-center transpond" @click.stop="praise(item)">
							<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.upvotes}}
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
			<!-- 没有内容 -->
			<!-- <view class="flex align-center justify-center flex-d"  style="width: 100%;height: 600upx; background-color: white;" v-if="listguan.length===0">
					  <van-icon name="failure" size="60px" color="rgba(13,103,217,1)" style="margin-bottom: 50upx;"/>
					  <view class="text">暂无关注的资讯圈</view>	
			</view> -->
			
			<view class="LuDingJi-no" v-if="listguan.length===0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
				<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true"  mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无内容
				</view>
			</view>
			
			<view  class="noMore1" v-if="allowguan&&listguan.length>0">
					暂无更多内容
			</view>
			<!-- 上拉加载 -->
			<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingguan">
				   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		
		<!-- ================================下面1个，推荐============================== -->
		<view class="" v-if="tabCurrent===0">
			<view class="information" v-for="(item,index) in listtui" :key="index" >
				<!-- 显示不是视频的 -->
				<view style="padding-top: 30upx;width: 100%;" v-if="item.kind=== 0">
					<!-- 头像名字 -->
					<view class="flex justify-center align-center top"  style="padding: 0 3%;">
						<view class="re" @click.stop="MyInfo(item.user_id)">
							<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
						</view>
						<view style="flex: 1;" class="flex flex-d justify-around" @click.stop="MyInfo(item.user_id)">
								<view class="nick flex align-center">
									<view class="nickname">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view>
								
								<view class="company" v-show="item.company!==null">
									<text v-if="item.job">{{item.job}}</text><text v-if="item.job" style="margin: 0 3px;">I</text><text>{{item.company}}</text>
								</view>
						</view>
						
						<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg(item,index)">
							<van-icon name="arrow-down" />
							<van-transition :show="n===index" custom-class="block" >
							  <view class="jubaobtn">
							  	<view class="" v-if="item.is_creator === 1" @click.stop="del_zixun(item,index)">
							  		删除
							  	</view>
							  	<view class="" v-if="item.is_creator === 0">
									<!-- item.is_report -->
							  		<text v-show="item.is_report===0" @click.stop="jubao_zixun(item,index)">举报</text>
									<text v-show="item.is_report===1">已举报</text>
							  	</view>
							  </view>
							</van-transition>
						</view>			
									
					</view>
					<!-- 描述 -->
					<view  class="oldContent" style="padding: 0 3%;" @click="detail(item.id)" :class="{newContent:item.btn}">
						{{item.content}}
					</view>
					<!-- 全文那个 showTotalBtn-->
					<view class="" v-if="item.content.length>63">
						<view class="quanwen" v-if="item.btn" @click.stop="all(item)">
							全文
						</view>
						<view class="quanwen" v-else @click.stop="pack(item)">
							收起
						</view>
					</view>
					
					<!-- 图片 -->
					<view class="flex flex-wrap  zhuijia " style="padding-top: 20upx;" v-if="item.image.length>1">
						<image :src="img" mode="aspectFill" lazy-load="true" v-for="(img,index1) in item.image"  :key="index1" style="
						width: 226upx;height: 226upx;
						margin-bottom: 14upx;
						margin-left: 18upx;
						display: block;
						" @click.prevent.stop="preview(index1,item.image)"></image>
					</view>
					<view class="flex flex-wrap  zhuijia imgone" style="padding: 20upx 30upx 0;" v-if="item.image.length==1">
						<image :src="img" mode="widthFix" lazy-load="true" v-for="(img,index1) in item.image"  :key="index1" style="
						margin-bottom: 14upx;
						display: block;
						" @click.prevent.stop="preview(index1,item.image)"></image>
					</view>
					<!-- 时间 -->
					<view class="flex justify-between time border-bottom-new2" @click="detail(item.id)" :class="{newtime:item.image.length==0}">
						<view class="">
							{{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}}
						</view>
					</view>
					<!-- 点赞转发 -->
					<view class="flex justify-between align-center" style="padding: 5px 0px;">
						<!-- <view class="transpond"> -->
							<button  class="flex align-center diybtn transpond" open-type="share" style="background-color: white;" 
							:data-id="item.id" :data-img="item.image[0]" :data-title="item.content">
								<van-icon name="share" size="16px"  style="margin-right:10upx" />
								
								<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
									{{item.transpond}}
								</view>
							</button>
						<!-- </view> -->
						
						<view class="flex align-center transpond" @click.stop="detail(item.id)">
							<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.comments}}
							</view>
						</view>
						
						
						<view class="flex align-center transpond" @click.stop="praise(item)">
							<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.upvotes}}
							</view>
						</view>
						
					</view>
				</view>
				
				<!-- 显示是视频的 -->
				<view style="padding: 30upx 3% 0;width: 100%;" v-if="item.kind=== 1 && item.image">

					<!-- 头像名字 -->
					<view class="flex justify-center align-center top"  style="padding: 0 3% 0 0;">
						<view class="re" @click.stop="MyInfo(item.user_id)">
							<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
						</view>
						
						
						<view style="flex: 1;" class="flex flex-d justify-around" @click.stop="MyInfo(item.user_id)">
								<view class="nick flex align-center">
									<view class="nickname">
										{{item.nickname}}
									</view>
									<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
								</view>
								
								<view class="company" v-show="item.company!==null">
									<text v-if="item.job">{{item.job}}</text><text v-if="item.job" style="margin: 0 3px;">I</text><text>{{item.company}}</text>
								</view>
						</view>
						
						<view class="re" style="width: 12px;height: 12px;" @click.stop="Msg(item,index)">
							<van-icon name="arrow-down" />
							<van-transition :show="n===index" custom-class="block" >
							  <view class="jubaobtn">
							  	<view class="" v-if="item.is_creator === 1" @click.stop="del_zixun(item,index)">
							  		删除
							  	</view>
							  	<view class="" v-if="item.is_creator === 0">
									<!-- item.is_report -->
							  		<text v-show="item.is_report===0" @click.stop="jubao_zixun(item,index)">举报</text>
									<text v-show="item.is_report===1">已举报</text>
							  	</view>
							  </view>
							</van-transition>
						</view>			
									
					</view>
					<!-- 描述 -->
					<view  class="oldContent"  @click="detail(item.id)" :class="{newContent:item.btn}">
						{{item.content}}
					</view>
					<!-- 全文那个 showTotalBtn-->
					<view class="" v-if="item.content.length>63">
						<view class="quanwen" v-if="item.btn" @click.stop="all(item)">
							全文
						</view>
						<view class="quanwen" v-else @click.stop="pack(item)">
							收起
						</view>
					</view>
					<!-- 视频 -->
					<view class="cover" :class="item.size.height>item.size.width?'long':'short'" v-if="indexCurrent == 'tui'+index">
					    <video :id="'tui'+index" :src="item.image[0]" v-if="indexCurrent == 'tui'+index"  custom-cache="false" objectFit="cover" style="width: 100%;height: 100%;" autoplay="true" @fullscreenchange="full"></video>
					</view>
					<view class="cover" v-else @click.stop="videoPlay('tui'+index)" :class="item.size.height>item.size.width?'long':'short'">
						<van-icon name="play-circle-o"/>
					    <!-- <image :src="item.cover_url.split('?Expires')[0]" mode="scaleToFill"></image> -->
						<image :src="item.cover_url" mode="scaleToFill"></image>
						<!-- <image :src="item.cover_url.indexOf('?Expires')==-1?item.cover_url:item.cover_url.split('?Expires')[0]" mode="scaleToFill"></image> -->
					</view>
					<!-- 时间 -->
					<view class="flex justify-between time border-bottom-new2" @click="detail(item.id)" style="padding: 0 0 8px 0%">
						<view class="">
							{{item.created_at.split(' ')[0]}}{{item.created_at.substr(10,6)}}
						</view>
					</view>
					<!-- 点赞转发 -->
					<view class="flex justify-between align-center" style="padding: 5px 0px;">
						<!-- <view class="transpond"> -->
							<button  class="flex align-center diybtn transpond" open-type="share" style="background-color: white;"
							:data-id="item.id" :data-img="item.cover_url" :data-title="item.content">
								<van-icon name="share" size="16px"  style="margin-right:10upx" />
								<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
									{{item.transpond}}
								</view>
							</button>
						<!-- </view> -->
						
						<view class="flex align-center transpond" @click.stop="detail(item.id)">
							<van-icon name="comment-o" size="16px"  style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.comments}}
							</view>
						</view>
						
						
						<view class="flex align-center transpond" @click.stop="praise(item)">
							<van-icon name="good-job" size="16px" :color="item.is_upvotes?'#0864D7':'rgb(153, 153, 153)'" style="margin-right:10upx" />
							<view class="" style="font-size:12px;font-weight:400;color:rgba(145,149,154,1);">
								{{item.upvotes}}
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
			<!-- 没有内容 -->
			<view class="LuDingJi-no" v-if="listtui.length===0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
				<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true"  mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无内容
				</view>
			</view>
			
			<view  class="noMore1" v-if="allowtui&&listtui.length>0">
					暂无更多内容
			</view>
			<!-- 上拉加载 -->
			<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingtui">
				   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		<!-- 第四个德申新闻 -->
		<view class="" v-if="tabCurrent===3">
			<view class="" v-if="newsList.length>0">
				<view v-for="(item,index) in newsList" :key="index" class="newsWrap1 border-bottom-new2" @click="goNewsDetail(item.id)">
					<!-- 只有一个图的 -->
					<view class="" v-if="item.img.length==1">
						<view class="flex justify-between" style="margin-bottom: 23upx;">
							<view class="newsTitle flex1">
								{{item.title}}
							</view>
							<view class="newsImgWrapOne">
								<image :src="item.img[0]" lazy-load="true"  mode="aspectFill"></image>
							</view>
						</view>
						<view class="flex justify-between align-center newsPing">
							<view class="">
								<text>阅读{{item.click}}</text>
								<text style="margin-left: 6px;">评论{{item.comments}}</text>
							</view>
							<view class="">
								{{item.created_at.split(' ')[0]}}
							</view>
						</view>
					</view>
					<!-- 多图或者没图 -->
					<view class="" v-else>
						<view class="newsTitle">
							{{item.title}}
						</view>
						<view class="newsImgWrap flex" v-if="item.img.length>0" :class="{justify_between:item.img.length>2}">
							<image :src="item1" lazy-load="true"  mode="aspectFill" v-for="(item1,index1) in item.img" :key="index1" v-show="index1<3"></image>
						</view>
						<view class="flex justify-between align-center newsPing">
							<view class="">
								<text>阅读{{item.click}}</text>
								<text style="margin-left: 6px;">评论{{item.comments}}</text>
							</view>
							<view class="">
								{{item.created_at.split(' ')[0]}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="LuDingJi-no" v-if="newsList.length===0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
				<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true"  mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无内容
				</view>
			</view>
			
			<view  class="noMore1" v-if="allowNews&&newsList.length>0">
					暂无更多内容
			</view>
			
			<!-- 上拉加载 -->
			<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingNews">
				   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		<!-- 第6个德申学院视频的 -->
		<view class="" v-if="tabCurrent===5">
			<view class="" v-if="schoolList.length>0">
				<view v-for="(item,index) in schoolList" :key="index" class="newsWrap border-bottom-new2" >
					<view class="">
						
						<view class="cover" v-if="indexCurrent == 'school'+index">
						    <video :id="'school'+index" :src="item.storage_id" v-if="indexCurrent == 'school'+index"  custom-cache="false" objectFit="cover" style="width: 100%;height: 100%;" autoplay="true" @fullscreenchange="full"></video>
						</view>
						<view class="cover" v-else @click.stop="videoPlay('school'+index)">
							<van-icon name="play-circle-o"/>
						    <image :src="item.cover" mode="scaleToFill"></image>
							<!-- <image :src="item.cover.indexOf('?Expires')==-1?item.cover:item.cover.split('?Expires')[0]" mode="scaleToFill"></image> -->
						</view>
						
						<view class="newsTitle" @click="goSchoolDetail(item.id)">
							{{item.title}}
						</view>
						
						<view class="flex justify-between align-center newsPing" @click="goSchoolDetail(item.id)">
							<view class="">
								<text>阅读{{item.click}}</text>
								<text style="margin-left: 6px;">评论{{item.comments}}</text>
							</view>
							<view class="">
								{{item.created_at.split(' ')[0]}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="LuDingJi-no" v-if="schoolList.length===0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
				<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true"  mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无内容
				</view>
			</view>
			
			<view  class="noMore1" v-if="allowSchool&&schoolList.length>0">
					暂无更多内容
			</view>
			
			<!-- 上拉加载 -->
			<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingSchool">
				   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		<!-- 第五个公益学院视频的 -->
		<view class="" v-if="tabCurrent===4">
			<view class="" v-if="publicList.length>0">
				<view v-for="(item,index) in publicList" :key="index" class="newsWrap border-bottom-new2" >
					<view class="">
						<view class="cover" v-if="indexCurrent == 'public'+index">
						    <video :id="'public'+index" :src="item.storage_id" v-if="indexCurrent == 'public'+index"  custom-cache="false" objectFit="cover" style="width: 100%;height: 100%;" autoplay="true" @fullscreenchange="full"></video>
						</view>
						<view class="cover" v-else @click.stop="videoPlay('public'+index)">
							<van-icon name="play-circle-o"/>
						    <image :src="item.cover" mode="scaleToFill"></image>
							<!-- <image :src="item.cover.indexOf('?Expires')==-1?item.cover:item.cover.split('?Expires')[0]" mode="scaleToFill"></image> -->
						</view>
						
						<view class="newsTitle" @click="goSchoolDetail(item.id)">
							{{item.title}}
						</view>
						
						<view class="flex justify-between align-center newsPing" @click="goSchoolDetail(item.id)">
							<view class="">
								<text>阅读{{item.click}}</text>
								<text style="margin-left: 6px;">评论{{item.comments}}</text>
							</view>
							<view class="">
								{{item.created_at.split(' ')[0]}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="LuDingJi-no" v-if="publicList.length===0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
				<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true"  mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无内容
				</view>
			</view>
			
			<view  class="noMore1" v-if="allowSchool&&publicList.length>0">
					暂无更多内容
			</view>
			
			<!-- 上拉加载 -->
			<view style="height: 88upx; display: flex;  width: 100%;" v-if="loadingPublic">
				   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		<van-dialog id="van-dialog" />
		<!-- 下面的发布 -->
		<cover-view class="gotoTop" v-if="statusShow==2">
			<cover-image class="controls-play img" @click="Issue" src="https://web.detion.com/static/images/send.png"></cover-image>
		</cover-view>
		<!-- <view class="gotoTop">
		        <view class="gotoTop-send"  @click="Issue" >
					<van-icon name="records" size="20px"/>
					<view>
						发布
					</view>
		        </view>
		</view> -->
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				finish:false,
				token:null,
				userId:null,
				screenWidth:'',
				n:1000000,
				msgShow:false,
				showActive:false,
				tablist:['推荐','关注','视频','德申新闻','公益课堂','德申学院'],
				tabCurrent:0,
				// 推荐
				listtui: [],
			    pagetui: 1,
				idtui:'',
				loadingtui:false,
				allowtui:false,
				scrollToptui:0,
				// 关注
				listguan: [],
				pageguan: 1,
				idguan:'',
				loadingguan:false,
				allowguan:false,
				scrollTopguan:0,
				// 视频
				listv: [],
				pagev: 1,
				idv:'',
				loadingv:false,
				allowv:false,
				scrollTopv:0,
				indexCurrent: null,
				playingIndex: null,
				// 德申新闻
				newsList:[],
				newsPage:1,
				loadingNews:false,
				allowNews:false,
				// 德申学院
				schoolList:[],
				schoolPage:1,
				loadingSchool:false,
				allowSchool:false,
				allow0:false,
				allow1:false,
				allow2:false,
				allow3:false,
				allow4:false,
				allow5:false,
				publicList:[],
				publicPage:1,
				loadingPublic:false,
				allowPublic:false,
				scrollScreen:0, //视频全屏时列表高度
				statusShow:1
			}
		},
		onShareAppMessage:function(res) {
			
		    if (res.from === 'button') {// 来自页面内分享按钮
				if(uni.getStorageSync('userId')){
					this.$api.reports_transpond({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						id:res.target.dataset.id
					}).then(res1=>{
						if(res1.data.code=='200'){
							if(this.tabCurrent == 0){
								for(var i =0 ; i<this.listtui.length;i++){
									if(res.target.dataset.id == this.listtui[i].id){
										this.listtui[i].transpond++
									}
								}
							}else if(this.tabCurrent == 1){
								for(var i =0 ; i<this.listguan.length;i++){
									if(res.target.dataset.id == this.listguan[i].id){
										this.listguan[i].transpond++
									}
								}
							}else{
								for(var i =0 ; i<this.listv.length;i++){
									if(res.target.dataset.id == this.listv[i].id){
										this.listv[i].transpond++
									}
								}
							}
						}
					})
					return {
					  title: res.target.dataset.title?res.target.dataset.title.substring(0,30)+'...':'德申汇资讯圈',
					  imageUrl:res.target.dataset.img?res.target.dataset.img:app.shareImg,
					  path: '/pagesMy/InfoDetail/InfoDetail?id='+res.target.dataset.id
					}
				}else{
					return {
					  title: '德申汇资讯圈',
					  imageUrl:app.shareImg,
					  path: '/pages/information/information'
					}
				}
				
		    }
		    return {
		      title: '德申汇资讯圈',
			  imageUrl:app.shareImg,
			  path: '/pages/information/information'
		    }
		},
		// 触底加载
		onReachBottom(){
			// 公益学院
			if(this.tabCurrent === 4 && this.allow4){
				// console.log(1)
				this.allow4 = false
				this.loadingPublic = true
				this.publicPage++
				this.getPublic()
			}
			// 德申学院上拉加载
			if(this.tabCurrent === 5 && this.allow5){	
				// console.log(1)
				this.allow5 = false
				this.loadingSchool = true
				this.schoolPage++
				this.getSchool()
			}
			// 德申新闻上拉加载
			if(this.tabCurrent === 3 && this.allow3){	
				// console.log(1)
				this.allow3 = false			
				this.loadingNews = true
				this.newsPage++
				this.getNews()
				
			}
			// 推荐的上拉加载
			if(this.tabCurrent === 0&& this.allow0){	
				// console.log(1)
				this.allow0 = false			
				if(this.listtui.length>0){
					this.idtui = this.listtui[this.listtui.length-1].id
				}
				this.loadingtui = true
				this.pagetui++
				this.gettui()
				
			}
			// 我关注的上拉
			if(this.tabCurrent === 1 && this.allow1){
				// console.log(0)
				this.allow1 = false		
				if(this.listguan.length>0){
					this.idguan = this.listguan[this.listguan.length-1].id
				}
				this.loadingguan = true
				this.pageguan++
				this.getguan()
			
			}
			
			// 视频的上拉
			if(this.tabCurrent === 2 && this.allow2){
				this.allow2 = false	
				if(this.listv.length>0){
					this.idv = this.listv[this.listv.length-1].id
				}
				this.loadingv = true
				this.pagev++
				this.getv()
				
			}
		},
		onPullDownRefresh(){
			this.idtui = ''
			this.idguan = ''
			this.idv = ''
			this.newsPage = 1
			this.schoolPage = 1
			this.publicPage = 1
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.gettui()
			this.getguan()
			this.getv()
			this.getNews()
			this.getSchool()
			this.getPublic()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 1000);
		},
		onHide() {
			this.showActive = false
			this.n = 1000000
			this.indexCurrent = null
		},
		onShow() {
			if(this.indexCurrent){
				var videoContextPrev = uni.createVideoContext(this.indexCurrent)
				videoContextPrev.pause()
			}
			// 详情点赞之后回到界面需要显示已经点赞
			if(uni.getStorageSync('praiseid')){
				this.listtui.forEach((item,index)=>{
					if(uni.getStorageSync('praiseid') == item.id){
						item.is_upvotes = true
						item.upvotes++
					}
				})
				
				this.listguan.forEach((item,index)=>{
					if(uni.getStorageSync('praiseid') == item.id){
						item.is_upvotes = true
						item.upvotes++
					}
				})
				
				this.listv.forEach((item,index)=>{
					if(uni.getStorageSync('praiseid') == item.id){
						item.is_upvotes = true
						item.upvotes++
					}
				})
				
				setTimeout(function() {
					uni.removeStorageSync('praiseid')
				}, 1500);
			}
			if(uni.getStorageSync('unpraiseid')){
				this.listtui.forEach((item,index)=>{
					if(uni.getStorageSync('unpraiseid') == item.id){
						item.is_upvotes = false
						if(item.upvotes>0){
							item.upvotes--
						}
					}
				})
				
				this.listguan.forEach((item,index)=>{
					if(uni.getStorageSync('unpraiseid') == item.id){
						item.is_upvotes = false
						if(item.upvotes>0){
							item.upvotes--
						}
					}
				})
				
				this.listv.forEach((item,index)=>{
					if(uni.getStorageSync('unpraiseid') == item.id){
						item.is_upvotes = false
						if(item.upvotes>0){
							item.upvotes--
						}
					}
				})
				
				setTimeout(function() {
					uni.removeStorageSync('unpraiseid')
				}, 1500);
			}
			// 详情举报之后回到界面需要显示已经举报
			if(uni.getStorageSync('reportid')){
				this.listtui.forEach((item,index)=>{
					if(uni.getStorageSync('reportid') == item.id){
						item.is_report = 1
					}
				})
				
				this.listguan.forEach((item,index)=>{
					if(uni.getStorageSync('reportid') == item.id){
						item.is_report = 1
					}
				})
				
				this.listv.forEach((item,index)=>{
					if(uni.getStorageSync('reportid') == item.id){
						item.is_report = 1
					}
				})
				
				setTimeout(function() {
					uni.removeStorageSync('reportid')
				}, 1500);
			}
			
			// 详情删除,需要到界面过滤出去
			if(uni.getStorageSync('delid')){
				this.listtui = this.listtui.filter((item,index) => item.id != uni.getStorageSync('delid'))
				this.listguan = this.listguan.filter((item,index) => item.id != uni.getStorageSync('delid'))
				this.listv = this.listv.filter((item,index) => item.id != uni.getStorageSync('delid'))
				setTimeout(function() {
					uni.removeStorageSync('delid')
				}, 1500);
			}
		},
		onLoad(e) {
			this.token = app.token
			this.userId = app.userId
			uni.showLoading({
			    title: '加载中'
			});
			this.getShow()
			// this.gettui()
			// this.getguan()
			// this.getv()
			// this.getNews()
			// this.getSchool()
			// this.getPublic()
		},
		onPageScroll(e) {
			this.scrollScreen = e.scrollTop
		},
		methods: {
			getShow(){
				this.$api.Wxapplet_disable({
				}).then(res=>{
					this.statusShow = res.data.data
					if(this.statusShow==1){
						this.tabCurrent = 3
						this.getNews()
					}else{
						this.gettui()
						this.getguan()
						this.getv()
						this.getNews()
						this.getSchool()
						this.getPublic()
					}
				})
			},
			full(){
				uni.pageScrollTo({
					scrollTop:this.scrollScreen
				})
			},
			pau(){
				
			},
			// 交易额
			goTradingVolume(){
				uni.navigateTo({
					url:'../../pagesTwo/TradingVolume/TradingVolume'
				})
			},
			// 企业认证
			goEnterprise(){
				if(uni.getStorageSync('setInfo') === 0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 1000,
						icon:'none'
					});
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
						})
					}, 1000);
				}else{
					this.$api.MyselfIndex({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						
					}).then(res=>{
						if (res.data.code === '200') {
						  if (res.data.data.company_data) {
						    this.company_id = res.data.data.company_data.id
							uni.setStorageSync('company_id',Number(this.company_id))
						  }
						  this.$nextTick(() => {
						    if (uni.getStorageSync("company_id")) {
						      uni.navigateTo({
						      	url:'../../pagesTwo/MyBusiness/MyBusiness?id='+uni.getStorageSync("company_id")
						      })
						    }else{
								uni.navigateTo({
									url:'../../pagesTwo/MyBusiness/MyBusiness'
								})
							} 
						  })
						}
					})
					
				}
			},
			// 俱乐部
			goClub(){
				if(uni.getStorageSync('setInfo') ===0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 2000,
						icon:'none'
					});
					
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
						})
					}, 1000);
					
				}else{
					if (uni.getStorageSync('isVip') === 0) {
						Dialog.confirm({
						  title: '提示',
						  message: '您还不是VIP用户,去支付？',
						  confirmButtonText:'去支付'
						}).then(() => {
							uni.navigateTo({
								url:'../../pagesMy/pay/pay'
							})
						}).catch(() => {
						  // on cancel
						});
					  } else if (uni.getStorageSync('isVip') === 1) {
						uni.navigateTo({
							url:'../../pagesTwo/Club/Club'
						})
					  } 
				}
				
			},
			// 我的项目
			goMy(){
				// console.log(123)
				if(uni.getStorageSync('setInfo') ==0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 2000,
						icon:'none'
					});
					
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
						})
					}, 1000);
					
				}else{
					// console.log(456)
					if (uni.getStorageSync('isVip') == 0) {
						Dialog.confirm({
						  title: '提示',
						  message: '您还不是VIP用户,去支付？',
						  confirmButtonText:'去支付'
						}).then(() => {
							uni.navigateTo({
								url:'../../pagesMy/pay/pay'
							})
						}).catch(() => {
						  // on cancel
						});
					  } else if (uni.getStorageSync('isVip') == 1) {
						  // uni.navigateTo({
						  // 	url:'../../pagesMy/ceshi/ceshi'
						  // })
							uni.navigateTo({
								url:'../../pagesMy/MyProject/MyProject'
							})
					  } 
				}
			},
			// 搜索
			search(){
				uni.navigateTo({
					url:'../../pagesMy/Search/Search'
				})
			},
			// 跳转学院视频详情
			goSchoolDetail(id){
				uni.navigateTo({
					url:'/pagesTwo/SchoolDetail/SchoolDetail?id='+id
				})
			},
			// 跳转新闻详情
			goNewsDetail(id){
				uni.navigateTo({
					url:'/pagesTwo/newsDetail/newsDetail?id='+id
				})
			},
			// 发布
			Issue(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/informationSend/informationSend'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后发布,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			// 视频播放
			videoPlay(e){
				this.indexCurrent=e
			},
			// 视频播放
			video_play(e){
				// console.log(e)
				var curIdx = e.currentTarget.id;
				      // 没有播放时播放视频
				      // console.log(curIdx)
				      if (!this.indexCurrent) {				        
				        this.indexCurrent=curIdx
				        var videoContext = uni.createVideoContext(curIdx) //这里对应的视频id
				        videoContext.play()
				      } else { // 有播放时先将prev暂停，再播放当前点击的current
				        var videoContextPrev = uni.createVideoContext(this.indexCurrent)//this是在自定义组件下，当前组件实例的this，以操作组件内 video 组件（在自定义组件中药加上this，如果是普通页面即不需要加）
				        if (this.indexCurrent != curIdx) {
				          // console.log(123)
				          videoContextPrev.pause()
				          this.indexCurrent=curIdx				          
				          var videoContextCurrent = uni.createVideoContext(curIdx)
				          videoContextCurrent.play()
				        }
				 }

			},
			// 删除自己的资讯圈
			del_zixun(it,index){
				Dialog.confirm({
				  title: '提示',
				  message:'您确定删除吗？'
				}).then(() => {
					this.$api.del_user_dynamic({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						dynamic_id:it.id
					}).then(res=>{
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000,
							icon:'none'
						});
						this.listtui = this.listtui.filter((item,index) => item.id != it.id)
						this.listguan = this.listguan.filter((item,index) => item.id != it.id)
						this.listv = this.listv.filter((item,index) => item.id != it.id)
					})
				  
				}).catch(() => {
				  
				});
					
			},
			// 举报资讯圈
			jubao_zixun(item,index){
				uni.navigateTo({
					url:'/pagesMy/Report/Report?type=1&id='+item.id
				})
			},
			// 显示举报或者删除、
			Msg(item,ind){
				if(uni.getStorageSync('userId')){
					if(this.n === ind){
						this.n = 1000000
					}else{
						this.n = ind
					}
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
			},
			// 选项卡的切换
			tabCheck(ind){
				this.tabCurrent = ind
				this.indexCurrent = null
				uni.pageScrollTo({
					  scrollTop: 0,
					  duration: 0
				});
			},
			// 获取头像列表
			getAvatar () {
			      this.$api.NewsUpvotesAvatar({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        id: this.id
			      }).then(res => {
			        if (res.data.code === '200') {
			          // this.upvotes = res.data.data.upvotes // 点赞数量
			          this.isPraise = res.data.data.is_upvotes // 是否点赞
			        }
			      })
			},
			// 详情
			detail(id){
				this.detailId = id
				uni.navigateTo({
					url:'../../pagesMy/InfoDetail/InfoDetail?id='+id
				})
			},
			// 跳转个人主页
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			 // 图片预览
			preview(ind,img){
				  uni.previewImage({
					 urls: img,
					 current:ind
				 });
			},
		    // 点赞
			praise(item){
				if(uni.getStorageSync('userId')){
					if (item.is_upvotes) {
					       this.$api.NewsUpvotes({
					         token: uni.getStorageSync("token"),
					         user_id: uni.getStorageSync("userId"),
					         id: item.id
					       }).then(res => {
					         // this.$toast(res.msg)
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon:'none'
							});
					         // item.is_upvotes = false
					         // item.upvotes = item.upvotes - 1
												
							this.listtui.forEach((it,index)=>{
								if(it.id===item.id){
									this.listtui[index].is_upvotes = false
									this.listtui[index].upvotes --
								}
							})
							
							this.listguan.forEach((it,index)=>{
								if(it.id===item.id){
									this.listguan[index].is_upvotes = false
									this.listguan[index].upvotes --
								}
							})
							
							this.listv.forEach((it,index)=>{
								if(it.id===item.id){
									this.listv[index].is_upvotes = false
									this.listv[index].upvotes --
								}
							})
												
					       })
					     } else {
					       this.$api.NewsUpvotes({
					         token: uni.getStorageSync("token"),
					         user_id: uni.getStorageSync("userId"),
					         id: item.id
					       }).then(res => {
					         uni.showToast({
					             title: res.data.msg,
					             duration: 2000,
					         	icon:'none'
					         });
					         // item.is_upvotes = true
					         // item.upvotes = item.upvotes + 1
												
							this.listtui.forEach((it,index)=>{
								if(it.id===item.id){
									this.listtui[index].is_upvotes = true
									this.listtui[index].upvotes ++
								}
							})
							
							this.listguan.forEach((it,index)=>{
								if(it.id===item.id){
									this.listguan[index].is_upvotes = true
									this.listguan[index].upvotes ++
								}
							})
							
							this.listv.forEach((it,index)=>{
								if(it.id===item.id){
									this.listv[index].is_upvotes = true
									this.listv[index].upvotes ++
								}
							})
					       })
					     }
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
  
			},
			// 获取视频列表
			getv () {
				// console.log(this.idtui)
			    this.$api.video_list({
			        token: uni.getStorageSync("token") || this.token,
			        user_id: uni.getStorageSync("userId") || this.userId,
					page_id:this.idv
			    }).then(res => {
					// console.log(res)
					// uni.hideLoading();
			        if (res.data.code === '200') {
						// 遍历加上显示超出三行btn
						if(res.data.data.length>0){
							for(let i = 0; i<res.data.data.length;i++){
								if(res.data.data[i].content.length>63){
									res.data.data[i].btn = true
								}else{
									res.data.data[i].btn = false
								}
									
							}
						}
						 if(!this.idv){
						 	if(res.data.data.length>=10){
						 		this.listv = res.data.data
						 		this.loadingv = false
								this.allow2 = true
						 	}else{
						 		this.listv = res.data.data
						 		this.allowv = true
						 		this.loadingv = false
								this.allow2 = false
						 	}														
						 }else{
						 	if(res.data.data.length>=10){
						 		this.listv = this.listv.concat(res.data.data)
						 		this.loadingv = false
								this.allow2 = true
						 	}else{
						 		this.listv = this.listv.concat(res.data.data)
						 		this.allowv = true
						 		this.loadingv = false
								this.allow2 = false
						 	}	
						 }
			          
			        } else if (res.data.code === '1000') {
			          uni.clearStorageSync()
			          uni.showToast({
			              title: '登录过期，请重新登录',
			              duration: 2000,
			          	icon:'none'
			          });
			          
			          uni.reLaunch({
			          	url: '../../pages/login/login'
			          })
			        }
					
			// 		this.$nextTick(()=>{
			// 			  let query1 = uni.createSelectorQuery()
			// 			  query1.selectAll(".contentv").boundingClientRect(data => {
			
			// 				for(let i = 0; i<data.length;i++){
			// 					this.listv[i].btn = true
			// 					if(data[i].height>66){
			// 						this.listv[i].showTotalBtn = true
			// 						this.listv[i].cl = 'content1'
			// 						this.listv[i].all = true
			// 					}
			// 				}
			// 			  }).exec()
						  
			// 			  // console.log(this.listtui)
			// 		})
					
					
					
					 
			      })
			},
			// 获取全球推荐资讯列表
			gettui () {
			    this.$api.news_circle({
			        token: uni.getStorageSync("token") || this.token,
			        user_id: uni.getStorageSync("userId") || this.userId,
					page_id:this.idtui
			    }).then(res => {
					uni.hideLoading();
			        if (res.data.code === '200') {
						// 遍历加上显示超出三行btn
						if(res.data.data.length>0){
							for(let i = 0; i<res.data.data.length;i++){
								if(res.data.data[i].content.length>63){
									res.data.data[i].btn = true
								}else{
									res.data.data[i].btn = false
								}
									
							}
						}
						if(!this.idtui){
						 	if(res.data.data.length>=10){
						 		this.listtui = res.data.data
						 		this.allow0 = true
						 		this.loadingtui = false
						 	}else{
						 		this.listtui = res.data.data
						 		this.allowtui = true
						 		this.loadingtui = false
								this.allow0 = false
						 	}														
						}else{
							
						 	if(res.data.data.length>=10){
						 		this.listtui = this.listtui.concat(res.data.data)
						 		this.allow0 = true
						 		this.loadingtui = false
						 	}else{
						 		this.listtui = this.listtui.concat(res.data.data)
						 		this.allowtui = true
						 		this.loadingtui = false
								this.allow0 = false
						 	}	
						}
			          
			        } else if (res.data.code === '1000') {
			          uni.clearStorageSync()
			          uni.showToast({
			              title: '登录过期，请重新登录',
			              duration: 2000,
			          	icon:'none'
			          });
			          uni.reLaunch({
			          	url: '../../pages/login/login'
			          })
			        }
					this.$nextTick(function(){
						this.finish = true
					})
				})
			},
			// 获取新闻列表
			getNews(){
				this.$api.detion_news({
				    token: uni.getStorageSync("token") || this.token,
				    user_id: uni.getStorageSync("userId") || this.userId,
					category_id:229,
					page:this.newsPage,
					os_type:'mini'
				}).then(res => {
					   // console.log(res)
				    if (res.data.code === '200') {
						
						 if(this.newsPage==1){
						 	if(res.data.data.length>=20){
						 		this.newsList = res.data.data
						 		this.allow3 = true
						 		this.loadingNews = false
						 	}else{
						 		this.newsList = res.data.data
						 		this.allowNews = true
						 		this.loadingNews = false
								this.allow3 = false
						 	}														
						 }else{
						 	if(res.data.data.length>=20){
						 		this.newsList = this.newsList.concat(res.data.data)
						 		this.allow3 = true
						 		this.loadingNews = false
						 	}else{
						 		this.newsList = this.newsList.concat(res.data.data)
						 		this.allowNews = true
						 		this.loadingNews = false
								this.allow3 = false
						 	}	
						 }
						 
						 if(this.statusShow==1){
							 uni.hideLoading();
							 this.finish = true
						 }
						 
				      
				    } else if (res.data.code === '1000') {
				      uni.clearStorageSync()
				      uni.showToast({
				          title: '登录过期，请重新登录',
				          duration: 2000,
				      	icon:'none'
				      });
				      
				      uni.reLaunch({
				      	url: '../../pages/login/login'
				      })
				    }
					
				  })
				
			},
			// 获取我关注的资讯列表
			getguan () {
				// console.log(this.idtui)
			    this.$api.news_attention({
			        token: uni.getStorageSync("token") || this.token,
			        user_id: uni.getStorageSync("userId") || this.userId,
					page:this.pageguan
			    }).then(res => {
					
					// uni.hideLoading();
			        if (res.data.code === '200') {
						// 遍历加上显示超出三行btn
						if(res.data.data.length>0){
							for(let i = 0; i<res.data.data.length;i++){
								if(res.data.data[i].content.length>63){
									res.data.data[i].btn = true
								}else{
									res.data.data[i].btn = false
								}
									
							}
						}
						 
						 if(this.pageguan === 1){
						 	if(res.data.data.length>=10){
						 		this.listguan = res.data.data
						 		this.allow1 = true
						 		this.loadingguan = false
						 	}else{
						 		this.listguan = res.data.data
						 		this.allowguan = true
						 		this.loadingguan = false
								this.allow1 = false
						 	}														
						 }else{
						 	if(res.data.data.length>=10){
						 		this.listguan = this.listguan.concat(res.data.data)
						 		this.allow1 = true
						 		this.loadingguan = false
						 	}else{
						 		this.listguan = this.listguan.concat(res.data.data)
						 		this.allowguan = true
						 		this.loadingguan = false
								this.allow1 = false
						 	}	
						 }
						 // console.log(this.listguan)
			          
			        } else if (res.data.code === '1000') {
			          uni.clearStorageSync()
			          uni.showToast({
			              title: '登录过期，请重新登录',
			              duration: 2000,
			          	icon:'none'
			          });
			          
			          uni.reLaunch({
			          	url: '../../pages/login/login'
			          })
			        }
					

			      })
			},
			
			// 获取德申学院列表
			getSchool(){
				this.$api.grow_school({
				    token: uni.getStorageSync("token") || this.token,
				    user_id: uni.getStorageSync("userId") || this.userId,
					page:this.schoolPage,
					type:1
				}).then(res => {
					   // console.log(res)
				    if (res.data.code === '200') {
						
						 if(this.schoolPage==1){
						 	if(res.data.data.length>=20){
						 		this.schoolList = res.data.data
						 		this.allow5 = true
						 		this.loadingSchool = false
						 	}else{
						 		this.schoolList = res.data.data
						 		this.allowSchool = true
						 		this.loadingSchool = false
								this.allow5 = false
						 	}														
						 }else{
						 	if(res.data.data.length>=20){
						 		this.schoolList = this.schoolList.concat(res.data.data)
						 		this.allow5 = true
						 		this.loadingSchool = false
						 	}else{
						 		this.schoolList = this.schoolList.concat(res.data.data)
						 		this.allowSchool = true
						 		this.loadingSchool = false
								this.allow5 = false
						 	}	
						 }
				      
				    } else if (res.data.code === '1000') {
				      uni.clearStorageSync()
				      uni.showToast({
				          title: '登录过期，请重新登录',
				          duration: 2000,
				      	icon:'none'
				      });
				      
				      uni.reLaunch({
				      	url: '../../pages/login/login'
				      })
				    }
					
				  })
				
			},
			// 获取公益课堂列表
			getPublic(){
				this.$api.grow_school({
				    token: uni.getStorageSync("token") || this.token,
				    user_id: uni.getStorageSync("userId") || this.userId,
					page:this.publicPage,
					type:2
				}).then(res => {
					   // console.log(res)
				    if (res.data.code === '200') {
						
						 if(this.publicPage==1){
						 	if(res.data.data.length>=20){
						 		this.publicList = res.data.data
						 		this.allow4 = true
						 		this.loadingPublic = false
						 	}else{
						 		this.publicList = res.data.data
						 		this.allowPublic = true
						 		this.loadingPublic = false
								this.allow4 = false
						 	}														
						 }else{
						 	if(res.data.data.length>=20){
						 		this.publicList = this.publicList.concat(res.data.data)
						 		this.allow4 = true
						 		this.loadingPublic = false
						 	}else{
						 		this.publicList = this.publicList.concat(res.data.data)
						 		this.allowPublic = true
						 		this.loadingPublic = false
								this.allow4 = false
						 	}	
						 }
				      
				    } else if (res.data.code === '1000') {
				      uni.clearStorageSync()
				      uni.showToast({
				          title: '登录过期，请重新登录',
				          duration: 2000,
				      	icon:'none'
				      });
				      
				      uni.reLaunch({
				      	url: '../../pages/login/login'
				      })
				    }
					
				  })
				
			},
			
			// 展开全文
			all(item){
				item.btn = false
			},
			// 收起
			pack(item){
				item.btn = true
			}
		}
	}
</script>

<style>
	@import url("./information.css");
</style>

<template>
	<view v-if="finish" class="create_con">
		<view class="infoCon club">
		  <view class="club_title">俱乐部信息</view>
		  <view class="text flex align-center">
		    <label>名称</label>
		    <!--<input type="text" v-model="name" placeholder="暂无" id="name" readonly>-->
		    <view class="det" v-if="name">{{name}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-center">
		    <label>标签</label>
		    <!--<input type="text" v-model="tagName" placeholder="暂无" id="tag" readonly>-->
		    <view class="det" v-if="tagName">{{tagName}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-center">
		    <label>国家</label>
		    <!--<input type="text" placeholder="暂无" v-model="country" id="country" readonly>-->
		    <view class="det" v-if="country">{{country}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-center">
		    <label>地区</label>
		    <!--<input type="text" placeholder="暂无" id="province" v-model="province" readonly>-->
		    <view class="det" v-if="province">{{province}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-start textarea">
		    <label>创会设想</label>
		    <!--<textarea name="" class="scroll" placeholder="暂无" v-model="imagine" id="imagine" readonly></textarea>-->
		    <view class="area scroll" v-if="imagine">{{imagine}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-start textarea" style="position: relative">
		    <label>俱乐部简介</label>
		    <!--<textarea name="" class="scroll" placeholder="暂无" v-model="description" id="description" maxlength="50" readonly></textarea>-->
		    <view class="area scroll" v-if="description">{{description}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="club_title">会长信息</view>
		  <view class="text flex align-center">
		    <label>姓名</label>
		    <!--<input type="text" v-model="nickname" placeholder="暂无" id="nickname" readonly>-->
		    <view class="det" v-if="nickname">{{nickname}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-center">
		    <label>身份证号</label>
		    <!--<input type="text" v-model="id" placeholder="暂无" id="id" readonly>-->
		    <view class="det" v-if="id">{{id}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-center">
		    <label>生日</label>
		    <!--<input type="text" v-model="birthday" placeholder="暂无" id="birthday" readonly>-->
		    <view class="det" v-if="birthday">{{birthday}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-center">
		    <label>企业-职务</label>
		    <!--<input type="text" v-model="company" placeholder="暂无" id="company" readonly>-->
		    <view class="det" v-if="company">{{company}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-center">
		    <label>电子邮箱</label>
		    <!--<input type="text" v-model="email" placeholder="暂无" id="email" readonly>-->
		    <view class="det" v-if="email">{{email}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text flex align-start textarea">
		    <label>个人简历</label>
		    <!--<textarea name="" class="scroll" placeholder="暂无" v-model="resume" id="resume" readonly></textarea>-->
		    <view class="area scroll" v-if="resume">{{resume}}</view>
		    <view class="det" v-else>暂未填写</view>
		  </view>
		  <view class="text textarea" style="position: relative">
		    <label style="width: 100%!important;">上传身份证/绿卡/护照</label>
		    <view class="rz-picter uploadCon upload" id="modificationPreview" style="width: 172px;margin: 15px  auto 0;">
		      <view class="pic_ratio" style="--aspect-ratio: 344/192">
		        <view class="size flex align-center justify-center">
<!-- 		          <img :src="item.src" style="max-width: 100%;min-height: 100%;height:auto;display: block"  v-for="(item, index) in image" :key="index" id="modificationImg" @click="$preview.open(index, image)" class="preview-img"> -->
				  
				  <image :src="item.src" lazy-load="true" class="imga" mode="aspectFill" v-for="(item, index) in image" :key="index"></image>
		        </view>
		      </view>
		    </view>
		  </view>
		</view>
		<view class="check_info" v-if="check_info.length">
		  <view class="title">审核信息</view>
			<view class="table">
			   <view class="tr bg-w">
				   <view class="th">审核人员</view>
				   <view class="th">姓名</view>
				   <view class="th">状态</view>
				   <view class="th">时间</view>
			   </view>
			   <block v-for="(item, index) in check_info" :key="index">
				   <view class="tr">
						<view class="td" v-if="item.type === 1 ">城市会长</view>
						<view class="td" v-else-if="item.type === 2">小助手</view>
						<view class="td" >{{item.nickname}}</view>
						<view class="td" v-if="item.status === 0">待审核</view>
						<view class="td" v-else-if="item.status === 1">已通过</view>
						<view class="td" v-else-if="item.status === 2">已驳回</view>
						<view class="td">{{item.created_at}}</view>
				   </view>
			   </block>
		    </view>
		</view>
		<view class="checkBtn flex align-center" v-show="is_auth">
		  <view @click="reject">驳回</view>
		  <view class="pass" @click="agree">通过</view>
		</view>
		<view style="height: 60px;background: #fafafa" v-show="is_auth"></view>
		
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				eId:'',
				isSubmit: false,
				name: '', // 名称
				tagName: '', // 标签
				country: '', // 国家
				province: '', // 省
				city: '', // 城市
				description: '', // 俱乐部描述
				nickname: '',
				id: '',
				sex: 0,
				birthday: '', // 出生日期
				company: '', // 企业
				imagine: '', // 创会设想
				email: '', // 电子邮箱
				resume: '', // 简历
				finish: false,
				avatar: '',
				image: [],
				check_info: [],
				is_auth: false
			}
		},
		onLoad(e) {
			this.eId = e.id
			// console.log(e)
			this.getData()
		},
		methods: {
			reject () {
				
				Dialog.confirm({
				  title: '提示',
				  message: '确定要驳回吗？'
				}).then(() => {
					this.$api.reject({
					  token: uni.getStorageSync("token"),
					  user_id: uni.getStorageSync("userId"),
					  id: this.eId
					}).then(res => {
					  if (res.data.code === '200') {
					    uni.showToast({
					        title: '驳回成功',
					        duration: 2000,
					    	icon:'none'
					    });
					    this.getData()
					  }
					})
				}).catch(() => {
				  // on cancel
				});
			},
			agree () {
			  Dialog.confirm({
			    title: '提示',
			    message: '确定要通过审核吗？'
			  }).then(() => {
			  	this.$api.agree({
			  	  token: uni.getStorageSync("token"),
			  	  user_id: uni.getStorageSync("userId"),
			  	  id: this.eId
			  	}).then(res => {
			  	  if (res.data.code === '200') {
			  	    uni.showToast({
			  	        title: '操作成功',
			  	        duration: 2000,
			  	    	icon:'none'
			  	    });
			  	    this.getData()
			  	  }
			  	})
			  }).catch(() => {
			    // on cancel
			  });
			},
			getData(){
				this.$api.check_club_apply_detail({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					id:this.eId
				}).then(res=>{
					if (res.data.code === '200') {
					  this.name = res.data.data.name
					  this.tagName = res.data.data.tagname
					  this.country = res.data.data.country
					  if (res.data.data.city.length) {
					    this.province = res.data.data.province + '-' + res.data.data.city
					  } else {
					    this.province = res.data.data.province
					  }
					  this.description = res.data.data.description
					  this.nickname = res.data.data.cdr_info.name
					  this.sex = res.data.data.cdr_info.sex
					  this.id = res.data.data.cdr_info.idcard
					  this.birthday = res.data.data.cdr_info.birthday
					  this.company = res.data.data.cdr_info.duty
					  this.imagine = res.data.data.cdr_info.imagine
					  this.email = res.data.data.cdr_info.email
					  this.resume = res.data.data.cdr_info.resume
					  this.avatar = res.data.data.cdr_info.path
					  this.check_info = res.data.data.check_info
					  this.is_auth = res.data.data.is_auth
					  this.image.push({
					    src: this.avatar,
					    w: 100,
					    h: 100
					  })
					  this.$nextTick(() => {
					    this.finish = true
					    if (this.sex === 0) {
					      this.nickname = this.nickname + '(保密)'
					    } else if (this.sex === 1) {
					      this.nickname = this.nickname + '(男)'
					    } else if (this.sex === 2) {
					      this.nickname = this.nickname + '(女)'
					    }
					  })
					}
				})
			}
		}
	}
</script>

<style>
	@import url("./ClubAudit.css");
	.mint-datetime-cancel{
	  text-align: left!important;
	}
	.mint-datetime-confirm{
	  text-align: right!important;
	}
	.infoCon .text input{
	  color: #333;
	}
</style>

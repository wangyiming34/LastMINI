<template>
  <view class="content scroll" style="padding-top: 0;overflow: auto;background: #fff" v-if="isFinish" ref="list">
    <!--<head-title title="活动详情"></head-title>-->
    <view class="activityCon flex align-center justify-center" style="height: 45.3vw;width: 100%;overflow: hidden">
	  <image :src="detail.url_image" lazy-load="true"  mode="aspectFill"></image>
    </view>
    <view class="activityCon">
      <!--活动状态是进行中，需要报名且已经报名  显示活动二维码-->
      <view class="activitylist" style="padding: 0 15px;">
        <view style="margin-top: 0">
          <view class="title" style="padding-top:10px;padding-right: 10%;">
			  <view class="ab astatus" :style="{background:detail.status=='2'?'#cc3055':'#ccc'}">
			  	{{detail.status=='2'?'进行中':'已结束'}}
			  </view>
            {{detail.name}}
          </view>
          <view class="det newDet flex align-center border-bottom-new2">
				<view class="" style="margin-right: 5px;">
					<van-icon name="clock" color="blue"/>
				</view>
            
				<view class="timelist flex align-center" style="flex: 1;">
				  <view class="time">
					<view class="date">{{start_date}}</view>
					<view class="tips">开始时间</view>
				  </view>
				  <view class="time">
					<view class="date">{{finish_date}}</view>
					<view class="tips">结束时间</view>
				  </view>
				</view>
            <view class="time fee" v-if="detail.is_fee === '0'">
              <view class="date">免费</view>
              <view class="tips">费用</view>
            </view>
            <view class="time fee" v-else-if="detail.is_fee === '1'">
              <view class="date" v-if="detail.fee_code === '1'">￥{{detail.fee}}/人</view>
              <view class="date" v-else-if="detail.fee_code === '2'">${{detail.fee}}/人</view>
              <view class="tips">费用</view>
            </view>
            <!--<view class="time flex align-center "><image src="/static/image/icon18.png" alt="">{{detail.start_date}}/{{detail.finish_date}}</view>-->
            <!--<view class="number flex align-center"><image src="/static/image/loc2.png" alt="">{{detail.address}}</view>-->
          </view>
          <view class="det newDet flex align-center border-bottom-new2" style="-webkit-viewne-clamp: 3;">
            <van-icon name="location" color="blue" style="margin-right: 5px;"/>
            <view class="address">{{detail.address}}</view>
          </view>
        </view>
      </view>
      <!--<view class="activityDetail" v-if="detail.status === 2 && detail.is_sign_up === '2' &&  detail.apply_status === 1">-->
        <!--<view class="detailTitle">活动二维码</view>-->
        <!--<view id="qrcode" class="flex align-center justify-center"></view>-->
      <!--</view>-->
      <!--活动详情-->
      <view class="activityDetail">
        <view class="detailTitle flex align-center">
			<image src="https://web.detion.com/static/img/icon26.png" lazy-load="true"  mode="aspectFill" style="width: 20px;height: 20px;margin: 0 5px;"></image>
			<view class="">
				活动详情
			</view>
			</view>
        <view class="text activity_detail_text" ref="text" v-html="content"></view>

      </view>
      <view>
        <!--进行中的活动需要报名还没报名-->
        <view class="activityDetail" v-if="detail.is_sign_up === '2'  && detail.status === 2">
          <view class="detailTitle" v-show="detail.limits">报名（{{detail.apply_user_count}}/{{detail.limits}}）</view>
          <view class="detailTitle" v-show="detail.limits === null || detail.limits === ''">报名（{{detail.apply_user_count}}/不限）</view>
          <view class="user_list">
            <view class="user flex align-start" v-for="item in user_list" :key="item.id"  @click="my_info(item)" style="position: relative">
              <view class="avatar_border re">
                <view class="image flex align-center justify-center re" style="width: 45px;height: 45px;">
                  <image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill">
                </view>
                <head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
              </view>
              <view style="flex:1;margin-left: 10px;">
                <view class="name">{{item.nickname}}</view>
                <view class="job" v-if="item.club_info.length" v-for="(det, club_index) in item.club_info" :key="club_index">{{det.name}} | {{det.dutyname}}</view>
                <view class="job" v-if="item.organization">{{item.organization}} | {{item.duty}}</view>
                <view class="job" v-if="item.club_name">{{item.club_name}} | {{item.duty_name}}</view>
              </view>
            </view>
          </view>
        
        </view>
        <!--活动状态为进行中而且是需要报名的活动显示-->
        <view class="sign_btn" v-if="detail.status === 2 && detail.is_sign_up === '2'">
          <view style="background: #064DC5" v-if="detail.apply_status === 2" @click="apply">立即报名</view>
          <view style="background: #064DC5" v-else-if="detail.apply_status === 1" @click="cancel">取消报名</view>
          <view v-else-if="detail.apply_status === 3">报名截止</view>
          <view v-else-if="detail.apply_status === 4">身份审查中</view>
          <view v-else-if="detail.apply_status === 6">身份未通过审查</view>
        </view>
		<!-- 活动结束了，并且is_sign_up1是没有报名2是报名了 -->
      <view class="detailToggle" v-if="detail.status === 1 && detail.is_sign_up === '2'" style="border-top:8px solid #f5f5f5">
          <view class="messagelist enterpriselist border-bottom-new2">
            <view class="listItem" :class="{'active':current===0}" @click="join" v-show="detail.limits">参与({{detail.sign_user_count}}/{{detail.limits}})</view>
            <view class="listItem" :class="{'active':current===0}" @click="join" v-show="detail.limits === null || detail.limits === ''">参与({{detail.sign_user_count}}/不限)</view>
            <view class="listItem" :class="{'active':current===1}" @click="review">评论({{comments.length}})</view>
          </view>
          <view class="viewne"></view>
          <view class="activityDetail" v-show="current===0 && detail.sign_user_count !== 0">
            <view class="user_list">
              <view class="user flex align-start" v-for="item in user_list" :key="item.id"  @click="my_info(item)" style="position: relative">
                <view class="avatar_border re">
                  <view class="image flex align-center justify-center re" style="width: 45px;height: 45px;">
                    <image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill">
                  </view>
                  <head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
                </view>
                <view style="flex:1;margin-left: 10px;">
                  <view class="name">{{item.nickname}}</view>
                  <view class="job" v-if="item.club_info.length" v-for="(det, club_index) in item.club_info" :key="club_index">{{det.name}} | {{det.dutyname}}</view>
                  <view class="job" v-if="item.organization">{{item.organization}} | {{item.duty}}</view>
                  <view class="job" v-if="item.club_name">{{item.club_name}} | {{item.duty_name}}</view>
                </view>
              </view>
            </view>
            
          </view>
          <view class="emptylist flex align-center justify-center" style="position: relative;padding: 40px 0;"  v-show="current===0 && detail.sign_user_count === 0">
            <view class="LuDingJi-no">
            	<view class="LuDingJi-icon1" style="margin: 50px auto 30px;width: 292upx;">
            		<image src="https://web.detion.com/static/img/empty_user.png" lazy-load="true"  mode="aspectFit"></image>
            	</view>
            	<view class="LuDingJi-no-con">
            		暂无报名
            	</view>
            </view>
          </view>
          <view v-show="current===1">
            <view class="reviewCon" v-if="comments.length">
              <view class="reviewTitle border-top">全部{{comments.length}}条评论</view>
              <view class="list">
                <view class="flex align-start border-bottom"  v-for="(item,index) in comments" :key="index" style="padding: 10px 3%;">
                  <view class="avatar_border re">
                    <view class="flex align-center justify-center"  @click="my_info(item)" style="width: 35px;height: 35px;">
						 <image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
                    </view>
                    <head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
                  </view>
                  <view class="det" style="padding: 0;">
                    <view class="info flex align-center justify-between">
                      <view class="name flex" style="height: 24px;overflow: hidden">
                        <view style=" overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{item.nickname}} <view v-show="item.company && item.job" style="display: inline-block">•</view> {{item.job}} {{item.company}}</view>
                      </view>
                      <view class="time" style="text-align: right;">{{item.created_at.split(' ')[0]}}</view>
                    </view>
                    
                    <view class="text" >{{item.content}}</view>
                  </view>
                </view>
              </view>
            </view>
            <view class="emptylist flex align-center justify-center" style="position: relative;padding: 40px 0 80px;" v-else>
              <view class="LuDingJi-no">
              	<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
              		<image src="https://web.detion.com/static/img/empty_note.png" lazy-load="true"  mode="aspectFill"></image>
              	</view>
              	<view class="LuDingJi-no-con">
              		暂无评论
              	</view>
              </view>
            </view>
            
            <view class="reviewFoot flex align-center">
              <view class="text">
                <input type="text" placeholder="请输入您的想法吧" v-model="thought">
              </view>
              <view class="send" @click="send">发布</view>
            </view>
          </view>
        </view>
      </view>
    </view>
	<van-dialog id="van-dialog" />
  </view>
</template>

<script>
import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
var app = getApp().globalData
export default {
 
  data () {
    return {
      detail: {}, // 详情
      isClick: false, // 显示查看全文按钮
      all: false, // 查看全部活动详情
      isAll: false, // 提示群成员
      all_user: true, // 查看所有成员
      isSign: false, // 是否报名
      status: 1, // 活动状态
      current: 0, // 默认显示参与
      comments: [], // 评论列表
      comments_number: 0, // 评论数量
      thought: '', // 评论
      qr: '', // 二维码
      list: [],
      user_list: [], // 报名收起列表
      all_list: [], // 报名全部列表
      isFinish: false,
	  id:'',
	  content:'',
	  finish_date:'',
	  start_date:''
    }
  },
  
  onShareAppMessage:function(res) {
  	return {
  	  title: this.detail.name?this.detail.name.substring(0,30)+'...':'德申汇活动详情',
  	  imageUrl:this.detail.url_image?this.detail.url_image:app.shareImg,
  	  path: 'pagesTwo/ActivityDetail/ActivityDetail?id='+this.id
  	}
  },
  onLoad(e) {
    this.id = e.id
    this.getData()
  },
  methods: {
    getData () {
      this.$api.activity_detail({
        user_id: uni.getStorageSync("userId") ? uni.getStorageSync("userId") : '',
        token: uni.getStorageSync("token") ? uni.getStorageSync("token") : '',
        id: this.id
      }).then(res => {
		  
        if (res.data.code === '200') {
          this.detail = res.data.data
		  this.start_date = res.data.data.start_date.replace(/-/g, '/').substr(0,16)
		  this.finish_date = res.data.data.finish_date.replace(/-/g, '/').substr(0,16)
		  this.content =res.data.data.content.replace(/\width: 471px/gi, 'width:100%').replace(/\<img/gi, '<img style="width:100%;height:auto"').replace(/\width: 470px/gi, 'width:100%').replace(/\r?\n/g, '<br />')
		  // console.log(this.content)
          // 需要报名且已结束
          if (this.detail.status === 1 && this.detail.is_sign_up === '2') {
			  // console.log(res)
            this.list = this.detail.sign_user
			this.user_list = this.list
            // if (this.list.length > 5) {
            //   this.user_list = this.list.slice(0, 5)
            //   this.all_list = this.list.slice(5, this.list.length)
            //   this.isAll = true
            // } else {
            //   this.user_list = this.list
            //   this.isAll = false
            // }
            this.getComment()
          }
          // 活动状态为进行中，需要报名，当前已经报名
          if (this.detail.status === 2 && this.detail.is_sign_up === '2') {
            this.list = this.detail.apply_user
			this.user_list = this.list
            // if (this.list.length > 5) {
            //   this.user_list = this.list.slice(0, 5)
            //   this.all_list = this.list.slice(5, this.list.length)
            //   this.isAll = true
            // } else {
            //   this.user_list = this.list
            //   this.isAll = false
            // }
          }
          this.$nextTick(() => {
            this.isFinish = true
          })
        } else if (res.data.code === '1010') {
          uni.clearStorageSync()
          uni.showToast({
              title: '登录过期，请重新登录',
              mask: "true",
          	  icon:'none'
          });
          
          uni.reLaunch({
          	url: '../../pages/login/login'
          })
        }
        
      })
    },
    getComment () {
      this.$api.a_comment_list({
        user_id: uni.getStorageSync("userId") ? uni.getStorageSync("userId") : '',
        token: uni.getStorageSync("token") ? uni.getStorageSync("token") : '',
        id: this.id
      }).then(res => {
        if (res.data.code === '200') {
          this.comments = res.data.data.comment
          
        }
      })
    },
    allText () {
      this.all = !this.all
    },
    allMember () {
      this.all_user = !this.all_user
      if (!this.all_user) {
        this.user_list = this.user_list.concat(this.all_list)
      } else {
        this.user_list = this.user_list.slice(0, 5)
      }
    },
    join () {
      this.current = 0
    },
    review () {
      this.current = 1
    },
    send () {
      if (uni.getStorageSync("userId")) {
        if (uni.getStorageSync("setInfo") === 1) {
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
            if (this.thought.length && this.thought.trim().length) {
              this.$api.a_comment({
                user_id: uni.getStorageSync("userId"),
                token: uni.getStorageSync("token"),
                id: this.id,
                content: this.thought
              }).then(res => {
                uni.showToast({
                    title: res.data.msg,
                    duration: 2000,
                	icon:'none'
                });
                this.thought = ''
                this.getComment()
              })
            } else {
              uni.showToast({
                  title: '评论内容不可为空',
                  duration: 2000,
              	  icon:'none'
              });
            }
          }
        } else {
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
        }
      } else {
        uni.clearStorageSync()
        uni.showToast({
            title: '请登录',
            mask: "true",
        	icon:'none'
        });
        
        uni.reLaunch({
        	url: '../../pages/login/login'
        })
      }
    },
    
    apply () { // 先判断是否登陆，在判断是活动类型
      if (uni.getStorageSync("userId")) {
        if (uni.getStorageSync("setInfo") == 1) {
          if (uni.getStorageSync("isVip") == 1) {
            this.$api.topic_activity_apply_auth({
              token: uni.getStorageSync("token"),
              user_id: uni.getStorageSync("userId"),
              id: this.id
            }).then(res => {
              if (res.data.code === '200') { // 嘉兴活动
                
                  // if (res.data.data.type === 26) { // 俱乐部
                  //   this.$router.push({name: 'EnrollClub', params: {id: this.$route.params.id}})
                  // } else if (res.data.data.type === 27) { // 活动
                  //   // if (res.data.club_info.length) { // 有俱乐部跳转
                  //   this.$router.push({name: 'EnrollActivity', params: {id: this.$route.params.id}})
                   
                  // }
                
              } else if (res.data.code === '1091') { // 非嘉兴活动
			    Dialog.confirm({
			      title: '提示',
			      message: '确定要报名吗？',
			      confirmButtonText:'确定'
			    }).then(() => {
			    	this.$api.activity_apply({
			    	  token: uni.getStorageSync("token"),
			    	  user_id: uni.getStorageSync("userId"),
			    	  id: this.id
			    	}).then(res => {
			    	  if (res.data.code === '200') {
			    	    uni.showToast({
			    	        title: res.data.msg,
			    	        mask: "true",
			    	    	icon:'none'
			    	    });
			    	    this.getData()
			    	  } else {
			    	    uni.showToast({
			    	        title: res.data.msg,
			    	        mask: "true",
			    	    	icon:'none'
			    	    });
			    	  }
			    	})
			    }).catch(() => {
			      // on cancel
			    });
                
              }
            })
          } else {
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
          }
        } else {
          uni.navigateTo({
          	url:'../../pages/PersonalIdcard/PersonalIdcard'
          })
        }
      } else {
		  uni.clearStorageSync()
		  uni.showToast({
		      title: '您还未登录，请登录',
		      mask: "true",
		  	icon:'none'
		  });
		  uni.reLaunch({
		  	url: '../../pages/login/login'
		  })
      }
    },
    touchin (item) {
      if (item.user_id == Number(uni.getStorageSync("userId"))){
			Dialog.confirm({
			  title: '提示',
			  message: '确定要删除吗？'
			  
			}).then(() => {
				console.log(item)
				this.$api.NewsUserDynamicsCommentsDel({
				  token: uni.getStorageSync("token"),
				  user_id: uni.getStorageSync("userId"),
				  id: item.id
				}).then(res => {
					uni.showToast({
					    title: res.data.msg,
					    mask: "true",
						icon:'none'
					});
				  if (res.data.code === '200') {
				    
				    this.getComment()
				  }
				})
				
			}).catch(() => {
			  // on cancel
			});
      }
      
    },

    
    my_info (item) {
      if (uni.getStorageSync("userId")) {
        
		uni.navigateTo({
			url:'../../pagesMy/MyInfo/MyInfo?id='+item.user_id
		})
      } else {
        uni.clearStorageSync()
        uni.showToast({
            title: '请登录',
            mask: "true",
        	icon:'none'
        });
        
        uni.reLaunch({
        	url: '../../pages/login/login'
        })
      }
    },
    cancel () {
		Dialog.confirm({
		  title: '提示',
		  message: '确定要取消报名吗？',
		  confirmButtonText:'确定'
		}).then(() => {
			this.$api.cancel_activity_apply({
			  token: uni.getStorageSync("token"),
			  user_id: uni.getStorageSync("userId"),
			  id: this.id
			}).then(res => {
			  if (res.data.code === '200') {
			    uni.showToast({
			        title: res.data.msg,
			        duration: 2000,
			    	icon:'none'
			    });
			    this.getData()
			  }
			})
		}).catch(() => {
		  // on cancel
		});
     
    }
  }
}
</script>

<style>
   @import url("./index.css");
  .content{
    background: #fafafa;
    padding-bottom: 44px;
  }
  .activityCon .activitylist view .det .number image{
    width: 10px;
  }
  .price text{
    font-size: 20px;
    color: #de4141;
  }
  .activityCon{
    background: #fff;
    position: relative;
    height: auto;
  }
  .activitylist view .title{
    font-size: 15px;
    line-height: 24px;
    color: #333;
    padding-right: 20px;
    position: relative;
  }
  .activitylist view .title .state{
    position: absolute;
    right:0;
    top:0;
    padding: 0!important;
    background: none!important;
  }
  .activitylist view .title .state image{
    width: 22px;
    height: 41px;
    display: block;
  }
  .astatus{
  	width: 20px;
  	height: 54px;
  	font-size: 12px;
  	line-height: 16px;
  	text-align: center;
  	color: #fff;
  	position: absolute;
  	right: 3%;
  	top: 0;
  }
</style>

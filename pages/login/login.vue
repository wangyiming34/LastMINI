<template>
	<view class=" content scroll">
	    <view class="loginNewCon">
	      <view class="logo">
	        <image src="/static/img/logo.png" alt="logo">
	      </view>
	      <view class="login_tab">
	        <view class="tab_menu flex">
	          <view v-for="(item, index) in tab" :key="index" :class="{'active': current === index}" @click="way(index)">{{item}}</view>
	        </view>
	        <view class="login_text flex">
	          <view class="loc_num flex align-center justify-center" @click="chooseLocation">
	            <view class="num">+{{num}}</view>
	            <view class="caret"></view>
	          </view>
	          <input type="number" placeholder="输入手机号码" v-model="phone">
	        </view>
	        <view class="login_text flex align-center justify-center" v-if="current === 0">
	          <input type="number" placeholder="验证码" v-model="code">
	          <view class="btn flex align-center justify-center"><get-code @click.native="getCode" ref="get_code"></get-code></view>
	        </view>
	        <view class="login_text flex justify-between align-center" v-if="current === 1" >
	          <input :type="passwordType" v-model="password" placeholder="请输入密码"
	                 maxlength="20" minlength="6" required="required" class="password">
	          <view class="pass_icon"  @tap="changeType">
	            <image :src="passwordType == 'password'?'https://web.detion.com/static/img/hide_pass.png':'https://web.detion.com/static/img/show_pass.png'" class="hide_icon" style="width: 34upx;height: 20upx;">
	          </view>
	        </view>
	        <view class="login_sub">
	          <button  class="submit" @click="login">登录</button>  
	        </view>
			<!-- <button  class="submit1" @click="login1">测试登录</button> -->
	        <view class="loginTips" v-if="current === 0">未注册手机验证号直接登录</view>
	        <view class="loginTips" v-if="current === 1" style="text-align: center" @click="go_forget()">
	          <view>忘记密码?</view>
	        </view>
	        <view class="weChatLogin">
	          <!-- <view class="btn" @click="login_wechat"></view> -->
			  <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
	        </view>
	        <view class="loginTips">登录即表示同意
			<text @click="protocol">《注册协议》</text>和<text @click="privacy">《隐私政策》</text>
			
			</view>
			<view class="">
				<van-dialog
				  title="注册协议"
				  confirm-button-text="确定"
				  :show="show"
				  :message="message"
				  @confirm="showone()"
				>
				</van-dialog>
				<van-dialog
				  title="隐私策略"
				  confirm-button-text="确定"
				  :show="showtwo"
				  :message="message1"
				  @confirm="show1()"
				>
				</van-dialog>
			</view>
			
	      </view>
	    </view>
		
	  </view>
	
</template>

<script>
	import GetCode from '../../common/getCode.vue'
	const app = getApp().globalData
	export default {
		components: {
			GetCode,
		},
		data() {
			return {
				  tab: ['验证码登录', '密码登录'],
				  current: 0, // 当前状态0是验证码登录，1是密码登录
				  passwordType: 'password', // 密码类型
				  password: '', // 密码
				  phone: '', // 手机号
				  code: '', // 验证码
				  appid: 'wxf96de80f86c7cb7a',
				  isSetPass: 0,
				  wechat_info: {},
				  is_set_acc: 0 ,// 0未绑定 1已绑定
				  num:0,
				  isShow:false,
				  // 弹出层
				  show:false,
				  showtwo:false,
				  // 注册协议弹出消息
				  message:"",
				  message1:"",
				  // 微信code
				  wxcode:'',
				  nickname:'',
				  sex:0,
				  headimgurl:'',
				  openid:'',
				  unionid:'',
				  pid:''
				  
			}
		},
		onLoad(e) {
			if(e.userId){
				this.pid = e.userId
				uni.setStorageSync('pid',e.userId)
				// console.log(this.pid)
				// console.log(uni.getStorageSync('pid'))
			}
		},
		onShow() {
			uni.hideShareMenu();
			this.num = app.num
			this.getMessage()
			this.getMessage1()
		},
		methods: {
			// 微信登录
			wechat_login () {
			      this.$api.third_detion({
			        openid: this.openid,
			        unionid: this.unionid,
			        nickname: this.nickname,
			        sex: this.sex,
			        headimgurl: this.headimgurl
			      }).then(res => {
			        if (res.data.code === '200') {
			          this.is_set_acc = res.data.data.is_set_acc
			          if (this.is_set_acc === 0) {
						uni.reLaunch({
							url:'/pagesMy/WechatBind/WechatBind'
						})
			          } else if (this.is_set_acc === 1) {
			            this.isSetPass = res.data.data.is_set_pass // 是否设置过密码
						// 存 token
						uni.setStorageSync("token",res.data.data.userinfo.token)
						// 存是不是vip
						uni.setStorageSync("isVip",res.data.data.userinfo.is_vip)
						// 存userid
						uni.setStorageSync("userId",res.data.data.userinfo.user_id)
						// 存时间
						uni.setStorageSync("expiretime",res.data.data.userinfo.expiretime)
						// 存vip到期时间
						uni.setStorageSync("vipEnd",res.data.data.userinfo.vip_ended_at)
						// 存是不是加入了俱乐部
						uni.setStorageSync("isJoin",res.data.data.is_join)
						// 存是不是设置了个人信息
						uni.setStorageSync("setInfo",res.data.data.is_set_info)
			            if (this.isSetPass === 0) {
			              // 未设置密码---去设置密码
			              uni.redirectTo({
			                  url:'/pages/setPassword/setPassword?state=0&number=' + res.data.data.userinfo.username + '&code=0'
			              });
			            } else if (this.isSetPass === 1) {
							
			                if (uni.getStorageSync('path')) {
								// 是正常页面
			                  if(uni.getStorageSync('path').indexOf('/pages/information')==-1||uni.getStorageSync('path').indexOf('/pages/index')==-1||uni.getStorageSync('path').indexOf('/pages/service')==-1||uni.getStorageSync('path').indexOf('/pages/my')==-1){
								  uni.reLaunch({
								  	url:uni.getStorageSync('path')
								  })
							  }else{
								  // TabBar界面
								  uni.switchTab({
								  	url:uni.getStorageSync('path')
								  })
							  }
							  this.$nextTick(function(){
							  	uni.removeStorageSync('path')
							  })
			                } else {
			                  uni.switchTab({
			                      url: '/pages/index/index'
			                  });
			                }
			            }
			          }
			        }
			      })
			},
			// 微信授权
			getUserInfo(e){
				var that  =  this
				if(e.detail.errMsg=='getUserInfo:ok'){
					this.nickname = e.detail.userInfo.nickName
					this.sex = e.detail.userInfo.gender
					this.headimgurl = e.detail.userInfo.avatarUrl
					uni.showLoading({
					    title: '登陆中',
						mask:"true"
					});
					uni.login({
					  provider: 'weixin',
					  success: function (loginRes) {
						that.wxcode = loginRes.code
						if(loginRes.errMsg ==="login:ok"){
							that.$api.Wechataction({
								code:that.wxcode
							}).then(res=>{
								uni.hideLoading();
								
								if(res.data.code=='200'){
									uni.showToast({
									    title: '登录成功',
									    mask: "true",
										icon:'none'
									});
									that.unionid = res.data.data.unionid
									that.openid = res.data.data.openid
									uni.setStorageSync('unionid',res.data.data.unionid)
									that.$nextTick(()=>{
										that.wechat_login()
									})
								}else{
									uni.showToast({
									    title: res.data.msg,
									    mask: "true",
										icon:'none'
									});
								}
							})
							
						}
					  }
					});
				}else{
					uni.showToast({
					    title: '您拒绝了授权',
					    duration: 1000,
						icon:"none"
					});
				}
			    
				
			},
			// 登录
			login1(){
				uni.reLaunch({
					url:'../PersonalIdcard/PersonalIdcard'
				});
			},
			login () {
			      if (this.current === 0) { // 验证码登录
			        if (this.phone.length && this.phone.trim().length && this.code.length && this.code.trim().length) {
			          uni.showLoading({
			              title: '登陆中'
			          });
			          // 验证码登录
			          this.$api.mobilelogin({
			            mobile: this.phone,
			            captcha: this.code,
			            pid: Number(this.pid)
			          }).then(res => {
						
			            uni.hideLoading();
			            uni.showToast({
			                title: res.data.msg,
			                duration: 1000,
							icon:"none"
			            });
			            if (res.data.code === '200') {
			              // 登录成功
			              this.isSetPass = res.data.data.is_set_pass // 是否设置过密码
						  // 存 token
						  uni.setStorageSync("token",res.data.data.userinfo.token)
						  // 存是不是vip
						  uni.setStorageSync("isVip",res.data.data.userinfo.is_vip)
						  // 存userid
						  uni.setStorageSync("userId",res.data.data.userinfo.user_id)
						  // 存时间
						  uni.setStorageSync("expiretime",res.data.data.userinfo.expiretime)
						  // 存vip到期时间
						  uni.setStorageSync("vipEnd",res.data.data.userinfo.vip_ended_at)
						  // 存是不是加入了俱乐部
						  uni.setStorageSync("isJoin",res.data.data.is_join)
						  // 存是不是设置了个人信息
						  uni.setStorageSync("setInfo",res.data.data.is_set_info)
			              
			              if (this.isSetPass === 0) {
			                // 未设置密码---去设置密码
			                // this.$router.push({name: 'SetPassword', params: {state: 0, number: this.phone, code: 0}})
							uni.navigateTo({
							    url:'/pages/setPassword/setPassword?state=0&number=' + this.phone + '&code=0'
							});
			              } 
						  else if (this.isSetPass === 1) {   //设置了密码
								if (uni.getStorageSync('path')) {
									// 是正常页面
								  if(uni.getStorageSync('path').indexOf('/pages/information')==-1||uni.getStorageSync('path').indexOf('/pages/index')==-1||uni.getStorageSync('path').indexOf('/pages/service')==-1||uni.getStorageSync('path').indexOf('/pages/my')==-1){
									  uni.reLaunch({
										url:uni.getStorageSync('path')
									  })
								  }else{
									  // TabBar界面
									  uni.switchTab({
										url:uni.getStorageSync('path')
									  })
								  }
								  this.$nextTick(function(){
								  	uni.removeStorageSync('path')
								  })
								} else {
								  uni.switchTab({
									  url: '/pages/index/index'
								  });
								}
			                
			              }
			            }
			          })
			        } else if (this.phone.length === 0 || this.phone.trim().length === 0) {
			          uni.showToast({
			              title: "手机号不能为空",
						  icon:'none',
			              duration: 1000
			          });
			        } else if (this.code.length === 0 || this.code.trim().length === 0) {
			          uni.showToast({
			              title: "验证码不能为空",
						  icon:'none',
			              duration: 1000
			          });
			        }
			      } 
				  else if (this.current === 1) { // 密码登录

			        if (this.phone.length && this.phone.trim().length && this.password.length && this.password.trim().length) {
			          uni.showLoading({
			              title: '登陆中'
			          });
			          this.$api.UserLogin({
			            account: this.phone,
			            password: this.password
			          }).then(res => {
						  // console.log(res)
			            uni.hideLoading();
			            uni.showToast({
			                title: res.data.msg,
			            	icon:'none',
			                duration: 1000
			            });
			            // 登录失败信息
			            if (res.data.code === '200') {
			              // 登录成功
						  // 存 token
						  uni.setStorageSync("token",res.data.data.userinfo.token)
						  // 存是不是vip
						  uni.setStorageSync("isVip",res.data.data.userinfo.is_vip)
						  // 存userid
						  uni.setStorageSync("userId",res.data.data.userinfo.user_id)
						  // 存时间
						  uni.setStorageSync("expiretime",res.data.data.userinfo.expiretime)
						  // 存vip到期时间
						  uni.setStorageSync("vipEnd",res.data.data.userinfo.vip_ended_at)
						  // 存是不是加入了俱乐部
						  uni.setStorageSync("isJoin",res.data.data.is_join)
						  // 存是不是设置了个人信息
						  uni.setStorageSync("setInfo",res.data.data.is_set_info)
			              if (uni.getStorageSync('path')) {
			              	// 是正常页面
			                if(uni.getStorageSync('path').indexOf('/pages/information')==-1||uni.getStorageSync('path').indexOf('/pages/index')==-1||uni.getStorageSync('path').indexOf('/pages/service')==-1||uni.getStorageSync('path').indexOf('/pages/my')==-1){
			              	  uni.reLaunch({
			              	  	url:uni.getStorageSync('path')
			              	  })
							  
			                }else{
			              	  // TabBar界面
			              	  uni.switchTab({
			              	  	url:uni.getStorageSync('path')
			              	  })
			                }
							this.$nextTick(function(){
								uni.removeStorageSync('path')
							})
			              } else {
			                uni.switchTab({
			                    url: '/pages/index/index'
			                });
			              }
			            }
			          })
			        } else if (this.phone.length === 0 || this.phone.trim().length === 0) {
					  uni.showToast({
					      title: "手机号不可为空",
					  	  icon:'none',
					      duration: 1000
					  });
			        } else if (this.password.length === 0 || this.password.trim().length === 0) {
					  uni.showToast({
					      title: "密码不可为空",
					  	  icon:'none',
					      duration: 1000
					  });
			        } else if (this.password.length >= 20 || this.password.length < 6) {
						uni.showToast({
						    title: "密码长度在6-20位",
							icon:'none',
						    duration: 1000
						});
			        }
			      }
			    },
			
			// 获取验证码
			getCode () {
			      if (this.phone.length && this.phone.trim().length) {
					  
			        if (this.$refs.get_code.msg === '获取验证码') {
			          this.$api.Sms({
			            mobile: this.phone,
			            coucode: app.num,
			            event: 'mobilelogin_detion'
			          }).then(res => {
						  // console.log(res)
			            if (res.data.code === '200') {
			              this.$refs.get_code.startCount()
						  uni.showToast({
						      title:res.data.msg ,
						      icon: 'none',
						      mask: true
						  });	
			            } else {
						  uni.showToast({
						      title:res.data.msg ,
						      icon: 'none',
						      mask: true
						  });	
			            }
			          })
			        }
			      } else {
			        uni.showToast({
			            title: '手机号码不能为空',
			            icon: 'none',
			            mask: true
			        });	
			      }
			    },
			// 切换选卡
			way(index){
				this.current = index
			},
			// 改变密码显示隐藏
			changeType () {
				  // console.log(123)
			      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
			    },
			// 号码归属地
			chooseLocation(){
				uni.navigateTo({
					url: '../../pages/phone/phone'
				})
			},
			// 忘记密码
			go_forget(){				
				uni.navigateTo({
				    url: '../ForgetPass/ForgetPass'
				})
			},
			// 弹出层 注册协议
			showone(){
				this.show = !this.show
			},
			show1(){
				this.showtwo = !this.showtwo
			},
			protocol(){
				this.show = !this.show
			},
			getMessage(){
				this.message="注册协议,德申商务社交服务用户协议欢迎您使用德申商务社交服务平台及服务！在您（即“用户”）使用北京德申科技股份有限公司（以下简称“德申科技”）创建、管理、运营的“全球商务社交信息科技服务平台”（以下简称“德申汇”）前，请您仔细阅读、并充分理解《德申商务社交服务用户协议》（以下简称“本协议”）的各条款内容。本协议内容同时包括德申科技可能不断发布的关于德申汇及相关服务有关的协议、业务规则等内容，上述内容一经正式发布，即为本协议不可分割的组成部分。只要您继续使用德申汇及服务，即视为您接受相关新修订、更新的协议内容。如果您对本协议的任何条款表示异议，您可以选择不进入德申汇。当您完成申请和注册，无论是进入德申汇，还是以后在德申汇上发布任何内容（即“内容”），均意味着您（即“用户”）完全接受本协议项下的全部条款。德申汇的管理和运营权归北京德申科技股份有限公司所有，本协议中提及的德申汇和北京德申科技股份有限公司，视为同一个主体。一、服务说明1.德申汇是一个商务信息分享、传播及获取的科技服务平台。2.除非本服务条款另有其他明示规定，增加或强化目前本服务的任何新功能，包括所推出的新产品，均受到本服务条款之规范。3.您了解并同意，本服务仅依其当前所呈现的状况提供，对于任何用户通讯或个人化设定之时效、删除、传递错误、未予储存或其他任何问题，德申汇均不承担任何责任。二、遵守法律1.您同意遵守《中华人民共和国合同法》、《中华人民共和国著作权法》、《中华人民共和国保守国家秘密法》、《中华人民共和国电信条例》、《中华人民共和国计算机信息系统安全保护条例》、《中华人民共和国计算机信息网络国际联网管理暂行规定》、《计算机信息系统国际联网保密管理规定》、《互联网信息服务管理办法》、《计算机信息网络国际联网安全保护管理办法》、《互联网电子公告服务管理规定》等相关中国法律法规的任何及所有的规定，并对以任何方式使用您的密码和您的帐号使用本服务的任何行为及其结果承担全部责任。2.在任何情况下，如果德申汇有理由认为您的任何行为，包括但不限于您的任何言论和其他行为违反或可能违反上述法律和法规的任何规定，德申汇可在任何时候不经任何事先通知终止向您提供服务。三、用户资格1.德申汇实行申请制、推荐制、邀请制、实名制、会员制、收费制的会员制度。2.申请人提交资料经德申汇审核通过并交纳用户服务费用后，即成为德申汇正式用户。3.用户不能同时拥有超过一个的有效帐户，用户不可出售、转卖、转让您的德申汇帐户至其它第三方。如果您不符合资格，您将被禁止使用德申汇服务。四、使用规则1.德申汇服务的使用由本服务条款所监控。2.用户在申请使用德申汇的网络服务时，同意依注册要求使用实名注册及提供本人真实、正确、最新及完整的资料（以下简称“注册资料”）。3.若你提供任何错误、不实的资料或者在个人资料中发布广告、不严肃内容及无关信息，德申汇有权暂停或终止你的帐号，并拒绝你使用本服务之全部或任何部分。4.用户一旦注册成功，即成为德申汇的合法用户，德申汇将给予每个用户一个用户帐号及相应的密码。5.用户有责任维护个人帐号和密码的保密性和安全性，用户应当对以其用户帐号进行的所有活动和事件负法律责任。6.用户若发现帐号和密码遭到未获授权的使用，或发生其他任何安全漏洞问题时，应立即通告德申汇。7.如果用户在使用网络服务时违反上述规则而产生的任何损失或损害，德申汇不承担任何责任。五、用户行为1.用户在申请使用德申汇服务时，必须提供真实的个人资料。2.用户在使用德申汇服务过程中，必须遵循国家的相关法律法规，不得利用德申汇平台，发布危害国家安全、色情、暴力等非法内容；不得利用德申汇平台发布含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、或其它道德上令人反感的内容。3.用户使用本服务的行为若有任何违反国家法律法规或侵犯任何第三方的合法权益的情形时，德申汇有权直接删除该等违反规定之内容。4.除非与德申汇单独签订合同，否则不得将社区用于商业目的。5.不可以通过自动方式创建账户，也不可以对账户使用自动系统执行操作。6.用户影响系统总体稳定性或完整性的操作可能会被暂停或终止，直到问题得到解决。六、国际使用1.了解到互联网的无国界性，你同意遵守当地所有适用的法规，包括但不限于关于网上行为及内容发布之法律法规。您特别同意遵守有关从中国或您所在国家或地区输出技术数据之传输的所有适用法律法规。2.在本服务条款中，“本服务公开使用区域”系指一般用户可以使用的区域。3.您同意已就您于本服务公开使用区域及本服务其他任何公开使用区域张贴之内容，授予德申汇免许可费、永久有效、非独家及可完全再授权之权利。4.任何经由本服务以上载、张贴、发送电子邮件或任何其他方式传送的资讯、资料、文字、软件、音乐、音讯、照片、图形、视讯、信息或其他资料（以下简称“内容”），无论是公开还是私下传送，均由内容提供者承担责任。七、用户的隐私保护1.尊重用户个人隐私信息的私有性是德申汇的一贯制度，德申汇将通过技术手段、强化内部管理等办法充分保护用户的个人隐私信息。2.为了运营和改善德申汇的技术与服务，德申汇将可能会自行收集使用或向第三方提供用户的非个人隐私信息，这将有助于知乎向用户提供更好的用户体验和服务质量。3.德申汇保证不对外公开或向第三方透露用户个人隐私信息，或用户在使用服务时存储的非公开内容。但下列情况除外：3.1你同意让第三方共享资料；3.2你同意公开你的个人资料，享受为你提供的产品和服务；3.3需要听从法律命令或遵循法律程序。3.4具体细则请见——隐私声明【德申汇隐私声明】八、服务变更、中断或终止1.如因系统维护或升级的需要而需暂停网络服务、服务功能的调整，德申汇将尽可能事先在网站上进行通告。2.如发生下列任何一种情形，德申汇有权单方面中断或终止向用户提供服务而无需通知用户：2.1用户提供的个人资料不真实；2.2用户违反本服务条款中规定的使用规则；2.3未经德申汇同意，将德申汇平台用于商业目的。九、服务条款的完善和修改1.德申汇会有权根据互联网的发展和中华人民共和国有关法律、法规的变化，或者因业务发展需要，不时地完善和修改德申汇服务条款。2.一旦本协议的内容发生变动，德申汇将会直接在德申汇上公布修改之后的协议内容，该公布行为视为德申汇已经通知用户修改内容。3.德申汇也可采用电子邮件或私信的传送方式，提示用户协议条款的修改、服务变更、或其它重要事项。当发生有关争议时，将以最新的服务条款为准。十、特别约定1.用户使用本服务的行为若有任何违反国家法律法规或侵犯任何第三方的合法权益的情形时，德申汇有权直接删除该等违反规定之信息，并可以暂停或终止向该用户提供服务。2.若用户利用本服务从事任何违法或侵权行为，由用户自行承担全部责任，因此给德申汇或任何第三方造成任何损失，用户应负责全额赔偿。3.退费条款：自用户交纳服务费用之日起7日内，未开具正式发票的，可申请全额退费；如开具发票后要求退费，30天内可退服务费的60%;超过30天的，不予退费。十一、德申商标信息1.德申的文字、标志、以及其他德申的产品、服务名称，均为北京德申科技股份有限公司之商标（以下简称“德申标识”）。2.未经德申汇事先书面同意，您同意不将德申标识以任何方式展示或使用或作其他处理，或表示你有权展示、使用或另行处理德申标识，包括但不限于进行聚会、组织、招生、招商、经营等一切盈利和非盈利的活动。十二、本协议的效力1.本协议由德申科技制定，最终解释权归本公司所有。2.本协议中的任何条款无效不影响本协议其余条款的法律效力，该无效条款应该根据有利于协议成立、公平合理的定约意思被重新补充修缮。3.当您在使用德申汇提交注册申请并点击“我已阅读并同意用户协议”时，本协议生效。十三、消息及通知的推送1.本协议项下德申汇对您所有的通知均可通过本软件消息推送、电子邮件、手机短信、常规信件等方式进行。德申汇可选择其中任何一种方式通知您，该通知于发送之日视为已送达您，您知悉并接受通知之内容。2.您如有任何事宜需通知德申汇，应当通过德申汇对外正式公布的通信地址、传真号码、电子邮件地址等方式进行联系及送达。3.您在享受德申汇各类服务的同时，同意接受德申汇提供的各类信息服务，这些信息所涉及的内容包括以文字、图片、照片、音视频形式表现的各类法律咨询服务信息、宣传信息、促销信息、商业信息以及德申汇合作伙伴的信息，该类信息的提供方式包括但不限于短信息、电子邮件、手机客户端推送。您在德申汇注册或使用德申汇服务时，即表明您已同意接受此项服务。若您不希望接收来自德申汇的信息，则可通过电话方式联系德申汇客户服务部门协助处理。十四、法律适用及争议解决1.本协议的订立、执行、解释及发生相关的所有纠纷、争议的解决均适用中国现行法律。2.因本协议发生的任何纠纷，双方应尽力协商一致解决。如协商不成的，任何一方可向北京德申科技股份有限公司住所地的人民法院提起诉讼。北京德申科技股份有限公司二〇一八年二月六日"
		    },
			privacy(){
				this.showtwo = !this.showtwo
			},
			getMessage1(){
				this.message1="'隐私政策','本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。'1.适用范围'(a)在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；'(b)在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；'(c)本应用通过合法途径从商业伙伴处取得的用户个人数据。'您了解并同意，以下信息不适用本隐私权政策：'(a)您在使用本应用平台提供的搜索服务时输入的关键字信息；'(b)本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；'(c)违反法律规定或违反本应用规则行为及本应用已对您采取的措施。'2.信息使用'(a)本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。'(b)本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。'(c)为服务用户的目的，本应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本应用合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。'3.信息披露'在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：'(a)经您事先同意，向第三方披露；'(b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；'(c)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；'(d)如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；'(e)如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；'(f)在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。'(g)其它本应用根据法律、法规或者网站政策认为合适的披露。'4.信息存储和交换'本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。'5.Cookie的使用'(a)在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。'(b)您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。'(c)通过本应用所设cookies所取得的有关信息，将适用本政策。'6.信息安全'(a)本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。'(b)在使用本应用网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对'7.本隐私政策的更改'(a)如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。'(b)本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。'为防止向第三方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。"
			},
	  }
	}
</script>

<style>
	@import url("./login.css");
	view{
		box-sizing: content-box;
	}
</style>

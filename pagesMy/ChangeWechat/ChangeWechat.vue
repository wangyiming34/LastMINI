<template>
	<view class="ChangePassword">
		
		<view class="flex new-b re tel align-center justify-between">
			<input type="number" placeholder="请输入验证码" v-model="code" placeholder-style="color:rgba(223,223,223,1)" />
			<van-icon name="clear" color="#cccccc" @click="del"/>
		</view>
		
		<view class="exit" @click="ok">
			绑定
		</view>

	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				  code: '', // 微信号码
				  defaultCode:'', //默认绑定的微信号
			}
		},
	
		onShow() {
			this.getData()
		},
		methods: {
			// 获取微信默认的绑定
			 getData () {
			      this.$api.WechatDefault({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId")
			      }).then(res => {
					  console.log(res)
			        if (res.data.code === '200') {
			          this.code = res.data.data
			          this.defaultCode = res.data.data
			        } else if (res.data.code !== '200') {
			          uni.showToast({
			              title: res.data.msg,
			              duration: 2000,
						  icon:'none'
			          });
			          if (res.data.code === '1000') {
			            uni.clearStorageSync()
			            uni.reLaunch({
			            	url: '../../pages/login/login'
			            })
			          }
			        }
			      })
			    },
			// 点击删除
			del(){
				this.code = ''
			},
			ok () {
			      if (this.code.length && this.code.trim().length) {
			        if (this.code === this.defaultCode) {
			          uni.showToast({
			              title:'微信号未更新' ,
			              icon: 'none',
			              mask: true
			          });	
			        } else {
			          this.$api.SetWechat({
			            token: uni.getStorageSync("token"),
			            user_id: uni.getStorageSync("userId"),
			            wechat_no: this.code
			          }).then(res => {
			            console.log(res)
			            uni.showToast({
			                title:res.data.msg ,
			                icon: 'none',
			                mask: true
			            });	
			            if (res.data.code === '200') {
			              uni.navigateBack();
			            }
			          })
			        }
			      } else {
			       uni.showToast({
			           title:'微信号不可为空' ,
			           icon: 'none',
			           mask: true
			       });	
			      }
			    }
				
		
		
		}
	}
</script>

<style>
	@import url("./ChangeWechat.css");
</style>

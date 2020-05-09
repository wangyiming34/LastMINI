<template>
	<view class="wrap1">
		<view class="type flex align-center">
			<view class="blueShu">
				
			</view>
			<view class="type1">
				发票类型
			</view>
		</view>
		
		<view class="tab flex align-center justify-between">
			<!-- :class="{'active':index==n}" -->
			<view v-for="(item,index) in tabList" :key="index" class="tabfor" :class="index==n?'active':''" @click="tab(index)">
				{{item}}
			</view>
		</view>
		
		<view class="type flex align-center">
			<view class="blueShu">
				
			</view>
			<view class="type1">
				发票信息
			</view>
		</view>
		
		<!-- 填写信息 -->
		<view class="content">
			<view class="contentwrap flex border-bottom-new2 align-center">
				<view class="title">
					发票金额
				</view>
				<view class="red">
					￥{{price}}
				</view>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					<view class="star ab">
						*
					</view>
					发票抬头
				</view>
				<input type="text" placeholder="请输入企业简介" v-model.trim="company_name" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					<view class="star ab">
						*
					</view>
					税号
				</view>
				<input type="text" placeholder="请输入税号" v-model.trim="taxes_code" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					企业地址
				</view>
				<input type="text" placeholder="请输入企业地址" v-model.trim="company_address" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					企业账号
				</view>
				<input type="text" placeholder="请输入企业账号" v-model.trim="company_account" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					开户行
				</view>
				<input type="text" placeholder="请输入开户行" v-model.trim="company_bank" class="ipt" placeholder-class="ipt1"/>
			</view>
		</view>
		
		<view class="type flex align-center">
			<view class="blueShu">
				
			</view>
			<view class="type1">
				接收方式
			</view>
		</view>
		
		<view class="content" v-if="n==0">
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					<view class="star ab">
						*
					</view>
					电子邮件
				</view>
				<input type="text" placeholder="请输入电子邮件" v-model.trim="email" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			
		</view>
		
		<view class="content" v-if="n==1">
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					<view class="star ab">
						*
					</view>
					收件人
				</view>
				<input type="text" placeholder="请输入收件人" v-model.trim="recipient" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					<view class="star ab">
						*
					</view>
					联系电话
				</view>
				<input type="text" placeholder="请输入联系电话" v-model.trim="mobile" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					<view class="star ab">
						*
					</view>
					邮寄地址
				</view>
				<input type="text" placeholder="请输入邮寄地址" v-model.trim="send_address" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			
		</view>
		
		<view class="wrapbottom">
			<view class="wrapbottomtitle">
				温馨提示：<text class="rred">*</text>为必填项
			</view>
			
			<view class="queding" @click="submit">
				提交
			</view>
		</view>
		
		<van-popup
		  :show="show"
		  closeable
		  position="bottom"
		  @close='close'
		  custom-class="po"
		  overlay='true'
		>
			<view class="" style="overflow: hidden;">
				<view class="poptitle border-bottom-new2">
					开具电子发票
				</view>
				<view class="aaaa flex align-center border-bottom-new2">
					<text class="aa">发票抬头</text>
					<text class="bb">{{company_name}}</text>
				</view>
				<view class="aaaa flex align-center border-bottom-new2">
					<text class="aa">税号</text>
					<text class="bb">{{taxes_code}}</text>
				</view>
				<view class="aaaa flex align-center border-bottom-new2">
					<text class="aa">电子邮件</text>
					<text class="bb">{{email}}</text>
				</view>
				<view class="ccc">
					温馨提示：请准确填写开票信息并核实无误后点击提交，如发现信息填写有误请及时联系秘书处，发票已经开出无法更改，感谢您的配合。
				</view>
				
				<view class="dd">
					<view class="ddd" @click="send1">
						确认提交
					</view>
				</view>
			</view>
		</van-popup>
		
		
		<van-popup
		  :show="show1"
		  closeable
		  position="bottom"
		  @close='close'
		  custom-class="po"
		  overlay='true'
		>
			<view class="" style="overflow: hidden;">
				<view class="poptitle border-bottom-new2">
					开具纸质发票
				</view>
				<view class="aaaa flex align-center border-bottom-new2">
					<text class="aa">发票抬头</text>
					<text class="bb">{{company_name}}</text>
				</view>
				<view class="aaaa flex align-center border-bottom-new2">
					<text class="aa">税号</text>
					<text class="bb">{{taxes_code}}</text>
				</view>
				<view class="aaaa flex align-center border-bottom-new2">
					<text class="aa">收件人</text>
					<text class="bb">{{recipient}}</text>
				</view>
				<view class="aaaa flex align-center border-bottom-new2">
					<text class="aa">联系电话</text>
					<text class="bb">{{mobile}}</text>
				</view>
				<view class="aaaa flex align-center border-bottom-new2">
					<text class="aa">邮寄地址</text>
					<text class="bb">{{send_address}}</text>
				</view>
				<view class="ccc">
					温馨提示：请准确填写开票信息并核实无误后点击提交，如发现信息填写有误请及时联系秘书处，发票已经开出无法更改，感谢您的配合。
				</view>
				
				<view class="dd">
					<view class="ddd" @click="send2">
						确认提交
					</view>
				</view>
			</view>
		</van-popup>
		<!-- 提示框 -->
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		data() {
			return {
				id:'',
				price:'',
				tabList:['电子发票','纸质发票'],
				n:0,
				company_name:'',
				taxes_code:'',
				company_address:'',
				company_account:'',
				company_bank:'',
				mobile:'',
				recipient:'',
				send_address:'',
				email:'',
				show:false,
				show1:false
			}
		},
		onLoad(e) {
			this.id = e.id
			this.price = e.price
		},
		methods: {
			send2(){
				this.$api.apply_invoice({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					order_id:this.id,
					company_name:this.company_name,
					taxes_code:this.taxes_code,
					company_address:this.company_address,
					company_account:this.company_account,
					company_bank:this.company_bank,
					send_address:this.send_address,
					recipient:this.recipient,
					mobile:this.mobile,
					invoice_money:this.price
				}).then(res=>{
					Toast(res.data.msg)
					if(res.data.code=="200"){
						setTimeout(function() {
							uni.redirectTo({
							    url: '../../pagesThree/InvoiceSubmit/InvoiceSubmit'
							});
						}, 1000);
					}
				})
			},
			send1(){
				// uni.redirectTo({
				//     url: '../../pagesThree/InvoiceSubmit/InvoiceSubmit'
				// });
				this.$api.apply_invoice_electronic({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					order_id:this.id,
					company_name:this.company_name,
					taxes_code:this.taxes_code,
					company_address:this.company_address,
					company_account:this.company_account,
					company_bank:this.company_bank,
					email:this.email,
					invoice_money:this.price
				}).then(res=>{
					Toast(res.data.msg)
					if(res.data.code=="200"){
						setTimeout(function() {
							uni.redirectTo({
							    url: '../../pagesThree/InvoiceSubmit/InvoiceSubmit'
							});
						}, 1000);
					}
				})
			},
			tab(index){
				this.n = index
			},
			submit(){
				if(this.n==0){
					var that = this	      
					if (this.company_name && this.taxes_code && this.email) {
						this.show = true
					} else {
					    if (!this.company_name) {
					      Toast('发票抬头没有填写')
					    return
					  }
						if (!this.taxes_code) {
						  Toast('税号没有填写')
						  return
						}
						if (!this.email) {
						  Toast('邮箱没有填写')
						  return
						}
					}
				}else{
					if (this.company_name && this.taxes_code && this.recipient && this.mobile && this.send_address) {
						this.show1 = true
					} else {
					    if (!this.company_name) {
					      Toast('发票抬头没有填写')
					    return
					  }
						if (!this.taxes_code) {
						  Toast('税号没有填写')
						  return
						}
						if (!this.recipient) {
						  Toast('收件人没有填写')
						  return
						}
						if (!this.mobile) {
						  Toast('联系电话')
						  return
						}
						if (!this.send_address) {
						  Toast('邮寄地址')
						  return
						}
					}
				}
			},
			close(){
				this.show = false
				this.show1 = false
			}
		}
	}
</script>

<style>
	@import url("./ApplyInvoice.css");
</style>

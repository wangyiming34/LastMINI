<template>
	<view class="wrap1">
		<view class="new" :class="state=='APPLY'?'newa':state=='FINISHED'?'newf':state=='REFUNDED'?'newr':''">
			{{state=="APPLY"?'开票中':state=="FINISHED"?'开票完成':state=="REFUNDED"?'开票驳回':''}}
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
					
					发票抬头
				</view>
				<input  disabled type="text"  v-model.trim="company_name" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					
					税号
				</view>
				<input  disabled type="text"  v-model.trim="taxes_code" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					企业地址
				</view>
				<input  disabled type="text"  v-model.trim="company_address" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					企业账号
				</view>
				<input  disabled type="text"  v-model.trim="company_account" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					开户行
				</view>
				<input  disabled type="text"  v-model.trim="company_bank" class="ipt" placeholder-class="ipt1"/>
			</view>
		</view>
		
		<view class="type flex align-center">
			<view class="blueShu">
				
			</view>
			<view class="type1">
				接收方式
			</view>
		</view>
		
		<view class="content" v-if="type=='2'">
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					
					电子邮件
				</view>
				<input  disabled type="text"  v-model.trim="email" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			
		</view>
		
		<view class="content" v-if="type=='1'">
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					
					收件人
				</view>
				<input  disabled type="text"  v-model.trim="recipient" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					
					联系电话
				</view>
				<input  disabled type="text"  v-model.trim="mobile" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			<view class="contentwrap flex border-bottom-new2 align-center">
				
				<view class="title re">
					
					邮寄地址
				</view>
				<input  disabled type="text"  v-model.trim="send_address" class="ipt" placeholder-class="ipt1"/>
			</view>
			
			
		</view>
		
		<view class="wrapbottom">
			
		</view>

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
				company_name:'',
				taxes_code:'',
				company_address:'',
				company_account:'',
				company_bank:'',
				mobile:'',
				recipient:'',
				send_address:'',
				email:'',
				type:'',
				state:'',
				created_at:''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getData()
		},
		methods: {
			getData(){
				this.$api.invoice_detail({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					id:this.id
				}).then(res=>{
					this.company_account = res.data.data.company_account
					this.company_address= res.data.data.company_address
					this.company_bank= res.data.data.company_bank
					this.company_name= res.data.data.company_name
					this.created_at= res.data.data.created_at
					this.email= res.data.data.email
					this.price=res.data.data.invoice_money
					this.mobile= res.data.data.mobile
					this.recipient= res.data.data.recipient
					this.send_address= res.data.data.send_address
					this.state= res.data.data.state
					this.taxes_code= res.data.data.taxes_code
					this.type= res.data.data.type
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	@import url("../ApplyInvoice/ApplyInvoice.css");
	@import url("./InvoiceDetail.css");
</style>

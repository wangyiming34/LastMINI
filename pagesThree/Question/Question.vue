<template>
	<view class="wrap1">
		<view class="aaa">
			<view v-for="(item,index) in list" :key="index" class="bbb flex justify-between align-center" :class="index+1 != list.length?'bnew2':''" @click="ques(item.id)">
				<view class="ccc">
					{{item.question}}
				</view>
				<van-icon name="arrow" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			ques(id){
				uni.navigateTo({
					url:'../../pagesThree/QuestionDetail/QuestionDetail?id='+id
				})
			},
			getData(){
				this.$api.faq({
				}).then(res=>{
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import url("./Question.css");
</style>

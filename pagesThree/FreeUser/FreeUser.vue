<template>
  <view  v-if="isFinish"  class="abcwrap">
    <view class="report_title abc">
      <view class="border-bottom title flex align-center justify-between" style="color: #333">合计人数 <view class="number">{{number}}</view></view>
    </view>
    <view class="listCon scroll" ref="list" style="overflow: auto;height: calc(100% - 40px);top:40px">
      <view class="report_list">
        <view class="item flex align-center justify-between" v-for="(item, index) in list" :key="index" @click="FreeDetail(item.city)">
          <view class="text">{{item.city}}</view>
          <view class="text flex align-center">
				<view class="">
					{{item.count}}
				</view>
				<van-icon name="arrow" style="margin-left: 6px;" class="ccc"/>
		  </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

export default {
 
  data () {
    return {
      list: [],
      number: 0,
      isFinish: false
    }
  },
  onLoad () {
    uni.showLoading({
        title: '加载中',
    	mask:"true"
    });
	this.getList()
  },
  methods: {
	  FreeDetail(city){
		  if(city.indexOf('德申')==-1){
			  uni.navigateTo({
			  	url:'../../pagesThree/FreeDetail/FreeDetail?city=其他'
			  }) 
		  }else{
			  uni.navigateTo({
			  	url:'../../pagesThree/FreeDetail/FreeDetail?city='+ city.split('德申')[0]
			  }) 
		  }
	  },
	  getList(){
		  // console.log(123)
		  this.$api.freedom({
		  }).then(res=>{
		  	uni.hideLoading();
			// console.log(res)
			if(res.data.code=="200"){
				this.number = res.data.data.totalCount
				this.list = res.data.data.list
				this.isFinish = true
			}
		  })
		  
	  }
  }
}
</script>

<style>
	@import url("../Report/Report.css");
</style>

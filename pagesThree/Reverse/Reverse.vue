<template>
  <view v-show="isFinish" style="padding-top: 40px;">
    <view class="report_title" style="position: fixed;left: 0;top: 0;width: 100%;">
      <view class="border-bottom title flex align-center justify-between" style="color: #333">预留编号统计 <view class="number">（共预留{{count}}人）</view></view>
    </view>
    <view class="listCon scroll" ref="list" style="overflow: auto;height: calc(100% - 40px);top:40px">
      <view class="report_list">
        <view class="item" v-for="(item, index) in list" :key="index">
          <view class="text number">
            <vip :no="item.no" :type="item.type" v-if="item.no"></vip>
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
      count: 0,
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
	  getList(){
		  // console.log(123)
		  this.$api.reserved_vip_no({
		  
		  }).then(res=>{
		  	uni.hideLoading();
			// console.log(res)
			if(res.data.code=="200"){
				this.count = res.data.data.count
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

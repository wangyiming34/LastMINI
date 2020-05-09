<template>
  <view class="content scroll" v-show="isFinish">
    <view class="listCon scroll" ref="list" style="overflow: auto;height: 100%;top:0">
        <view class="report_list">
          <view class="item" v-for="(item, index) in list" :key="index" @click="CityClubMember(item)">
            <!-- <router-link :to="{name:'CityClubMember', params:{city: item.name, type: item.type}}" class="flex align-center justify-between"> -->
				<view class="flex align-center justify-between">
					<view class="text">{{item.name}}</view>
					<view class="flex align-center">
					  <view class="text">{{item.count}}</view>
					  <img src="https://web.detion.com/static/img/next.png" alt="" style="width: 6px;height: 12px;display: block;margin-left: 10px;">
					</view>
				</view>
              
            <!-- </router-link> -->
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
      search_key: '', // 搜索关键词
      page: 1,
      isFinish: false,
      allLoaded: false // 分页加载
    }
  },
  onLoad () {
    this.getData()
    uni.showLoading({
        title: '加载中',
    	mask:"true"
    });
  },
  
  methods: {
	  // 俱乐部会员统计
	  CityClubMember(item){
		  // city: item.name, type: item.type
		  uni.navigateTo({
			url:'../../pagesThree/CityClubMember/CityClubMember?city=' + item.name + '&type=' + item.type
		  })
	  },
    getData () {
      this.$api.detion_report().then(res => {
        uni.hideLoading();
        if (res.data.code === '200') {
          this.list = res.data.data
          this.isFinish = true
        }
      })
    }
  }
}
</script>

<style>
	@import url("./ClubMember.css");
	@import url("../Report/Report.css");
</style>

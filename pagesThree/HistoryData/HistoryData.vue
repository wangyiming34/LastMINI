<template>
  <view class="content pt0 scroll" style="padding-top:124px ;">
	  <view class="" style="position: fixed;z-index: 100;left: 0;top: 0;width: 100%;">
			<view class="data_area_head flex align-center justify-between" style="width: 100%;">
			  <view class="date flex align-center">
				  <picker mode="date"  fields="month" @change="pic1">
				  	<view class="type flex align-center" style="margin-right: 5px">
				  	  <view class="text">{{start}}</view>
				  	  <view class="caret"></view>
				  	</view>
				  </picker>
					至
					<picker mode="date"  fields="month" @change="pic2">
						<view class="type flex align-center" style="margin-left: 5px">
						  <view class="text">{{end}}</view>
						  <view class="caret"></view>
						</view>
					</picker>
			    
			  </view>
			  <view class="number">
			    <view>缴费总数:{{count}}</view>
			    <view>续费总数:{{renew}}</view>
			  </view>
			</view>
			<view class="history_list" style="padding: 0 15px">
			  <view class="head list flex align-center bnew2">
			    <view>时间</view>
			    <view>缴费人数</view>
			    <view>续费人数</view>
			  </view>
			</view>
	  </view>
    
    <view class="listCon history_list scroll" ref="list" style="height: calc(100% - 124px);overflow: auto;padding: 0 15px;background-color: white;">
      <view class="list flex align-center bnew2" v-for="(item, index) in list" :key="index" @click="gogo(item)">
        <view>{{item.name}}</view>
        <view>{{item.count}}</view>
        <view>{{item.renew}}</view>
      </view>
    </view>
    
  </view>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      renew: 0,
      list: [],
      start: '2017-10',
      end: '',
      startDate: new Date('2017-10-01'),
      endDate: new Date(),
      s_year: 2017,
      s_month: 10,
      e_year: '',
      e_month: '',
      cur_start: '', // 进入详情需要的
      cur_end: '' // 进入详情需要的
    }
  },
  onLoad () {
    uni.showLoading({
        title: '加载中',
    	mask:"true"
    });
	this.e_year = this.endDate.getFullYear()
	this.e_month = this.endDate.getMonth() + 1
	this.end = this.e_year + '-' + this.e_month
  	this.getData(0)
  },
  methods: {
	  gogo(item){
		  uni.navigateTo({
		  	url:'../../pagesThree/HistoryDetail/HistoryDetail?start='+item.startDate + '&end=' +item.endDate
		  })
	  },
    getData (e) {
      this.$api.month_open_renew({
        start: this.start,
        end: this.end
      }).then(res => {
        uni.hideLoading();
        if (res.data.code === '200') {
          this.count = res.data.data.search_res.open
          this.renew = res.data.data.search_res.renew
          if (e === 0) {
            this.list = res.data.data.list
          }
        }
      })
    },
	pic1(e){
		// console.log(e.detail.value.split('-')[0])
		let year = e.detail.value.split('-')[0]
		let month = e.detail.value.split('-')[1]
		this.s_year = year
		this.s_month = month
		this.start = e.detail.value
		if (this.s_year > this.e_year) {
		  this.count = 0
		  this.renew = 0
		  uni.showToast({
		      title: '开始年份不能大于结束年份',
		      mask: "true",
		  	icon:'none'
		  });
		} else if (this.s_year < this.e_year) {
		  this.count = 0
		  this.renew = 0
		  uni.showLoading({
		      title: '加载中',
		  	mask:"true"
		  });
		  this.getData(1)
		} else if (this.s_year === this.e_year) {
		  if (this.s_month <= this.e_month) {
		    this.count = 0
		    this.renew = 0
		    uni.showLoading({
		        title: '加载中',
		    	mask:"true"
		    });
		    this.getData(1)
		  } else {
		    this.count = 0
		    this.renew = 0
			uni.showToast({
			    title: '开始月份不能大于结束月份',
			    mask: "true",
				icon:'none'
			});
		  }
		}
	},
	pic2(e){
		// console.log(e.detail.value.split('-')[0])
		let year = e.detail.value.split('-')[0]
		let month = e.detail.value.split('-')[1]
		this.e_year = year
		this.e_month = month
		this.end = e.detail.value
		if (this.s_year > this.e_year) {
		  this.count = 0
		  this.renew = 0
		  uni.showToast({
		      title: '结束年份不能小于开始年份',
		      mask: "true",
		  	icon:'none'
		  });
		} else if (this.s_year < this.e_year) {
		  this.count = 0
		  this.renew = 0
		  // this.list = []
		  uni.showLoading({
		      title: '加载中',
		  	mask:"true"
		  });
		  this.getData()
		} else if (this.s_year === this.e_year) {
		  if (this.s_month <= this.e_month) {
		    this.count = 0
		    this.renew = 0
		    // this.list = []
		    uni.showLoading({
		        title: '加载中',
		    	mask:"true"
		    });
		    this.getData()
		  } else {
		    this.count = 0
		    this.renew = 0
			uni.showToast({
			    title: '结束月份不能小于开始月份',
			    mask: "true",
				icon:'none'
			});
		  }
		}
	}
  }
}
</script>

<style>
  @import url("../Report/Report.css");
</style>

<template>
  <view class="wrap1" style="padding-top: 88px;">
	  <view class="" style="position: fixed;left: 0; top: 0;z-index: 100;width: 100%;">
			<view class="report_search flex align-center border-bottom" style="background-color: white;width: 100%;">
			  <view class="text flex align-center">
			    <img src="https://web.detion.com/static/img/search_icon1.png" alt="" class="icon">
			    <view style="flex: 1">
			      <input type="text" placeholder="请输入要搜索的俱乐部名称" v-model="search_key">
			    </view>
			  </view>
			  <view class="btn" @click="search">搜索</view>
			</view>
			<view class="pay_condition flex align-center justify-between" style="width: 100%;background: #f5f5f5;;">
			  <view class="flex align-center">
				 
				<picker @change="bindPickerChange2"  mode = 'selector' :range='timeList'> 
					<view class="type time flex align-center" style="margin-left: 10px">
					  <view class="text">{{time}}</view>
					  <view class="caret"></view>
					</view>
				</picker>
				
			  </view>
			  <view class="total">超期总数：{{total}}</view>
			</view>
	  </view>
    
    <view class="listCon scroll" ref="list" style="overflow: auto;height: calc(100% - 88px);top:88px">
		
      <view class="pay_again_city" v-for="(item, index) in list" :key="index" @click="PayAgainCityClubUser(item)">
        <view class="city_name border-bottom">{{item.name}}</view>
        <view class="detail flex">
          <view class="number border-right">
            <view>会员总数：{{item.usercount}}</view>
            <view style="margin-top: 6px">应续费会员：{{item.renew}}</view>
          </view>
          <view class="percent">
            <view class="num" >{{item.percent.split('%')[0]}}<text v-if="item.percent.split('%')[0]!=0">%</text></view>
            <!-- <view class="num" v-else>0</view> -->
            <view class="text">应续费VIP/VIP总数</view>
          </view>
        </view>
      </view>
	  
      <view class="pay_again_city" v-show="show" @click="PayAgainCityClubUser1">
        <view class="city_name border-bottom">{{free.name}}</view>
        <view class="detail flex">
          <view class="number border-right">
            <view>会员总数：{{free.usercount}}</view>
            <view style="margin-top: 6px">应续费会员：{{free.renew}}</view>
          </view>
          <view class="percent">
            <view class="num" >{{free.percent.split('%')[0]}}<text v-if="free.percent.split('%')[0]!=0">%</text></view>
            <!-- <view class="num" v-else>0</view> -->
            <view class="text">应续费VIP/VIP总数</view>
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
      search_key: '',
      time: '全部超期VIP',
      time_index: 1,
      timeList: ['全部超期VIP', '超期0-3个月', '超期3-6个月', '超期6个月以上'],
      total: 0,
      free: {},
      list: [],
      time_popup: false,
      isFinish: false,
      show: true ,// 显示无俱乐部的城市中超期自由港VIP
	  type:'',
	  city:''
    }
  },
  onLoad (e) {
    uni.showLoading({
        title: '加载中',
    	mask:"true"
    });
	this.type = e.type
	this.city = e.city
    this.getData()
  },

  methods: {
	  // <!-- @click="$router.push({name:'PayAgainCityClubUser',params:{id: item.club_id,name: item.name}})" -->
	  PayAgainCityClubUser(item){
		  uni.navigateTo({
		  	 url:'../../pagesThree/PayAgainCityClubUser/PayAgainCityClubUser?id='+item.club_id+'&name='+item.name
		  })
	  },
	  // <!-- @click="$router.push({name:'PayAgainCityClubUser',params:{id: 0,name: (free.name || '').split('自由港')[0]}})" -->
	  PayAgainCityClubUser1(){
		  uni.navigateTo({
		  	 url:'../../pagesThree/PayAgainCityClubUser/PayAgainCityClubUser?id='+'0'+'&name='+this.free.name.split('自由港')[0]
		  })
	  },
    getData () {
      this.$api.club_report_renew_v2({
        search: this.search_key,
        type: this.type,
        time: this.time_index,
        city_name: this.city
      }).then(res => {
        if (res.data.code === '200') {
          uni.hideLoading();
          this.free = res.data.data.freedom
          this.total = res.data.data.totalCount
          this.list = res.data.data.list
          this.isFinish = true
          if (this.search_key.length) {
            this.show = false
          }
        }
      })
    },
    search () {
      if (this.search_key.length) {
        uni.showLoading({
            title: '搜索中',
        	mask:"true"
        });
      }
      this.getData()
    },
	// 点击选中时间范围
	bindPickerChange2(e){
		uni.showLoading({
		    title: '加载中',
			mask:"true"
		});
		this.time = this.timeList[e.detail.value]
		if (this.time === '全部超期VIP') {
		  this.time_index = 1
		} else if (this.time === '超期0-3个月') {
		  this.time_index = 2
		} else if (this.time === '超期3-6个月') {
		  this.time_index = 3
		} else if (this.time === '超期6个月以上') {
		  this.time_index = 4
		}
		this.total = 0
		this.list = []
		this.free = {}
		this.getData()
	}
  }
}
</script>

<style>
  @import url("../Report/Report.css");
</style>

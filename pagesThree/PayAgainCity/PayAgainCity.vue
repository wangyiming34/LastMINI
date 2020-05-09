<template>
  <view class="wrap1" style="padding-top: 88px;">
	  <view class="" style="position: fixed;left: 0; top: 0;z-index: 100;width: 100%;">
			<view class="report_search flex align-center border-bottom" style="background-color: white;width: 100%;">
			  <view class="text flex align-center">
			    <img src="https://web.detion.com/static/img/search_icon1.png" alt="" class="icon">
			    <view style="flex: 1">
			      <input type="text" placeholder="请输入要搜索的城市" v-model="search_key">
			    </view>
			  </view>
			  <view class="btn" @click="search">搜索</view>
			</view>
			<view class="pay_condition flex align-center justify-between" style="width: 100%;background: #f5f5f5;;">
			  <view class="flex align-center">
				  
			    <picker @change="bindPickerChange1"  mode = 'selector' :range='typeList'> 
					<view class="type flex align-center" >
					  <view class="text">{{type}}</view>
					  <view class="caret"></view>
					</view>
			    </picker>
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
      <view class="pay_again_city" v-for="(item, index) in list" :key="index" @click="PayAgainCityClub(item)">
        <view class="city_name border-bottom">{{item.name}}</view>
        <view class="detail flex">
          <view class="number border-right">
            <view>VIP总数：{{item.sort}}</view>
            <view style="margin-top: 6px">应续费VIP：{{item.renew}}</view>
          </view>
          <view class="percent">
            <view class="num" >{{item.percent.split('%')[0]}}<text v-if="item.percent.split('%')[0]!=0">%</text></view>
            <!-- <view class="num" v-else>0</view> -->
            <view class="text">应续费VIP/VIP总数</view>
          </view>
        </view>
      </view>
      <view class="pay_again_city" v-show="show" @click="PayAgainNoCity">
        <view class="city_name border-bottom">{{free.name}}</view>
        <view class="detail flex">
          <view class="number border-right">
            <view>VIP总数：{{free.user_count}}</view>
            <view style="margin-top: 6px">应续费VIP：{{free.renew}}</view>
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
      type: '国内',
      type_index: 1, // 1国内2国外
      // typeList: [{
      //   values: ['国内', '国外'] // 政治面貌列表
      // }],
	  typeList: ['国内', '国外'],
      picker_type: '',
      time: '全部超期VIP',
      time_index: 1,
      // timeList: [{
      //   values: ['全部超期VIP', '超期0-3个月', '超期3-6个月', '超期6个月以上']
      // }],
	  timeList: ['全部超期VIP', '超期0-3个月', '超期3-6个月', '超期6个月以上'],
      total: 0,
      free: {},
      list: [],
      type_popup: false,
      time_popup: false,
      show: true // 显示无俱乐部的城市中超期自由港VIP
    }
  },
  onLoad () {
    uni.showLoading({
        title: '加载中',
    	mask:"true"
    });
    this.getData()
  },
  methods: {
	  // 跳转自由港应续费用户
	  // @click="$router.push({name:'PayAgainNoCity',params:{type:type_index}})" 
	  PayAgainNoCity(){
		  uni.navigateTo({
			url:'../../pagesThree/PayAgainNoCity/PayAgainNoCity?type='+this.type_index
		  })
	  },
	  // 跳转应续费用户
	  // $router.push({name:'PayAgainCityClub',params:{city: item.name,type:type_index}})
	  PayAgainCityClub(item){
		  uni.navigateTo({
		  	url:'../../pagesThree/PayAgainCityClub/PayAgainCityClub?city='+item.name+"&type="+this.type_index
		  })
	  },
    getData () {
      this.$api.renew_v2({
        search: this.search_key,
        type: this.type_index,
        time: this.time_index
      }).then(res => {
        if (res.data.code === '200') {
          uni.hideLoading();
          this.free = res.data.data.other
          this.total = res.data.data.totalCount
          this.list = res.data.data.list
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
    // 选择国内外
	bindPickerChange1(e){
		uni.showLoading({
		    title: '加载中',
			mask:"true"
		});
		this.type = this.typeList[e.detail.value]
		if (this.type === '国内') {
		  this.type_index = 1
		} else if (this.type === '国外') {
		  this.type_index = 2
		}
		this.total = 0
		this.list = []
		this.free = {}
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
	},
   
  }
}
</script>

<style>
  @import url("../Report/Report.css");
</style>

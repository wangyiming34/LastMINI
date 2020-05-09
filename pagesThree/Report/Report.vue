<template>
  <view class="content scroll pt0" v-if="isFinish" style="overflow: auto;background: #fafafa" >
    <view class="flex align-center justify-between" style="padding: 5px">
      <view class="club_report" @click="ClubMember" style="width: 49.5%;height: 73px;">
        <!-- <img src="/static/img/report.png" alt=""> -->
		<image src="https://web.detion.com/static/img/report.png" lazy-load="true" class="imga" mode="aspectFill"></image>
      </view>
      <view class="club_report" @click="PayAgainCity" style="width: 49.5%;height: 73px;">
        <!-- <img src="/static/img/report.jpg" alt=""> -->
		<image src="https://web.detion.com/static/img/report.jpg" lazy-load="true" class="imga" mode="aspectFill"></image>
      </view>
    </view>
<!--    会员统计-->
    <view class="new_report_title flex align-center justify-between"  @click="member">
      <view class="flex align-center">
        <view class="tips">会</view>
        <view class="title">会员统计</view>
      </view>
      <view class="flex align-center">
        <view class="text" v-show="!isMember">展开</view>
        <view class="text" v-show="isMember">收起</view>
        <img src="https://web.detion.com/static/img/next5.png" alt="" class="icon" :class="{rotate: isMember}">
      </view>
    </view>
    <view class="member_con" v-show="isMember">
      <view class="small">会员人数统计</view>
      <view class="report_list all">
<!--        预留编号-->
        <view class="item border-top" @click="Reverse">
          <view class="flex align-center justify-between">
            <view class="text">预留编号</view>
            <view class="flex align-center">
              <view class="num">{{vipNoreserved}}</view>
              <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
            </view>
          </view>
        </view>
<!--        预留编号-->
<!--        用户总数-->
        <view class="item border-top" @click="AllMember">
          <view class="flex align-center justify-between">
            <view class="text">用户总数（线上平台所有用户数量）</view>
            <view class="flex align-center">
              <view class="num">{{userTotal}}</view>
              <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
            </view>
          </view>
        </view>
<!--        用户总数-->
<!--        会员用户-->
        <view class="item border-top" @click="UserReport">
          <view class="flex align-center justify-between">
            <view class="text">会员用户（缴费用户）</view>
            <view class="flex align-center">
              <view class="num">{{vipNos}}</view>
              <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
            </view>
          </view>
        </view>
<!--        会员用户-->
        <!--        自由港人员统计-->
        <view class="item border-top" @click="FreeUser">
          <view  class="flex align-center justify-between">
            <view class="text">自由港人员统计</view>
            <view class="flex align-center">
              <view class="num">{{freedom}}</view>
              <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
            </view>
          </view>
        </view>
        <!--        自由港人员统计-->
<!--        注册用户-->
        <view class="item border-top flex align-center justify-between">
          <view class="text">注册用户（只有手机号注册用户）</view>
          <view class="flex align-center">
            <view class="num">{{mobileRegister}}</view>
          </view>
        </view>
<!--        注册用户-->
<!--        实名用户-->
        <view class="item border-top flex align-center justify-between">
          <view class="text">实名用户（已认证身份证的用户）</view>
          <view class="flex align-center">
            <view class="num">{{realNameAuthentication}}</view>
          </view>
        </view>
<!--        实名用户-->
      </view>
      <view class="small bt">历史数据查询</view>
      <view class="report_list all" @click="HistoryData">
        <view class="item border-top">
          <view class="flex align-center justify-between">
            <view class="text">按月度区间筛选历史缴费/续费人数</view>
            <view class="flex align-center">
              <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
            </view>
          </view>
        </view>
      </view>
      <view class="small bt">缴费统计（新用户缴费，不包含续费用户）</view>
      <view class="report_list all">
        <!--总缴费人数-->
        <view class="item border-top" @click="EveryMonth">
          <view class="flex align-center justify-between">
            <view class="text">总缴费人数</view>
            <view class="flex align-center">
              <view class="num">{{totalPayCount}}</view>
              <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
            </view>
          </view>
        </view>
        <!--总缴费人数-->
      </view>
      <view class="report_list new">
        <view class="item flex align-center justify-between"  @click="PayCount('today')">
          <view class="text">今日缴费人数</view>
          <view class="flex align-center">
            <view class="num">{{todayPayCount}}</view>
            <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
          </view>
        </view>
        <view class="item flex align-center justify-between" @click="PayCount('week')">
          <view class="text">本周缴费人数</view>
          <view class="flex align-center">
            <view class="num">{{weekPayCount}}</view>
            <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
          </view>
        </view>
        <view class="item flex align-center justify-between" @click="PayCount('month')">
          <view class="text">本月缴费人数</view>
          <view class="flex align-center">
            <view class="num">{{monthPayCount}}</view>
            <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
          </view>
        </view>
      </view>
      <view class="small bt">续费统计（老会员续费）</view>
      <view class="report_list all border-top"></view>
      <view class="report_list">
        <view class="item flex align-center justify-between" @click="TodayNeedRenew">
          <view class="text">截止今日应续费人数</view>
          <view class="flex align-center">
            <view class="num">{{cutOffTodayNeedRenew}}</view>
            <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
          </view>
        </view>
        <view class="item flex align-center justify-between" @click="TodayRenewed">
          <view class="text">截止今日已续费人数</view>
          <view class="flex align-center">
            <view class="num">{{cutOffTodayRenewed}}</view>
            <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
          </view>
        </view>
        <view class="item flex align-center justify-between">
          <view class="text">截止今日续费百分比</view>
          <view class="flex">
            <view class="num">{{cutOffTodayRenewedPercentage}}</view>
          </view>
        </view>
        <view class="item flex align-center justify-between" @click="AgainCount('today')">
          <view class="text">今日续费人数</view>
          <view class="flex align-center">
            <view class="num">{{todayRenewed}}</view>
            <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
          </view>
        </view>
        <view class="item flex align-center justify-between" @click="AgainCount('week')">
          <view class="text">本周续费人数</view>
          <view class="flex align-center">
            <view class="num">{{weekRenewed}}</view>
            <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
          </view>
        </view>
        <view class="item flex align-center justify-between" @click="AgainCount('month')">
          <view class="text">本月续费人数</view>
          <view class="flex align-center">
            <view class="num">{{monthRenewed}}</view>
            <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
          </view>
        </view>
      </view>
      <view class="small bt">群数量统计</view>
      <view class="report_list all">
        <!--总缴费人数-->
        <view class="item border-top" @click="GroupTotal">
          <view class="flex align-center justify-between">
            <view class="text">平台群聊数量统计</view>
            <view class="flex align-center">
              <view class="num">{{imCount}}</view>
              <van-icon name="arrow"  color="#ccc" style="margin-left:5px"/>
            </view>
          </view>
        </view>
        <!--总缴费人数-->
      </view>
    </view>
<!--    活跃度统计-->
    <view class="new_report_title flex align-center justify-between" @click="active">
      <view class="flex align-center">
        <view class="tips">活</view>
        <view class="title">活跃度统计</view>
      </view>
      <view class="flex align-center">
        <view class="text" v-show="!isActive">展开</view>
        <view class="text" v-show="isActive">收起</view>
        <img src="https://web.detion.com/static/img/next5.png" alt="" class="icon" :class="{rotate: isActive}">
      </view>
    </view>
    <view class="member_con" v-show="isActive">
      <view class="small">注册数量统计（平台上新注册的所有用户,包括注册用户、实名用户和缴费用户）</view>
      <view class="report_list all border-top"></view>
      <view class="report_list">
        <view class="item flex align-center justify-between">
          <view class="text">今日注册用户</view>
          <view class="flex">
            <view class="num">{{todayUser}}</view>
          </view>
        </view>
        <view class="item flex align-center justify-between">
          <view class="text">本周注册用户</view>
          <view class="flex">
            <view class="num">{{weekUser}}</view>
          </view>
        </view>
        <view class="item flex align-center justify-between">
          <view class="text">本月注册用户</view>
          <view class="flex">
            <view class="num">{{monthUser}}</view>
          </view>
        </view>
      </view>
      <view class="small bt">活跃度统计（按日、月、周统计登录线上平台人数）</view>
      <view class="report_list all border-top"></view>
      <view class="report_list">
        <view class="item flex align-center justify-between">
          <view class="text">今日活跃用户</view>
          <view class="flex">
            <view class="num">{{loginDay}}</view>
          </view>
        </view>
        <view class="item flex align-center justify-between">
          <view class="text">本周活跃用户</view>
          <view class="flex">
            <view class="num">{{loginWeek}}</view>
          </view>
        </view>
        <view class="item flex align-center justify-between">
          <view class="text">本月活跃用户</view>
          <view class="flex">
            <view class="num">{{loginMonth}}</view>
          </view>
        </view>
      </view>
    </view>
<!--    企业统计-->
    <view class="new_report_title flex align-center justify-between" @click="group">
      <view class="flex align-center">
        <view class="tips">企</view>
        <view class="title">企业统计</view>
      </view>
      <view class="flex align-center">
        <view class="text" v-show="!isGroup">展开</view>
        <view class="text" v-show="isGroup">收起</view>
        <img src="https://web.detion.com/static/img/next5.png" alt="" class="icon" :class="{rotate: isGroup}">
      </view>
    </view>
    <view class="member_con" v-show="isGroup">
      <view class="report_list all border-top"></view>
      <view class="report_list">
        <view class="item flex align-center justify-between">
          <view class="text">已认证企业总数</view>
          <view class="flex">
            <view class="num">{{allCompany}}</view>
          </view>
        </view>
        <view class="item flex align-center justify-between">
          <view class="text">今日新增企业</view>
          <view class="flex">
            <view class="num">{{todayCompany}}</view>
          </view>
        </view>
        <view class="item flex align-center justify-between">
          <view class="text">本周新增企业</view>
          <view class="flex">
            <view class="num">{{weekCompany}}</view>
          </view>
        </view>
        <view class="item flex align-center justify-between">
          <view class="text">本月新增企业</view>
          <view class="flex">
            <view class="num">{{monthCompany}}</view>
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
      isFinish: false,
      isMember: true, // 会员统计内容显示
      isActive: true, // 活跃度统计内容显示
      isGroup: true, // 活跃度统计内容显示
      vipNoreserved: 0, // 预留编号
      userTotal: 0, // 用户总数
      vipNos: 0, // 会员用户
      freedom: 0, // 自由港人员
      mobileRegister: 0, // 手机号注册
      realNameAuthentication: 0, // 实名注册
      totalPayCount: 0, // 总缴费人数
      todayPayCount: 0, // 今日缴费人数
      weekPayCount: 0, // 本周缴费人数
      monthPayCount: 0, // 本月缴费人数
      cutOffTodayNeedRenew: 0, // 截止今日应续费人数
      cutOffTodayRenewed: 0, // 截止今日已续费人数
      cutOffTodayRenewedPercentage: 0, // 截止今日续费百分比
      todayRenewed: 0, // 今日续费人数
      weekRenewed: 0, // 本周续费人数
      monthRenewed: 0, // 本月续费人数
      imCount: 0, // 平台群聊数量统计
      todayUser: 0, // 今日注册用户
      weekUser: 0, // 本周注册用户
      monthUser: 0, // 本月注册用户
      loginDay: 0, // 今日活跃用户
      loginWeek: 0, // 本周活跃用户
      loginMonth: 0, // 本月活跃用户
      allCompany: 0, // 已认证企业总数
      todayCompany: 0, // 今日新增企业
      weekCompany: 0, // 本周新增企业
      monthCompany: 0 // 本月新增企业
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
	  // 群数量
	  GroupTotal(){
		  uni.navigateTo({
		  	url:'../../pagesThree/GroupTotal/GroupTotal'
		  })
	  },  
	  // 续费人数 本日本周本月
	  AgainCount(type){
		  uni.navigateTo({
		  	url:'../../pagesThree/AgainCount/AgainCount?type='+type
		  })
	  },
	  // 截止今天已经续费
	  TodayRenewed(){
	  		  uni.navigateTo({
	  		  	url:'../../pagesThree/TodayRenewed/TodayRenewed'
	  		  })
	  },
	  // 截止今天应续费
	  TodayNeedRenew(){
		  uni.navigateTo({
		  	url:'../../pagesThree/TodayNeedRenew/TodayNeedRenew'
		  })
	  },
	  // 本日本周本月缴费
	  PayCount(type){
		  uni.navigateTo({
		  	url:'../../pagesThree/PayCount/PayCount?type='+type
		  })
	  },
	  // 总缴费人数
	  EveryMonth(){
		  uni.navigateTo({
			url:'../../pagesThree/EveryMonth/EveryMonth'
		  }) 
	  },
	  // 历史数据查询
	  HistoryData(){
		  uni.navigateTo({
		  	url:'../../pagesThree/HistoryData/HistoryData'
		  }) 
	  },
	  // 自由港人数
	  FreeUser(){
		  uni.navigateTo({
		  	url:'../../pagesThree/FreeUser/FreeUser'
		  }) 
	  },
	  // 用户总数
	  UserReport(){
		  uni.navigateTo({
		  	url:'../../pagesThree/UserReport/UserReport'
		  })
	  },
	  // 用户总数
	  AllMember(){
		  uni.navigateTo({
			url:'../../pagesThree/AllMember/AllMember'
		  })
	  }, 
	  // 预留编号
	  Reverse(){
		  uni.navigateTo({
		  	url:'../../pagesThree/Reverse/Reverse'
		  })
	  }, 
	  // 应续费用户统计
	  PayAgainCity(){
		  uni.navigateTo({
		  	url:'../../pagesThree/PayAgainCity/PayAgainCity'
		  })
	  },
	  // 俱乐部会员统计
	  ClubMember(){
		  uni.navigateTo({
		  	url:'../../pagesThree/ClubMember/ClubMember'
		  })
	  },
    getData () {
      this.$api.users_report().then(res => {
        uni.hideLoading();
        if (res.data.code === '200') {
          this.vipNoreserved = res.data.data.vipNoreserved
          this.userTotal = res.data.data.userTotal
          this.vipNos = res.data.data.vipNos
          this.freedom = res.data.data.freedom
          this.mobileRegister = res.data.data.mobileRegister
          this.realNameAuthentication = res.data.data.realNameAuthentication
          this.totalPayCount = res.data.data.totalPayCount
          this.todayPayCount = res.data.data.todayPayCount
          this.weekPayCount = res.data.data.weekPayCount
          this.monthPayCount = res.data.data.monthPayCount
          this.cutOffTodayNeedRenew = res.data.data.cutOffTodayNeedRenew
          this.cutOffTodayRenewed = res.data.data.cutOffTodayRenewed
          this.cutOffTodayRenewedPercentage = res.data.data.cutOffTodayRenewedPercentage
          this.todayRenewed = res.data.data.todayRenewed
          this.weekRenewed = res.data.data.weekRenewed
          this.monthRenewed = res.data.data.monthRenewed
          this.imCount = res.data.data.imCount
          this.$nextTick(() => {
            this.isFinish = true
          })
        }
        this.getActivity()
        this.getCompany()
      })
    },
    getActivity () {
      this.$api.activity_statistics().then(res => {
        this.todayUser = res.data.data.todayUser
        this.weekUser = res.data.data.weekUser
        this.monthUser = res.data.data.monthUser
        this.loginDay = res.data.data.loginDay
        this.loginWeek = res.data.data.loginWeek
        this.loginMonth = res.data.data.loginMonth
      })
    },
    getCompany () {
      this.$api.company_statistics().then(res => {
        this.allCompany = res.data.data.allCompany
        this.todayCompany = res.data.data.todayCompany
        this.weekCompany = res.data.data.weekCompany
        this.monthCompany = res.data.data.monthCompany
      })
    },
    member () {
      this.isMember = !this.isMember
    },
    active () {
      this.isActive = !this.isActive
    },
    group () {
      this.isGroup = !this.isGroup
    }
  }
}
</script>

<style>
	@import url("./Report.css");
	.club_report{
	  padding: 0;
	}
</style>

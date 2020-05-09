<template>
  <view class="content scroll pt0" v-show="isFinish" style="padding-top: 40px;">
    <view class="report_title" style="width: 100%;position: fixed;z-index: 100;left: 0;top: 0;">
      <view class="bnew2 title flex align-center justify-between" style="color: #333">平台群聊数量统计 <view class="number">{{this.number}}</view></view>
    </view>
    <view class="listCon scroll" ref="list" style="overflow: auto;height: calc(100% - 40px);top:40px">
      <view class="group_list">
        <view class="list bnew2" v-for="(item, index) in list" :key="index">
          <view class="title">{{item.tname}}</view>
          <view class="info flex align-center">群主：{{item.owner_info.nickname}}（
            <vip :no="item.owner_info.no" :type="item.owner_info.type" v-if="item.owner_info.no"></vip>
            ）</view>
          <view class="info">成员：{{item.size}}人</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  
  data () {
    return {
      number: 0,
      list: [],
      isFinish: false
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
    getData () {
      this.$api.im_count({
        type: 2
      }).then(res => {
        uni.hideLoading();
        this.number = res.data.data.imTeamsCount
        this.list = res.data.data.imTeamsInfo
        this.isFinish = true
      })
    }
  }
}
</script>

<style>
  @import '../Report/Report.css';
</style>

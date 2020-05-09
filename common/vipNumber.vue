<template>
  <view class="vipzujian flex align-center">
    <!--1=创始会员(C),2=会员(C),3=全球会员(G),4=员工(E),5=港澳台会员(Z),6=官方号(V),7=企业号(B)-->
	
	<!-- 我的页面没用组件 -->
    <view v-if="type === '1'" class="word">C</view>
    <view v-else-if="type === '2'" class="word">C</view>
    <view v-else-if="type === '3'" class="word">G</view>
    <view v-else-if="type === '4'" class="word">E</view>
    <view v-else-if="type === '5'" class="word">T</view>
    <view v-else-if="type === '6'" class="word">V</view>
    <view v-else-if="type === '7'" class="word">B</view>
    <view>{{no}}</view>
  </view>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    type: {
      type: String
    },
    no: {
      type: Number
    }
  }
}
</script>

<style>
	/* .vipzujian{
		font-size:12px;
		font-weight:400;
		color:rgba(6,77,197,1);
		padding: 0px 5px;
		border-radius:3px;
		opacity:0.7;
		border:1px solid rgba(6,77,197,1);
		height: 15px;
		line-height: 15px;
	} */
</style>

<template>
	<view class="">
		<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.GHk50cSiBZ5dedd65ba095cab27ea6dd912598054947.gif" alt="" class="v_icon" v-if="v_type && v_type === 1">
		<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.7AwkKEvj9qwW5603aeff9823401df2c16215fdecdedf.gif" alt="" class="v_icon" v-if="v_type && v_type === 2">
		<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.A57EvRUyFN05b39ec1b3adfb55979441bd295af74d31.png" alt="" class="v_icon" v-if="v_type && v_type === 3">
		<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.hEmkBmEQApMv5b86d020dbfaf467f447b0f059bb8844.gif" alt="" class="v_icon" v-if="v_type && v_type === 4">
		<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.mSrSBPwTkt6kebb3c5c11aa72949c2bcdee9347b79ff.png" alt="" class="king_icon" v-if=" type && (type === '1' || type === '2' || type === '3' || type === '5')">
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
    v_type: {
      type: Number
    }
  }
}
</script>

<style scoped>

</style>

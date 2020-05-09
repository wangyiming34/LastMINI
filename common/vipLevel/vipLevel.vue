<template>
	<image :src="vip_level?'https://web.detion.com/static/image/level/level_'+vip_level+'.png':''" alt="" class="vip_level" v-if="vip_level">
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
	vip_level: {
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

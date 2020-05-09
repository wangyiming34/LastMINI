<!--获取验证码-->
<template>
  <div class="get_code">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'GetCode',
  data () {
    return {
      msg: '获取验证码',
      count: 60
    }
  },
  methods: {
    startCount () {
      var interval = {}
      if (this.msg === '获取验证码') {
        this.msg = '重发(' + this.count + 'S)'
        this.count--
        interval = setInterval(() => {
          if (this.count === 0) {
            clearInterval(interval)
            this.msg = '获取验证码'
            this.count = 60
            return true
          } else {
            this.msg = '重发(' + this.count + 'S)'
            this.count--
            return false
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
  .get_code{
    font-size: 14px;
  }
</style>

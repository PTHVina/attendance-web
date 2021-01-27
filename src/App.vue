<template>
  <div id="vue-admin-beautiful">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      let token = this.$store.getters['user/accessToken']
      console.log('token', token)
      if (!token) {
        this.setdata()
      }
    },
    updated() {},
    methods: {
      setdata() {
        this.$store.dispatch('user/login').then(() => {
          const routerPath = '/'
          this.$router.push(routerPath).catch(() => {})
        })
      },
    },
  }
</script>

<style lang="scss">
  .btn_red {
    color: red !important;
  }
  .btn_group .tips {
    font-size: 14px;
    float: right;
    color: red;
  }
</style>

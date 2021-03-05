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
      // console.log('token', token)
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

  .svg-inline--fa {
    .fa-w-12,
    .fa-w-14,
    .fa-w-16,
    .fa-w-18,
    .fa-w-20 {
      width: 1.25em !important;
    }
  }
  .el-submenu__title {
    .vab-fas-icon {
      width: 1.25em !important;
    }
  }
</style>

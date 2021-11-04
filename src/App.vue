<template>
  <div v-cloak id="vue-admin-beautiful">
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
  [v-cloak] {
    display: none;
  }
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
  //新手引导原始层级100000000
  .introjs-helperLayer {
    z-index: 1098 !important;
  }
  .introjs-overlay {
    z-index: 1099 !important;
  }
  .introjs-tooltipReferenceLayer {
    z-index: 1100 !important;
  }
  .el-table--border:after,
  .el-table--group:after,
  .el-table:before,
  .el-loading-mask {
    z-index: 500 !important;
  }
  // .el-message {//原始层级2005
  //   z-index: 100000100 !important;
  // }
  // .el-dialog__wrapper {
  //   z-index: 100000100 !important;
  // }
</style>

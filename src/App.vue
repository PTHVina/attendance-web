<template>
  <div id="vue-admin-beautiful">
    <router-view />
  </div>
</template>

<script>
  import { closePage } from '@/api/device'
  export default {
    name: 'App',
    created() {
      console.log(11111)
      this.setdata()
    },
    mounted() {},
    updated() {
      closePage()
    },
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

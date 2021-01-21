<template>
  <div id="vue-admin-beautiful">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      this.setdata()
    },
    mounted() {},
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

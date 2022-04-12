<template>
  <div :class="'logo-container-' + layout">
    <router-link v-if="lang != 'Jan_JPN'" to="/">
      <!-- 这里是logo变更的位置 -->
      <!-- <vab-remix-icon v-if="logo" class="logo" :icon-class="logo" /> -->
      <img :src="logoImg" class="logo" alt="" />
      <span
        id="admin_title"
        class="title"
        :class="{ 'hidden-xs-only': layout === 'horizontal' }"
        :title="title"
      >
        {{ title }}
      </span>
    </router-link>
    <router-link v-else to="/">
      <img :src="require('@/assets/logo-3.png')" alt="logo" class="img" />
    </router-link>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { logo } from '@/config'
  import { getLogo } from '@/api/index'
  import { getUserConfigObject, getBrandObject } from '@/api/sysPage'

  export default {
    name: 'VabLogo',
    data() {
      return {
        title: this.$baseTitle,
        lang: this.$lang,
        logoImg: '',
      }
    },
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        layout: 'settings/layout',
      }),
    },
    created() {
      this.logoImg = getLogo()
      console.log('logo', this.logoImg)
    },
    mounted() {
      if (this.$lang == 'en_US') {
        this.title = 'FaceRASystem'
      } else if (this.$lang == 'Jan_JPN') {
        // this.title = '知恵と顔の勤務評定の門限システム'
        this.title = 'HEAT CHECK'
      } else if (this.$lang == 'Fr_fr') {
        this.title = 'Système de visage'
      } else if (this.$lang == 'vi') {
        this.title = 'FaceRASystem'
      } else {
        this.title = this.$baseTitle
      }

      let configObject = getUserConfigObject()
      if (configObject.EnableTitleShort && configObject.TitleShort) {
        this.title = configObject.TitleShort
      } else {
        let brandObject = getBrandObject()
        if (brandObject.titleShort) {
          this.title = brandObject.titleShort
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  @mixin container {
    position: relative;
    height: $base-top-bar-height;
    overflow: hidden;
    line-height: $base-top-bar-height;
    background: $base-menu-background;
  }

  @mixin logo {
    display: inline-block;
    //height: 35px;
    margin-right: 10px;
    color: $base-title-color;
    vertical-align: middle;
    // padding-left: 10px;
  }

  @mixin title {
    display: inline-block;
    overflow: hidden;
    font-size: 20px;
    line-height: 55px;
    width: auto !important;
    color: $base-title-color;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .logo-container-horizontal {
    @include container;

    .logo {
      @include logo;
    }

    .title {
      @include title;
    }
  }

  .logo-container-vertical {
    @include container;

    height: $base-logo-height;
    line-height: $base-logo-height;
    text-align: center;

    .logo {
      @include logo;
    }

    .title {
      @include title;

      // max-width: calc(#{$base-left-menu-width} - 60px);
    }
  }

  .router-link-active .img_box {
    display: none;
    width: 35px;
    height: 35px;
  }
  .router-link-active .img {
    width: 230px;
    height: 30px;
    object-fit: unset;
    margin-top: 25px;
  }
  .is-collapse .router-link-active .img {
    display: none;
  }
  .is-collapse .router-link-active .img_box {
    display: inline-block;
  }
</style>

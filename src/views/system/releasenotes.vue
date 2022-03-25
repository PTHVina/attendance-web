<template>
  <div class="container" v-html="markdownHtml"></div>
</template>

<script>
  import { getReadme } from '@/api/sysPage'
  import { marked } from 'marked'
  export default {
    data() {
      return {
        markdown: '',
      }
    },
    computed: {
      markdownHtml() {
        return marked.parse(this.markdown)
      },
    },
    created() {
      this.markdown = getReadme()
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
  }
</style>

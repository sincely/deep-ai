<template>
  <div id="app" ref="app">
    <bar :key="barIndex" />
    <router-view />
  </div>
</template>

<script>
import bar from './components/Bar/index.vue'
export default {
  components: {
    bar
  },
  data() {
    return {
      barIndex: 'bar-default'
    }
  },
  methods: {
    updateBar() {
      this.barIndex = new Date().getTime()
      console.log(this.barIndex)
    }
  }
}
</script>

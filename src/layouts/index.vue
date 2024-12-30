<template>
  <div class="main-container" :style="{ height: screenHeight + 'px' }">
    <div class="main-left">
      <sidebar />
    </div>
    <div class="main-right">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import sidebar from './components/sideBar.vue'

const screenWidth = ref((window.screen.width / 5) * 3 + 100)
console.log(screenWidth.value)
const screenHeight = ref(window.innerHeight - 50) // 初始高度，减去可能的标题栏或边距

const updateHeight = () => {
  screenHeight.value = window.innerHeight - 50
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight) // 监听窗口大小变化
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateHeight) // 清理事件监听器
})
</script>

<style scoped>
.main-container {
  display: flex;
  width: auto;
  overflow-y: hidden;
  color: #151717;
  background-image: url('@/assets/login_bg.svg');
  background-size: cover;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
}

.main-left {
  float: left;
  width: 250px;
  height: 100%; /* 左侧自适应父容器高度 */
  background-color: rgb(221 228 234 / 90%);
  border-bottom-left-radius: 20px;
}

.main-right {
  flex: 1;
  float: left;
  height: 100%; /* 右侧自适应父容器高度 */
  background-color: white;
}
</style>

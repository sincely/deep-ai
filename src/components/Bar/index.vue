<template>
  <div class="title-bar" :style="{ width: expandState ? '' : '510px' }">
    <div class="title-bar-left" :style="{ backgroundColor: expandState ? 'rgba(221, 228, 234,0.9)' : '#fff' }">
      <img src="@/assets/bar/logo.svg" alt="图标" class="icon" />
      <div class="title">小铱elink</div>
    </div>

    <div class="title-bar-right">
      <div class="operating-button close-button" @click="closeWindow">
        <img src="@/assets/bar/close.svg" />
      </div>
      <div class="operating-button minimum-button" @click="minimumWindow">
        <img src="@/assets/bar/minimum.svg" />
      </div>
      <div v-if="expandState" class="operating-button expand-button" @click="expandWindow">
        <img src="@/assets/bar/expand.svg" />
      </div>
      <div style="width: 10px"></div>
    </div>
  </div>
</template>

<script setup>
const expandState = ref(false)
const route = useRoute()

const closeWindow = () => {
  window.close() // 关闭窗口
}

const minimumWindow = () => {
  window.ipcRenderer.send('minimizing')
}

const expandWindow = () => {
  window.ipcRenderer.send('expandWindow', {
    screenWidth: window.screen.width,
    screenHeight: window.screen.height
  })
}

watch(route, (to) => {
  console.log('to', to)
  expandState.value = !(to.path === '/' || to.path === '/login')
})
</script>

<style scoped>
.title-bar {
  position: relative; /* 为定位子元素提供参照 */
  display: flex;
  align-items: center;
  height: 45px;
  padding: 0;
  overflow: hidden; /* 防止内容溢出 */
  user-select: none;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  -webkit-app-region: drag;
}

.title-bar-left {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  width: 250px;
  height: 45px;
  background-color: #fff;
}

.title-bar-right {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: right;
  float: right;
  height: 45px;
  background-color: white;
}

.title-bar-left img {
  margin-left: 10px;
}

.title-bar .icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  -webkit-app-region: drag;
  user-select: none;
}

.title-bar .title {
  flex-grow: 1;
  margin-top: -2px;
  overflow: hidden;
  font-size: 13px;
  font-weight: bold;
  color: #151717;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-app-region: drag;
}

.title-bar .operating-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  margin-right: 8px;
  cursor: pointer;
  background-color: var(--button-bg);
  border-radius: 50%;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;
  -webkit-app-region: no-drag;
}

.title-bar .operating-button img {
  width: 10px;
  height: 10px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.title-bar .operating-button:hover img {
  opacity: 1;
}

.title-bar .close-button {
  --button-bg: #f56057;
}

.title-bar .minimum-button {
  --button-bg: #fec428;
}

.title-bar .expand-button {
  --button-bg: #1fd42a;
}
</style>

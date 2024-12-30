<template>
  <div class="sidebar">
    <div
      v-for="item in list"
      :key="item.id"
      :class="[item.active ? 'sidebar-item-active' : 'sidebar-item']"
      @click="handleOperation(item)"
    >
      <svg-icon :icon-class="item.icon"></svg-icon>
      <div>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const list = ref([
  {
    id: 1,
    name: '新对话',
    icon: 'add',
    active: false
  },
  {
    id: 2,
    name: 'AI搜索',
    icon: 'search',
    active: false
  },
  {
    id: 3,
    name: '帮我写作',
    icon: 'write',
    active: false
  },
  {
    id: 4,
    name: '图像生成',
    icon: 'pngCreate',
    active: false
  },
  {
    id: 5,
    name: 'AI阅读',
    icon: 'talk',
    active: false
  }
])
const handleOperation = (item) => {
  list.value.forEach((i) => {
    i.active = false
  })
  const index = list.value.findIndex((i) => i.id === item.id)
  list.value[index].active = !list.value[index].active
  console.log(item)

  console.log(list.value)
}
</script>

<style lang="less" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  height: 100%;
  padding: 10px 0;
  background-color: #f5f5f5;
}

.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 30px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid #342b2b;
  border-radius: 5px;
}

.sidebar-item-active {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 30px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #a3bbe3;
  border: 1px solid #342b2b;
  border-radius: 5px;
}

// hover状态
.sidebar-item:hover {
  background-color: #fbfbfb;
}
</style>

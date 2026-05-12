<template>
  <div class="home">
    <el-container class="home-layout">
      <el-aside class="home-aside" :width="asideWidth">
        <Aside :is-collapse="isAsideCollapse" />
      </el-aside>
      <el-container class="home-content">
        <el-header class="home-header">
          <Header :is-collapse="isAsideCollapse" @toggle-aside="toggleAside" />
        </el-header>
        <el-main class="home-main">
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Header from '@/components/topHeader.vue'
import Aside from '@/components/topAside.vue'
import Main from '@/components/topMain.vue'

const isAsideCollapse = ref(false)
const asideWidth = computed(() => (isAsideCollapse.value ? '72px' : '200px'))

const toggleAside = () => {
  isAsideCollapse.value = !isAsideCollapse.value
}
</script>

<style lang="less" scoped>
.home {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 18%, rgb(57 197 153 / 18%), transparent 28%),
    radial-gradient(circle at 86% 12%, rgb(126 95 255 / 14%), transparent 30%),
    radial-gradient(circle at 74% 82%, rgb(255 190 92 / 16%), transparent 34%),
    linear-gradient(135deg, #f7fbf7 0%, #f4f1fb 48%, #eef8f3 100%);
}

.home::before {
  position: absolute;
  inset: 0;
  content: '';
  opacity: 0.28;
  background-image:
    linear-gradient(rgb(48 160 122 / 12%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(48 160 122 / 12%) 1px, transparent 1px);
  background-size: 42px 42px;
}

.home-layout {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 18px;
  gap: 18px;
}

.home-aside {
  overflow: hidden;
  background: rgb(255 255 255 / 82%);
  border: 1px solid rgb(255 255 255 / 76%);
  border-radius: 8px;
  box-shadow: 0 18px 46px rgb(58 84 74 / 14%);
  backdrop-filter: blur(14px);
  transition: width 0.24s ease;
}

.home-content {
  min-width: 0;
  gap: 18px;
}

.home-header,
.home-main {
  background: rgb(255 255 255 / 78%);
  border: 1px solid rgb(255 255 255 / 72%);
  border-radius: 8px;
  box-shadow: 0 14px 38px rgb(58 84 74 / 10%);
  backdrop-filter: blur(14px);
}

.home-header {
  position: relative;
  z-index: 3;
  height: 64px;
  display: flex;
  align-items: center;
  color: #253d38;
  font-weight: 600;
}

.home-main {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 118px);
  color: #334b45;
}
</style>

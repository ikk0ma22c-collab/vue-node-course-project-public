<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :collapse-transition="false"
    :default-active="activeMenu"
  >
    <div class="logo" :class="{ 'is-collapse': isCollapse }">
      <img src="../assets/logo.ico" alt="Logo" />
      <span class="logo-text">培训管理系统</span>
    </div>

    <el-menu-item index="dashboard" @click="handleDashboardClick">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><List /></el-icon>
        <span>项目管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" @click="handleProjectClick('2-1', 'front')">
          前端项目
        </el-menu-item>
        <el-menu-item index="2-2" @click="handleProjectClick('2-2', 'back')">
          后端项目
        </el-menu-item>
        <el-menu-item index="2-3" @click="handleProjectClick('2-3', 'all')">
          全栈项目
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" @click="handleMenuClick('3-1')">用户1</el-menu-item>
        <el-menu-item index="3-2" @click="handleMenuClick('3-2')">用户2</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>导航</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" @click="handleMenuClick('4-1')">菜单一</el-menu-item>
        <el-menu-item index="4-2" @click="handleMenuClick('4-2')">菜单二</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { House, List, Location, User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['show-dashboard'])
const router = useRouter()
const activeMenu = ref('')

const handleDashboardClick = async () => {
  activeMenu.value = 'dashboard'
  await router.push('/home/dashboard')
  emit('show-dashboard')
}

const handleMenuClick = (index) => {
  if (activeMenu.value === index) {
    activeMenu.value = ''
    return
  }

  activeMenu.value = index
}

const handleProjectClick = async (index, category) => {
  if (activeMenu.value === index) {
    activeMenu.value = ''
    await router.push('/home/course')
    return
  }

  activeMenu.value = index
  await router.push({ path: '/home/course', query: { category } })
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  width: 100%;
  min-width: 0;
  height: 100%;
  border-right: none;
  background: transparent;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px 0 18px;
  border-bottom: 1px solid rgb(72 124 103 / 12%);
  transition: padding 0.24s ease;
}

.logo.is-collapse {
  justify-content: center;
  padding: 0;
}

.logo img {
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  flex: 0 0 40px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
  box-shadow: 0 8px 18px rgb(57 119 91 / 16%);
}

.logo.is-collapse img {
  width: 40px;
  height: 40px;
  flex-basis: 40px;
}

.logo-text {
  min-width: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  color: #253d38;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    opacity 0.18s ease,
    width 0.18s ease;
}

.logo.is-collapse .logo-text {
  width: 0;
  opacity: 0;
}

:deep(.el-sub-menu__title),
:deep(.el-menu-item) {
  font-weight: 700;
  color: #344b45;
}

:deep(.el-sub-menu__title span) {
  font-weight: 700;
}

:deep(.el-icon) {
  color: #2f8d69;
}

:deep(.el-menu-item.is-active) {
  color: #1f7254;
  background: rgb(47 141 105 / 14%);
}

:deep(.el-menu-item.is-active::before) {
  content: '';
  width: 4px;
  height: 18px;
  margin-right: 8px;
  border-radius: 999px;
  background: #2f8d69;
}
</style>

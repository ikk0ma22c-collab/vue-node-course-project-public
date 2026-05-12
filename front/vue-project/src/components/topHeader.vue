<template>
  <div class="header">
    <button
      class="home-icon"
      :class="{ 'is-collapse': isCollapse }"
      type="button"
      aria-label="Toggle sidebar"
      :aria-pressed="isCollapse"
      @click="$emit('toggle-aside')"
    >
      <el-icon class="home-icon-arrow"><Expand /></el-icon>
      <div class="home-text">首页</div>
    </button>

    <div class="user">
      <img v-if="userInfo.head_img" :src="userInfo.head_img" alt="User avatar" />
      <span v-else class="user-avatar">{{ userInfo.name.slice(0, 1) || 'U' }}</span>
      <div class="user-panel">
        <div class="user-name">{{ userInfo.name || '未命名用户' }}</div>
        <button class="logout" type="button" @click="handleLogout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Expand } from '@element-plus/icons-vue'
import { getuserinfo } from '@/api/index.js'
import { onMounted, reactive } from 'vue'
import router from '@/router'

const userInfo = reactive({
  name: '',
  head_img: '',
})

const getuserinfodata = async () => {
  try {
    const res = await getuserinfo()
    const data = res?.user || res || {}

    userInfo.name = data.name || data.username || data.nickname || data.userName || ''
    userInfo.head_img = data.head_img || data.headImg || data.avatar || data.avatar_url || ''
  } catch {
    userInfo.name = ''
    userInfo.head_img = ''
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.replace('/login')
}

onMounted(() => {
  getuserinfodata()
})

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-aside'])
</script>

<style scoped>
.header {
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-icon {
  height: 38px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 0;
  border-radius: 8px;
  color: #2f8d69;
  background: rgb(47 141 105 / 10%);
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.home-icon:hover {
  color: #fff;
  background: #2f8d69;
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgb(47 141 105 / 18%);
}

.home-icon-arrow {
  color: inherit;
  font-size: 18px;
  transform: rotate(180deg);
  transition: transform 0.24s ease;
}

.home-icon.is-collapse .home-icon-arrow {
  transform: rotate(0deg);
}

.home-text {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

.user {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 18px;
}

.user img,
.user-avatar {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  border-radius: 50%;
  border: 2px solid rgb(255 255 255 / 88%);
  box-shadow: 0 8px 18px rgb(43 91 73 / 16%);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.user img {
  object-fit: cover;
}

.user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  background: #2f8d69;
}

.user:hover img,
.user:focus-within img,
.user:hover .user-avatar,
.user:focus-within .user-avatar {
  transform: translateY(-1px);
  border-color: rgb(47 141 105 / 34%);
  box-shadow: 0 10px 22px rgb(43 91 73 / 22%);
}

.user::after {
  content: '';
  position: absolute;
  top: 38px;
  right: 50%;
  width: 132px;
  height: 16px;
  transform: translateX(50%);
}

.user-panel {
  position: absolute;
  z-index: 20;
  top: calc(100% + 10px);
  right: 50%;
  box-sizing: border-box;
  width: 128px;
  padding: 10px;
  border-radius: 8px;
  background: linear-gradient(180deg, rgb(250 254 252 / 98%), rgb(239 249 244 / 98%));
  border: 1px solid rgb(72 124 103 / 16%);
  box-shadow: 0 16px 30px rgb(58 84 74 / 16%);
  backdrop-filter: blur(12px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate(50%, -6px);
  transition:
    opacity 0.18s ease,
    visibility 0.18s ease,
    transform 0.18s ease;
}

.user:hover .user-panel,
.user:focus-within .user-panel {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translate(50%, 0);
}

.user-name {
  padding: 4px 6px 7px;
  font-size: 13px;
  font-weight: 700;
  color: #253d38;
  text-align: center;
  border-bottom: 1px solid rgb(72 124 103 / 12%);
}

.logout {
  width: 100%;
  min-width: 92px;
  height: 30px;
  margin-top: 7px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  color: #2f8d69;
  font-size: 12px;
  font-weight: 700;
  line-height: 30px;
  white-space: nowrap;
  background: rgb(47 141 105 / 10%);
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.logout:hover {
  color: #fff;
  background: #2f8d69;
  box-shadow: 0 8px 16px rgb(47 141 105 / 18%);
}
</style>

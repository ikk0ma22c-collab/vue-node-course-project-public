<template>
  <div class="register">
    <div class="tech-grid"></div>
    <div class="pulse pulse-one"></div>
    <div class="pulse pulse-two"></div>

    <div class="register-box">
      <div class="brand">
        <span class="brand-mark">X</span>
        <div>
          <h2>XX课堂管理系统</h2>
          <p>企业员工培训教育平台</p>
        </div>
      </div>

      <el-form
        ref="registerFormRef"
        class="register-form"
        :model="registerForm"
        :rules="rules"
        @keyup.enter="handleRegister"
      >
        <el-form-item prop="username">
          <el-input v-model.trim="registerForm.username" size="large" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            size="large"
            placeholder="请输入密码"
            type="password"
          >
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-button class="register-button" type="primary" size="large" @click="handleRegister">
          注册
        </el-button>

        <RouterLink class="login-link" to="/login"> 已有账号？立即登录 </RouterLink>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Key } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '../router/index.js'
import { getRegister } from '@/api/index.js'

const registerFormRef = ref(null)

const registerForm = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const handleRegister = () => {
  registerFormRef.value.validate((valid) => {
    if (!valid) {
      ElMessage.error('请先填写用户名和密码')
      return
    }
    getRegisterDate()
  })
}

const getRegisterDate = async () => {
  try {
    const res = await getRegister({
      name: registerForm.username,
      pwd: registerForm.password,
    })

    if (res?.message) {
      ElMessage.error(res.message)
      return
    }

    ElMessage.success('注册成功')
    router.push('/login')
  } catch (error) {
    ElMessage.error(error?.message || '注册失败')
  }
}
</script>
<style lang="less" scoped>
.register {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 24px;
  background:
    radial-gradient(circle at 18% 20%, rgb(42 139 255 / 24%), transparent 30%),
    radial-gradient(circle at 80% 74%, rgb(0 209 255 / 18%), transparent 34%),
    linear-gradient(135deg, #edf6ff 0%, #f8fbff 45%, #e7f1ff 100%);
}

.tech-grid {
  position: absolute;
  inset: 0;
  opacity: 0.34;
  background-image:
    linear-gradient(rgb(36 123 255 / 12%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(36 123 255 / 12%) 1px, transparent 1px);
  background-size: 42px 42px;
  animation: gridMove 18s linear infinite;
}

.pulse {
  position: absolute;
  width: 360px;
  height: 360px;
  border: 1px solid rgb(47 125 255 / 18%);
  border-radius: 50%;
  background: rgb(255 255 255 / 24%);
  filter: blur(1px);
  animation: floatPulse 8s ease-in-out infinite;
}

.pulse-one {
  left: 9%;
  top: 14%;
}

.pulse-two {
  right: 8%;
  bottom: 10%;
  animation-delay: -3s;
}

.register-box {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 390px;
  padding: 34px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: rgb(255 255 255 / 86%);
  border: 1px solid rgb(255 255 255 / 72%);
  border-radius: 8px;
  box-shadow: 0 22px 60px rgb(33 91 160 / 18%);
  backdrop-filter: blur(16px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 8px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 8px;
  background: linear-gradient(135deg, #1677ff, #37c8ff);
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  box-shadow: 0 10px 22px rgb(22 119 255 / 28%);
}

.brand h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #17324d;
}

.brand p {
  margin: 4px 0 0;
  font-size: 13px;
  color: #5f7894;
}

.register-button {
  width: 100%;
  margin-top: 4px;
  border: none;
  background: linear-gradient(90deg, #1677ff, #20b7ff);
  box-shadow: 0 10px 20px rgb(22 119 255 / 22%);
}

.login-link {
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 0;
  text-align: center;
  color: #1677ff;
  background: transparent !important;
  font-size: 14px;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.login-link:hover {
  color: #0b5ed7;
  background: transparent !important;
  transform: scale(1.04);
}

@keyframes gridMove {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 84px 84px;
  }
}

@keyframes floatPulse {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0.55;
  }

  50% {
    transform: translate3d(18px, -16px, 0) scale(1.06);
    opacity: 0.85;
  }
}
</style>

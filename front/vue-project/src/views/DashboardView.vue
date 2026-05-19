<template>
  <div class="dashboard">
    <el-card class="welcome-card" shadow="never">
      <div class="welcome-content">
        <div>
          <h2>欢迎回来，管理员</h2>
          <p>这里是课程管理系统工作台，可以快速查看课程数据和进入常用功能。</p>
        </div>
      </div>
    </el-card>

    <el-row :gutter="16">
      <el-col :xs="12" :sm="12" :md="6" v-for="item in statList" :key="item.label">
        <el-card class="stat-card" shadow="hover">
          <p>{{ item.label }}</p>
          <h3>{{ item.value }}</h3>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="quick-card" shadow="never">
      <template #header>
        <span>快捷入口</span>
      </template>

      <el-row :gutter="16">
        <el-col :xs="24" :sm="12">
          <el-card class="quick-entry" shadow="hover" @click="goCourse">
            <div class="quick-entry-header">
              <el-icon><Collection /></el-icon>
              <h4>课程管理</h4>
            </div>
            <p>查看课程列表，完成搜索、新增、编辑和删除课程等操作。</p>
            <el-button type="primary" size="small">进入课程管理</el-button>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="12">
          <el-card class="quick-entry is-disabled" shadow="hover">
            <div class="quick-entry-header">
              <el-icon><User /></el-icon>
              <h4>用户管理</h4>
            </div>
            <p>后续可扩展用户列表、角色权限和账号状态管理。</p>
            <el-button type="info" size="small" disabled>待开发</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="recent-card" shadow="never">
      <template #header>
        <span>最近课程</span>
      </template>

      <el-table
        v-loading="loading"
        :data="recentCourses"
        empty-text="暂无课程数据"
        style="width: 100%"
      >
        <el-table-column prop="title" label="课程名称" />
        <el-table-column prop="categoryName" label="分类" width="140" />
        <el-table-column prop="priceText" label="价格" width="120" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :class="['course-status', row.statusClass]" effect="plain">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Collection, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { getCourseList } from '@/api/index.js'

const router = useRouter()
const loading = ref(false)
const courseList = ref([])

const categoryMap = {
  front: '前端课程',
  back: '后端课程',
  all: '全栈课程',
  python: 'Python',
}

const statusMap = {
  0: '草稿',
  1: '已上架',
  2: '已下架',
}

const statusClassMap = {
  0: 'status-draft',
  1: 'status-on',
  2: 'status-off',
}

const normalizeStatus = (status) => Number(status ?? 0)

const statList = computed(() => [
  { label: '课程总数', value: courseList.value.length },
  { label: '前端课程', value: getCategoryCount('front') },
  { label: '后端课程', value: getCategoryCount('back') },
  { label: '全栈课程', value: getCategoryCount('all') },
])

const recentCourses = computed(() =>
  [...courseList.value]
    .sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
    .slice(0, 4)
    .map((course) => ({
      ...course,
      categoryName: categoryMap[course.category] || '精品课程',
      priceText: `¥${course.price ?? 0}`,
      status: statusMap[normalizeStatus(course.status)] || '草稿',
      statusClass: statusClassMap[normalizeStatus(course.status)] || 'status-draft',
    })),
)

const getCategoryCount = (category) =>
  courseList.value.filter((course) => course.category === category).length

const getAllCourses = async () => {
  loading.value = true

  try {
    const firstRes = await getCourseList({ page: 1, size: 10 })
    const firstList = Array.isArray(firstRes?.list) ? firstRes.list : []
    const total = Number(firstRes?.count?.[0]?.total || firstList.length)
    const res = total > firstList.length ? await getCourseList({ page: 1, size: total }) : firstRes

    courseList.value = Array.isArray(res?.list) ? res.list : []
  } catch (error) {
    courseList.value = []
    ElMessage.error('课程数据加载失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const goCourse = () => {
  router.push('/home/course')
}

onMounted(() => {
  getAllCourses()
})
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.welcome-card,
.quick-card,
.recent-card,
.stat-card {
  border-radius: 8px;
}

.welcome-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.welcome-content h2 {
  margin: 0 0 8px;
  color: #253d38;
}

.welcome-content p {
  margin: 0;
  color: #66756f;
}

.stat-card {
  margin-bottom: 16px;
}

.stat-card p {
  margin: 0;
  color: #66756f;
}

.stat-card h3 {
  margin: 12px 0 0;
  color: #253d38;
  font-size: 28px;
}

.quick-entry {
  min-height: 150px;
  cursor: pointer;
}

.quick-entry.is-disabled {
  cursor: default;
}

.quick-entry-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.quick-entry-header .el-icon {
  color: #2f8d69;
  font-size: 20px;
}

.quick-entry h4 {
  margin: 0;
  color: #253d38;
}

.quick-entry p {
  min-height: 42px;
  margin: 0 0 14px;
  color: #66756f;
  font-size: 14px;
  line-height: 1.5;
}

.course-status.status-draft {
  border-color: rgb(224 168 0 / 28%);
  color: #9b6a00;
  background: rgb(255 193 7 / 18%);
}

.course-status.status-on {
  border-color: rgb(47 141 105 / 28%);
  color: #247b56;
  background: rgb(47 141 105 / 14%);
}

.course-status.status-off {
  border-color: rgb(112 122 133 / 24%);
  color: #6b7280;
  background: rgb(112 122 133 / 12%);
}
</style>

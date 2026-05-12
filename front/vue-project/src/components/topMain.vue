<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import asideTable from './asideTable.vue'
import EditPop from './EditPop.vue'
import AddPop from './addPop.vue'
import Pagination from './Pagination.vue'
import { getCourseList, changeCourse, deleteCourseData, addCourse } from '@/api/index.js'
import emitter from '@/utils/eventBus.js'

const pageSize = ref(7)
const totalCount = ref(0)
const currentCategory = ref('')
const currentPage = ref(1)
const editPopVisible = ref(false)
const addPopVisible = ref(false)
const currentCourse = ref({})
const courseList = ref([])

const searchForm = ref({
  keyword: '',
})

const getCourseListdate = async (query = {}) => {
  const page = query.page || currentPage.value || 1
  const size = query.size || pageSize.value
  const category = query.category ?? currentCategory.value
  const params = { page, size }

  if (category) {
    params.category = category
  }

  const res = await getCourseList(params)
  const list = Array.isArray(res?.list) ? res.list : []

  courseList.value = list.map((item) => ({
    ...item,
    courseImg: item.courseImg || item.course_img || item.img || item.cover || item.cover_img || '',
  }))
  totalCount.value = Number(res?.count?.[0]?.total || courseList.value.length)
}

onMounted(() => {
  getCourseListdate()
  emitter.on('project-category-change', handleProjectCategoryChange)
})

onUnmounted(() => {
  emitter.off('project-category-change', handleProjectCategoryChange)
})

const handleProjectCategoryChange = (category) => {
  currentCategory.value = category || ''
  currentPage.value = 1
  getCourseListdate({ page: 1, category: currentCategory.value })
}

const filteredCourseList = computed(() => {
  const keyword = searchForm.value.keyword.trim().toLowerCase()

  if (!keyword) return courseList.value

  return courseList.value.filter((course) => course.title.toLowerCase().includes(keyword))
})

const totalPage = computed(() =>
  Math.max(Math.ceil((totalCount.value || filteredCourseList.value.length) / pageSize.value), 1),
)

const pageCourseList = computed(() => filteredCourseList.value)

watch(
  () => searchForm.value.keyword,
  () => {
    currentPage.value = 1
  },
)

const handleSearch = () => {
  currentPage.value = 1
}

const resetSearch = () => {
  searchForm.value.keyword = ''
  currentPage.value = 1
}

const changePage = (page) => {
  if (page < 1 || page > totalPage.value) return

  currentPage.value = page
  getCourseListdate({ page, category: currentCategory.value })
}

const updateCourseData = async (query) => {
  const { title, price, id } = query
  await changeCourse({ title, price, id })
}

const deleteCourse = async (course) => {
  try {
    await ElMessageBox.confirm(`确定删除《${course.title}》吗？`, '删除确认', {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })

    await deleteCourseData({ id: course.id })
    courseList.value = courseList.value.filter((item) => item.id !== course.id)
    totalCount.value = Math.max(totalCount.value - 1, 0)

    if (currentPage.value > totalPage.value) {
      currentPage.value = totalPage.value
      await getCourseListdate({ page: currentPage.value, category: currentCategory.value })
    }

    ElMessage.success('删除成功')
  } catch (error) {
    if (error === 'cancel' || error === 'close') {
      ElMessage.info('已取消删除')
      return
    }

    console.error(error)
  }
}

const openEditPop = (course) => {
  currentCourse.value = { ...course }
  editPopVisible.value = true
}

const closeEditPop = () => {
  editPopVisible.value = false
}

const openAddPop = () => {
  addPopVisible.value = true
}

const closeAddPop = () => {
  addPopVisible.value = false
}

const saveCourse = async (form) => {
  const index = courseList.value.findIndex((item) => item.id === form.id)

  if (index === -1) {
    ElMessage.error('没有找到要修改的课程')
    return
  }

  await updateCourseData({ title: form.title, price: form.price, id: form.id })
  courseList.value[index] = {
    ...courseList.value[index],
    title: form.title,
    price: form.price,
  }

  closeEditPop()
  ElMessage.success('修改成功')
}

const addcourse = async (form) => {
  await addCourse(form)
  closeAddPop()
  currentPage.value = 1
  await getCourseListdate({ page: 1, category: currentCategory.value })
  ElMessage.success('添加成功')
}
</script>

<template>
  <div class="main-panel">
    <el-form :model="searchForm" class="search-form" inline @submit.prevent>
      <el-form-item class="search-item">
        <el-input
          v-model.trim="searchForm.keyword"
          clearable
          placeholder="请输入搜索内容"
          @clear="resetSearch"
          @keyup.enter="handleSearch"
        />
      </el-form-item>
      <el-form-item class="button-item">
        <el-button type="primary" size="small" @click="handleSearch">搜索</el-button>
        <el-button size="small" @click="resetSearch">重置</el-button>
      </el-form-item>
      <el-form-item class="add-item">
        <el-button class="add-course-btn" type="success" :icon="Plus" @click="openAddPop">
          添加课程
        </el-button>
      </el-form-item>
    </el-form>

    <asideTable :list="pageCourseList" @delete-course="deleteCourse" @edit-course="openEditPop" />

    <Pagination :current-page="currentPage" :total-page="totalPage" @change-page="changePage" />

    <EditPop
      :visible="editPopVisible"
      :course="currentCourse"
      @close="closeEditPop"
      @save="saveCourse"
    />

    <AddPop :visible="addPopVisible" @close="closeAddPop" @save="addcourse" />
  </div>
</template>

<style scoped>
.main-panel {
  width: 100%;
  min-height: calc(100vh - 158px);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid rgb(72 124 103 / 12%);
  border-radius: 8px;
  background: rgb(255 255 255 / 88%);
}

.search-form :deep(.el-form-item) {
  margin-right: 0;
  margin-bottom: 0;
}

.search-form :deep(.el-input) {
  width: 240px;
}

.button-item :deep(.el-button + .el-button) {
  margin-left: 6px;
}

.add-item {
  margin-left: auto;
}

.add-course-btn {
  min-width: 108px;
  border: 0;
  box-shadow: 0 8px 18px rgb(47 141 105 / 18%);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.add-course-btn:hover {
  box-shadow: 0 12px 22px rgb(47 141 105 / 24%);
  filter: brightness(1.03);
  transform: translateY(-1px);
}

.add-course-btn:active {
  box-shadow: 0 5px 12px rgb(47 141 105 / 18%);
  transform: translateY(1px) scale(0.98);
}

@media (max-width: 720px) {
  .search-form {
    align-items: stretch;
    flex-wrap: wrap;
  }

  .search-item,
  .search-form :deep(.el-input),
  .button-item,
  .add-item,
  .add-course-btn {
    width: 100%;
  }

  .add-item {
    margin-left: 0;
  }
}
</style>

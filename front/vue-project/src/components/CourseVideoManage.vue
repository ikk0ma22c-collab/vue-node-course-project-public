<template>
  <div class="course-video-manage">
    <el-card shadow="never">
      <div class="page-header">
        <div>
          <h2>课时管理</h2>
          <p>当前课程：{{ courseTitle }}</p>
        </div>

        <div>
          <el-button @click="goBack">返回课程管理</el-button>
          <el-button type="primary" @click="openAddDialog">新增课时</el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="table-card">
      <el-table v-loading="loading" :data="videoList" empty-text="暂无课时数据" style="width: 100%">
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="title" label="课时标题" min-width="220" />

        <el-table-column prop="video_url" label="视频地址" min-width="300">
          <template #default="{ row }">
            <el-link type="primary" :href="row.video_url" target="_blank">
              {{ row.video_url }}
            </el-link>
          </template>
        </el-table-column>

        <el-table-column prop="duration" label="时长" width="120" />

        <el-table-column label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" plain @click="openEditDialog(row)">
              编辑
            </el-button>
            <el-button size="small" type="success" plain @click="previewVideo(row)">
              预览
            </el-button>
            <el-button size="small" type="danger" plain @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑课时' : '新增课时'" width="520px">
      <el-form ref="formRef" :model="videoForm" :rules="rules" label-width="90px">
        <el-form-item label="课时标题" prop="title">
          <el-input v-model.trim="videoForm.title" placeholder="请输入课时标题" />
        </el-form-item>

        <el-form-item label="视频地址" prop="video_url">
          <el-input v-model.trim="videoForm.video_url" placeholder="请输入视频地址" />
        </el-form-item>

        <el-form-item label="视频时长" prop="duration">
          <el-input v-model.trim="videoForm.duration" placeholder="例如 12:30" />
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="videoForm.sort" :min="0" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitVideoForm">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="previewVisible" title="视频预览" width="700px">
      <video v-if="previewUrl" :src="previewUrl" controls style="width: 100%"></video>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCourseVideoList, addCourseVideo, updateCourseVideo, deleteCourseVideo } from '@/api'

const route = useRoute()
const router = useRouter()

const courseId = computed(() => Number(route.params.courseId))
const courseTitle = computed(() => route.query.title || '未知课程')

const loading = ref(false)
const videoList = ref([])

const dialogVisible = ref(false)
const previewVisible = ref(false)
const previewUrl = ref('')

const isEdit = ref(false)
const formRef = ref(null)

const videoForm = reactive({
  id: null,
  course_id: courseId.value,
  title: '',
  video_url: '',
  duration: '',
  sort: 0,
})

const rules = {
  title: [{ required: true, message: '请输入课时标题', trigger: 'blur' }],
  video_url: [{ required: true, message: '请输入视频地址', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序', trigger: 'change' }],
}

const getVideoList = async () => {
  loading.value = true

  try {
    const res = await getCourseVideoList({
      course_id: courseId.value,
    })

    videoList.value = Array.isArray(res) ? res : []
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  videoForm.id = null
  videoForm.course_id = courseId.value
  videoForm.title = ''
  videoForm.video_url = ''
  videoForm.duration = ''
  videoForm.sort = 0

  formRef.value?.clearValidate()
}

const openAddDialog = () => {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const openEditDialog = (row) => {
  isEdit.value = true

  videoForm.id = row.id
  videoForm.course_id = row.course_id
  videoForm.title = row.title
  videoForm.video_url = row.video_url
  videoForm.duration = row.duration || ''
  videoForm.sort = Number(row.sort) || 0

  dialogVisible.value = true
}

const submitVideoForm = async () => {
  await formRef.value.validate()

  if (isEdit.value) {
    await updateCourseVideo({
      id: videoForm.id,
      title: videoForm.title,
      video_url: videoForm.video_url,
      duration: videoForm.duration,
      sort: videoForm.sort,
    })

    ElMessage.success('修改课时成功')
  } else {
    await addCourseVideo({
      course_id: videoForm.course_id,
      title: videoForm.title,
      video_url: videoForm.video_url,
      duration: videoForm.duration,
      sort: videoForm.sort,
    })

    ElMessage.success('新增课时成功')
  }

  dialogVisible.value = false
  getVideoList()
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定删除「${row.title}」吗？`, '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await deleteCourseVideo({
      id: row.id,
    })

    ElMessage.success('删除课时成功')
    getVideoList()
  } catch (error) {
    if (error === 'cancel' || error === 'close') {
      ElMessage.info('已取消删除')
    }
  }
}

const previewVideo = (row) => {
  previewUrl.value = row.video_url
  previewVisible.value = true
}

const goBack = () => {
  router.push('/home/course')
}

onMounted(() => {
  getVideoList()
})
</script>

<style scoped>
.course-video-manage {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h2 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #666;
}

.table-card {
  min-height: 400px;
}
</style>

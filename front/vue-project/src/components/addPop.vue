<template>
  <el-dialog
    :model-value="visible"
    title="添加课程"
    width="500px"
    destroy-on-close
    @close="handleClose"
  >
    <el-form ref="addFormRef" :model="addForm" :rules="rules" label-width="86px">
      <el-form-item label="课程标题" prop="title">
        <el-input v-model.trim="addForm.title" placeholder="请输入课程标题" maxlength="100" />
      </el-form-item>

      <el-form-item label="课程价格" prop="price">
        <el-input-number
          v-model="addForm.price"
          :min="0"
          :precision="2"
          :step="1"
          controls-position="right"
          placeholder="请输入课程价格"
        />
      </el-form-item>

      <el-form-item label="课程类型" prop="category">
        <el-select v-model="addForm.category" placeholder="请选择课程类型">
          <el-option label="前端开发" value="front" />
          <el-option label="后端开发" value="backend" />
          <el-option label="Python" value="python" />
          <el-option label="全栈开发" value="fullstack" />
        </el-select>
      </el-form-item>

      <el-form-item label="课程图片" prop="course_img">
        <el-input v-model.trim="addForm.course_img" placeholder="请输入课程图片地址" />
      </el-form-item>

      <el-form-item label="评分" prop="point">
        <el-input-number
          v-model="addForm.point"
          :min="0"
          :max="10"
          :precision="1"
          :step="0.5"
          controls-position="right"
          placeholder="请输入评分"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定添加</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'save'])

const defaultForm = () => ({
  title: '',
  price: undefined,
  category: '',
  course_img: '',
  point: undefined,
})

const addFormRef = ref(null)
const addForm = reactive(defaultForm())

const rules = {
  title: [
    { required: true, message: '课程标题不能为空', trigger: 'blur' },
    { min: 1, max: 100, message: '课程标题不能超过100个字符', trigger: 'blur' },
  ],
  price: [{ required: true, type: 'number', message: '课程价格不能为空', trigger: 'change' }],
  category: [{ required: true, message: '请选择课程类型', trigger: 'change' }],
  point: [{ required: true, type: 'number', message: '评分不能为空', trigger: 'change' }],
}

const resetForm = () => {
  Object.assign(addForm, defaultForm())
  addFormRef.value?.clearValidate()
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) resetForm()
  },
)

const handleClose = () => {
  resetForm()
  emit('close')
}

const handleSubmit = () => {
  addFormRef.value.validate((valid) => {
    if (!valid) return

    emit('save', {
      title: addForm.title,
      price: addForm.price,
      category: addForm.category,
      course_img: addForm.course_img,
      point: addForm.point,
    })
  })
}
</script>

<style scoped>
:deep(.el-dialog) {
  border-radius: 8px;
}

:deep(.el-dialog__header) {
  padding-bottom: 14px;
  border-bottom: 1px solid rgb(72 124 103 / 12%);
}

:deep(.el-dialog__body) {
  padding: 22px 24px 10px;
}

:deep(.el-dialog__footer) {
  padding: 14px 24px 20px;
}

:deep(.el-input-number),
:deep(.el-select) {
  width: 100%;
}
</style>

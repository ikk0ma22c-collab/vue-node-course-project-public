<template>
  <el-dialog
    :model-value="visible"
    title="编辑课程"
    width="460px"
    destroy-on-close
    @close="handleClose"
  >
    <el-form ref="editFormRef" :model="editForm" :rules="rules" label-width="86px">
      <el-form-item label="课程标题" prop="title">
        <el-input v-model.trim="editForm.title" placeholder="请输入课程标题" />
      </el-form-item>

      <el-form-item label="课程价格" prop="price">
        <el-input v-model.trim="editForm.price" placeholder="请输入课程价格" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定修改</el-button>
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
  course: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['close', 'save'])

const editFormRef = ref(null)
const editForm = reactive({
  id: '',
  title: '',
  price: '',
})

const rules = {
  title: [{ required: true, message: '课程标题不能为空', trigger: 'blur' }],
  price: [{ required: true, message: '课程价格不能为空', trigger: 'blur' }],
}

watch(
  () => props.course,
  (course) => {
    editForm.id = course?.id ?? ''
    editForm.title = course?.title ?? ''
    editForm.price = course?.price ?? ''
    editFormRef.value?.clearValidate()
  },
  { immediate: true },
)

const handleClose = () => {
  editFormRef.value?.clearValidate()
  emit('close')
}

const handleSubmit = () => {
  editFormRef.value.validate((valid) => {
    if (!valid) return

    emit('save', {
      id: editForm.id,
      title: editForm.title,
      price: editForm.price,
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
</style>

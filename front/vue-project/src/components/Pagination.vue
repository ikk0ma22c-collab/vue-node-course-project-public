<template>
  <div class="pagination">
    <el-button
      size="small"
      :disabled="currentPage <= 1"
      @click="$emit('change-page', currentPage - 1)"
    >
      上一页
    </el-button>

    <span class="page-text">第 {{ currentPage }} 页 / 共 {{ totalPage }} 页</span>

    <el-button
      size="small"
      :disabled="currentPage >= totalPage"
      @click="$emit('change-page', currentPage + 1)"
    >
      下一页
    </el-button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPage: {
    type: Number,
    default: 1,
  },
})

defineEmits(['change-page'])
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 2px 0 0;
}

.page-text {
  min-width: 120px;
  color: #334b45;
  font-size: 13px;
  text-align: center;
}
</style>

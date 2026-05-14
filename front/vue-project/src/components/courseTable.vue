<template>
  <div class="course-table">
    <el-table
      :data="list"
      :row-class-name="tableRowClassName"
      empty-text="暂无课程数据"
      stripe
      height="100%"
    >
      <el-table-column prop="courseImg" label="课程图片" width="150">
        <template #default="{ row }">
          <img :src="row.courseImg" :alt="row.title" class="course-img" />
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程标题" min-width="340">
        <template #default="{ row }">
          <div class="course-title">{{ row.title }}</div>
          <el-tag class="course-category" size="small" effect="plain">
            {{ getCategoryName(row.category) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="price" label="课程价格" width="120" align="center">
        <template #default="{ row }">
          <span class="course-price">￥{{ row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="point" label="课程评分" width="170" align="center">
        <template #default="{ row }">
          <div class="course-rating">
            <el-rate
              :model-value="Number(row.point) / 2"
              disabled
              allow-half
              size="small"
              text-color="#ff9900"
            />
            <span class="course-point">{{ row.point }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="230" fixed="right" align="center">
        <template #default="{ row }">
          <div class="action-buttons">
            <el-button class="video-btn" type="success" size="small" plain @click="manageVideos(row)">
              课时管理
            </el-button>
            <el-button type="primary" size="small" plain @click="$emit('edit-course', row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" plain @click="$emit('delete-course', row)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['delete-course', 'edit-course', 'manage-videos'])

const manageVideos = (row) => {
  emit('manage-videos', row)
}

const categoryMap = {
  front: '前端开发',
  back: '后端开发',
  all: '全栈开发',
  python: 'Python',
}

const getCategoryName = (category) => categoryMap[category] || '精品课程'

const tableRowClassName = ({ rowIndex }) =>
  rowIndex % 2 === 0 ? 'course-row-even' : 'course-row-odd'
</script>

<style scoped>
.course-table {
  flex: 1;
  min-height: 520px;
  overflow: hidden;
  border: 1px solid rgb(72 124 103 / 12%);
  border-radius: 8px;
  background: rgb(255 255 255 / 88%);
  box-shadow: 0 14px 30px rgb(58 84 74 / 8%);
}

.course-table :deep(.el-table) {
  --el-table-header-bg-color: #f0f8f4;
  --el-table-header-text-color: #263f39;
  --el-table-row-hover-bg-color: #eef8f3;
  color: #334b45;
}

.course-table :deep(.el-table__header th) {
  height: 44px;
  font-weight: 700;
}

.course-table :deep(.el-table__cell) {
  padding: 8px 0;
}

.course-table :deep(.course-row-even) {
  background-color: rgb(255 255 255 / 92%);
}

.course-table :deep(.course-row-odd) {
  background-color: rgb(248 252 250 / 92%);
}

.course-img {
  width: 104px;
  height: 56px;
  display: block;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 8px 18px rgb(45 78 68 / 14%);
}

.course-title {
  max-width: 560px;
  margin-bottom: 6px;
  overflow: hidden;
  color: #213c36;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-category {
  border-color: rgb(47 141 105 / 24%);
  color: #2f8d69;
  background: rgb(47 141 105 / 8%);
}

.course-price {
  color: #e35d36;
  font-size: 16px;
  font-weight: 800;
}

.course-rating {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 136px;
}

.course-point {
  color: #8a6d28;
  font-size: 12px;
  font-weight: 700;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 2px 0;
}

.action-buttons :deep(.el-button) {
  margin-left: 0;
}

.video-btn {
  min-width: 86px;
}
</style>

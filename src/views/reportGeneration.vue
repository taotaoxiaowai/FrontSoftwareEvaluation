<template>
  <el-row style="margin-top: 10px;margin-bottom: 10px;" class="operation_shadow">
    <el-col :span="2">
      <el-row>
        <div>
          <el-button size="medium" type="primary" @click="searchProject()" :icon="Files">批量生成</el-button>
        </div>
      </el-row>
    </el-col>
    <el-col :span="5">
      <el-row>
        <el-text size="medium" style="margin-right: 10px;">查询方式</el-text>
        <el-select-v2
            v-model="queryType"
            placeholder="请选择查询方式"
            :options="options"
            size="medium"
            :style="{ width: smallScreen ? '160px' : '200px' ,}"
        />
      </el-row>
    </el-col>
    <el-col :span="5">
      <el-text size="medium">查询参数</el-text>
      <el-input v-model="searchProp" style="width: 160px;margin-left: 10px;" placeholder="请输入搜索关键词" size="medium" />
    </el-col>
    <el-col :span="4">
      <el-row>
        <div>
          <el-button size="medium" type="primary" @click="searchProject()" :icon="Search">搜索</el-button>
          <el-button size="medium" :icon="RefreshLeft" @click="reset()">重置</el-button>
        </div>
      </el-row>
    </el-col>
  </el-row>
  <el-table :data="ProjectTableData" style="width: 100%">
    <el-table-column type="selection" label="选择" align="center" />
    <el-table-column prop="id" label="项目编号" align="center" />
    <el-table-column prop="project_name" label="项目名称" align="center" />
    <el-table-column prop="state" label="项目状态" align="center" />
    <el-table-column fixed="right" label="操作" min-width="60" align="center">
      <template #default="scope">
        <el-tooltip content="预览报告" effect="light" placement="top">
          <el-button type="primary" :icon="View" @click="handlePreview(scope.row); drawer = true"
            style="margin-right: 10px;" circle />
        </el-tooltip>
        <el-tooltip content="生成并下载报告" effect="light" placement="top">
          <el-button type="danger" :icon="Document" circle style="margin-right: 10px;"
            @click="downloadReport(scope.row)" /></el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPage1" :page-size="100" :size="size" :disabled="disabled"
      :background="background" layout="total,pager, prev, next,jumper" :total="totalItems"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-drawer v-model="drawer" title="报告预览" :direction="direction" :before-close="handleClose" :size="800">
      <el-row>
        <el-text class="mx-1">报告模板</el-text>
        <el-radio-group v-model="templateStyle" style="margin-left: 10px;">
          <el-radio value="one">模板1</el-radio>
          <el-radio value="two">模板2</el-radio>
          <el-radio value="three">模板3</el-radio>
        </el-radio-group>
      </el-row>
      <span v-for="(item, index) in 100000" :key="index">测试</span>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Project } from '@/types/ProjectType'
import { Search, RefreshLeft, Document, Files, View } from '@element-plus/icons-vue'
import type { ComponentSize, DrawerProps } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import service from '@/api';
import { da, fi } from 'element-plus/es/locale';
export default defineComponent({
  name: 'ProjectGenerationComponent',
  setup() {
    const smallScreen = ref(window.innerWidth < 768);
    let ProjectTableData = ref<Project[]>([])
    let searchProp = ref()
    const currentPage1 = ref(5)
    const size = ref<ComponentSize>('default')
    const background = ref(false)
    const disabled = ref(false)
    const router = useRouter();
    const templateStyle = ref('one')
    const drawer = ref(false)
    const direction = ref<DrawerProps['direction']>('rtl')
    const queryType = ref()
    const options = ref([{
      label: '项目编号',
      value: 'id'
    }, {
      label: '项目名称',
      value: 'name'
    }])
    let totalItems = ref(1000)
    onMounted(() => {
      getProjects()
    })
    async function getProjects() {
      const data = await service.get('/project/findAll');
      const projects = (data as unknown as { projects: Project[] }).projects;  
      ProjectTableData.value=projects
    }
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    function searchProject() {
      console.log("搜索===》")
      console.log(queryType.value)
      console.log(searchProp.value)
    }
    function reset() {
      console.log("重置")
      queryType.value = null;
      searchProp.value = null;
    }
    function handlePreview(row: any) {
      console.log('预览===>', row.id)
    }
    function downloadReport(row: any) {
      console.log('下载报告===>', row.id)
    }
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('确定关闭预览？')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }

    return {
      Document,
      Files,
      Search,
      RefreshLeft,
      View,
      ProjectTableData,
      searchProp,
      drawer,
      direction,
      currentPage1,
      size,
      disabled,
      background,
      queryType,
      options,
      smallScreen,
      templateStyle,
      totalItems,
      searchProject,
      reset,
      handlePreview,
      handleSizeChange,
      handleCurrentChange,
      handleClose,
      downloadReport
    };
  }
});

</script>
<style scoped>
h1 {
  font-size: 36px;
  text-align: center;
  margin-top: 20px;
}

.demo-pagination-block {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  /* 可选：添加顶部间距 */
}

.operation_shadow {
  position: relative;
  width: 100%;
  height: 80px;
  padding: 10px;
  background-color: #f0eeee;
  box-shadow: 10px 10px 10px #e1e3e700;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-size: 16px; /* 增加字体大小 */
}
</style>
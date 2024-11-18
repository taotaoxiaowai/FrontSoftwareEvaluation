<template>
  <el-row style="margin-top: 10px;margin-bottom: 10px;" class="operation_shadow">
    <el-col :span="2">
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
    <el-table-column prop="id" label="项目编号" align="center" />
    <el-table-column prop="name" label="项目名称" align="center">
    </el-table-column>
    <el-table-column prop="name" label="项目状态" align="center">
    </el-table-column>
    <el-table-column fixed="right" label="操作" min-width="60" align="center">
      <template #default="scope">
        <el-tooltip content="查看评估反馈" effect="light" placement="top">
          <el-button type="primary" :icon="Search" circle style="margin-right: 10px;"
                     @click="handlePreview(scope.row); drawer = true" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPage1" :page-size="100" :size="size" :disabled="disabled"
                    :background="background" layout="total,pager, prev, next,jumper" :total="totalItems" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
    <el-drawer v-model="drawer" title="报告审核结果" :direction="direction" :before-close="handleClose" :size="500">
      <span>Hi, there!</span>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Project } from '@/types/ProjectType'
import { Search, RefreshLeft, Document, Files } from '@element-plus/icons-vue'
import {ComponentSize, DrawerProps, ElMessageBox} from 'element-plus'
export default defineComponent({
  name: 'ProjectDashBoardListComponent',
  setup() {
    let ProjectTableData = ref<Project[]>([{
      id: 1,
      name: '1'
    },{
      id: 2,
      name: '1'
    }])
    let searchProjectData = ref<Project>({
      id: 0,
      name: ''
    })
    const currentPage1 = ref(5)
    const size = ref<ComponentSize>('default')
    const background = ref(false)
    const disabled = ref(false)
    const drawer = ref(false)
    const router = useRouter();
    const direction = ref<DrawerProps['direction']>('rtl')
    const queryType=ref()
    const smallScreen = ref(window.innerWidth < 768)
    let searchProp = ref()
    let totalItems=ref(1000)
    const options=ref([{
      label:'项目编号',
      value:'id'
    },{
      label:'项目名称',
      value:'name'
    }])

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    function searchProject() {
      console.log("搜索===》")

    }
    function reset() {
      console.log("重置")
    }
    function handleDashBoardClick(row: any) {
      router.push({ name: 'dashboards', query: { projectId: row.id } });
    }
    function handlePreview(row: any) {
      console.log('项目评审')
    }
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('确定关闭评审页面？')
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
      ProjectTableData,
      searchProjectData,
      direction,
      currentPage1,
      size,
      drawer,
      disabled,
      background,
      options,
      queryType,
      smallScreen,
      searchProp,
      totalItems,
      searchProject,
      reset,
      handleSizeChange,
      handleCurrentChange,
      handleDashBoardClick,
      handlePreview,
      handleClose,
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
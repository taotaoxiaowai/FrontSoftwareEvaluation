<template>
  <el-row style="margin-top: 10px;margin-bottom: 10px;" class="operation_shadow">
    <el-col :span="4">
    </el-col>
    <el-col :span="6">
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
    <el-col :span="6">
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

  <el-table :data="pagedProjects" style="width: 100%">
    <el-table-column prop="id" label="项目编号" align="center" />
    <el-table-column prop="projectName" label="项目名称" align="center" />
    <el-table-column prop="state" label="项目状态" align="center" />
    <el-table-column prop="startTime" label="开始时间" align="center" />
    <el-table-column prop="endTime" label="结束时间" align="center" />
    <el-table-column fixed="right" label="操作" min-width="60" align="center">
      <template #default="scope">
        <el-tooltip content="查看评估反馈" effect="light" placement="top">
          <el-button type="primary" :icon="Search" circle style="margin-right: 10px;"
                     @click="downloadFile(scope.row)" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="18">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="pageSize"
                     layout="total, prev, pager, next" :total="totalItems">
      </el-pagination>
    </el-col>
  </el-row>
  <div class="demo-pagination-block">
    <el-drawer v-model="drawer" title="报告审核结果" :direction="direction" :before-close="handleClose" :size="500">
      <span>Hi, there!</span>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import { Project } from '@/types/ProjectType'
import { Search, RefreshLeft, Document, Files } from '@element-plus/icons-vue'
import {ComponentSize, DrawerProps, ElMessage,ElMessageBox,ElLoading} from 'element-plus'
import service from '@/api';

export default defineComponent({
  name: 'ProjectDashBoardListComponent',
  setup() {
    let ProjectTableData = ref<Project[]>([])
    let searchProjectData = ref<Project>()
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
    const totalItems=ref(0)
    const pageSize = ref(5);
    const currentPage = ref(1);
    const options=ref([{
      label:'项目编号',
      value:'id'
    },{
      label:'项目名称',
      value:'name'
    }])
    const pagedProjects = computed(() => {
      return ProjectTableData.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize
          .value);
    });
    onMounted(()=>{
      getProjects()
    })
    async function getProjects() {
      const loading = ElLoading.service({
        lock: true,
        text: '加载数据中',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      const data = await service.get('/project/findReportsAll');
     
      if(data){
        loading.close()
        const projects = (data as unknown as { projects: Project[] }).projects;
        ProjectTableData.value = projects
      }else{
        loading.close()
      }
      
      
      totalItems.value=ProjectTableData.value.length
      console.log(totalItems)
    }
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val:number) => {
      currentPage.value = val;
    };
    async function downloadFile(row: any) {
      console.log(row.id);

      try {
        // 向后端发送 POST 请求，获取下载链接
        const response = await service.post(`/report/downloadReturn`, { id: row.id });
        // 提取下载链接
        const downloadUrl = (response as unknown as { url: string }).url;
        const isOk = (response as unknown as { isOk: string }).isOk;
        console.log(downloadUrl)
        console.log(isOk)
        // 检查响应内容是否有效
        if (!response || !downloadUrl || !isOk) {
          throw new Error('未能成功获取下载链接');
        }

        if (!downloadUrl) {
          throw new Error('下载链接为空');
        }

        // 直接触发下载
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', ''); // 可选：后端未提供文件名时，浏览器会根据 URL 推断
        document.body.appendChild(link);
        link.click();

        // 移除链接元素
        document.body.removeChild(link);
      } catch (error) {
        console.error('下载失败:', error);
        alert('文件下载失败，请重试！');
      }
    }
    async function searchProject() {
      console.log("搜索===》")
      console.log(queryType.value)
      console.log(searchProp.value)
      if (queryType.value != null) {
        if(searchProp.value!=null){
          if (queryType.value == 'id') {
          const data = await service.post('/project/findProjectsByCondition', { id: searchProp.value });
          if(data){
          const projects = (data as unknown as { projects: Project[] }).projects;
          ProjectTableData.value = projects}
          totalItems.value=ProjectTableData.value.length
        }else if(queryType.value=='name'){
          const data = await service.post('/project/findProjectsByCondition',{projectName:searchProp.value});
          if(data){
          const projects = (data as unknown as { projects: Project[] }).projects;
          ProjectTableData.value = projects}
          totalItems.value=ProjectTableData.value.length
        }
        }else{
          ElMessage.warning('请输入查询关键词')
        }
        
      } else {
        ElMessage.warning('请选择查询方式')
      }

    }
    async function reset() {
      console.log("重置")
      queryType.value = null;
      searchProp.value = null;
      getProjects();
    }
    function handleDashBoardClick(row: any) {
      router.push({ name: 'dashboards', query: { projectId: row.id } });
    }
    function handlePreview(row: any) {
      console.log(row)
      if(!(row.state==="审核未通过")){
        console.log("1")
        ElMessage.warning('只有未通过的项目才有项目反馈')
      }
      else{
        drawer.value=true
      }
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
      pageSize,
      currentPage,
      pagedProjects,
      searchProject,
      reset,
      handleSizeChange,
      handleCurrentChange,
      handleDashBoardClick,
      handlePreview,
      handleClose,
      downloadFile,
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
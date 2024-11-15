<template>
  <el-row style="margin-top: 10px;margin-bottom: 10px;">
    <el-col :span="2">
      <el-row>
        <div>
          <el-button size="small"  type="primary" @click="searchProject()" :icon="Files">批量生成</el-button>
        </div>
      </el-row>
    </el-col>
    <el-col :span="5">
      <el-text size="small">项目编号</el-text>  
      <el-input v-model="searchProjectData.id" style="width: 160px;margin-left: 10px;" placeholder="请输入项目编号" size="small" />
    </el-col>
    <el-col :span="5">
      <el-text size="small">项目名称</el-text>  
      <el-input v-model="searchProjectData.name" style="width: 160px;margin-left: 10px;" placeholder="请输入项目编号" size="small" />
    </el-col>
    <el-col :span="4">
      <el-row>
        <div>
          <el-button size="small"  type="primary" @click="searchProject()" :icon="Search">搜索</el-button>
          <el-button size="small" :icon="RefreshLeft" @click="reset()">重置</el-button>
        </div>
      </el-row>
    </el-col>
  </el-row>
  <!-- 用户表格 -->
  <el-table :data="ProjectTableData" style="width: 100%" 
  @row-click="handleRowClick">
    <el-table-column type="selection" label="选择" align="center"/>
    <el-table-column prop="id" label="项目编号" align="center" />
    <el-table-column prop="name" label="项目名称" align="center">
    </el-table-column>
    <el-table-column fixed="right" label="操作" min-width="60" align="center">
        <template #default="scope">
          <el-button type="primary" :icon="Search"  @click="handlePreview(scope.row)" style="margin-right: 10px;" >预览</el-button>
          <el-button type="danger" :icon="Document"   >生成</el-button>
        </template>
      </el-table-column>
  </el-table>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage1"
      :page-size="100"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, prev, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {Project} from '@/types/ProjectType'
import { Search ,RefreshLeft,Document,Files} from '@element-plus/icons-vue'
import type { ComponentSize } from 'element-plus'
export default defineComponent({
  name: 'ProjectGenerationComponent',
  setup() {
    let ProjectTableData=ref<Project[]>([{
      id:1,
      name:'1'
    },
    {id:2,
      name:'1'
    }])

    let searchProjectData=ref<Project>({
      id:0,
      name:''
    })
const currentPage1 = ref(5)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)
const router=useRouter();
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
    function searchProject(){
      console.log("搜索===》")
      
    }
    function reset(){
      console.log("重置")
    }
    function handlePreview(row:any){
      console.log('预览')
    }
    function handleRowClick(row:any){
      router.push({name:'dashboards',query:{projectId:row.id}});
    }
        return {
          Document,
          Files,
      Search,
      RefreshLeft,
      ProjectTableData,
      searchProjectData,
      searchProject,
      reset,
      handlePreview,
      currentPage1,
      size,
      disabled,
      background,
      handleSizeChange,
      handleCurrentChange,
      handleRowClick
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
  margin-top: 20px; /* 可选：添加顶部间距 */
}
</style>
  
<template>
    <el-row style="margin-top: 10px;margin-bottom: 10px;" class="operation_shadow">
       
        <el-col :span="5">
      <el-row>
      <el-text size="small" style="margin-right: 10px;">查询方式</el-text>
      <el-select-v2
        v-model="queryType"
        placeholder="请选择查询方式"
        :options="options"
        size="small"
        :style="{ width: smallScreen ? '120px' : '200px' ,}"
      />
    </el-row>
    </el-col>
      <el-col :span="5">
        <el-text size="small">查询参数</el-text>
      <el-input v-model="searchProp" style="width: 160px;margin-left: 10px;" placeholder="请输入搜索关键词"
        size="small" />
    </el-col>
        <el-col :span="4">
            <el-row>
                <div>
                    <el-button size="small" type="primary" @click="searchProject()" :icon="Search">搜索</el-button>
                    <el-button size="small" :icon="RefreshLeft" @click="reset()">重置</el-button>
                </div>
            </el-row>
        </el-col>
    </el-row>

    <el-table :data="ProjectTableData" style="width: 100%">
        <el-table-column prop="id" label="项目编号" align="center" />
        <el-table-column prop="name" label="项目名称" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="60" align="center">
            <template #default="scope">
                <el-tooltip content="查看看板" effect="light" placement="top">
                    <el-button type="primary" :icon="Search" @click="handleDashBoardClick(scope.row);"
                        style="margin-right: 10px;" circle />
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage1" :page-size="100" :size="size" :disabled="disabled"
      :background="background" layout="total,pager, prev, next,jumper" :total="totalItems" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Project } from '@/types/ProjectType'
import { Search, RefreshLeft, Document, Files } from '@element-plus/icons-vue'
import type { ComponentSize, DrawerProps } from 'element-plus'
export default defineComponent({
    name: 'ProjectDashBoardListComponent',
    setup() {
        let ProjectTableData = ref<Project[]>([{
            id: 1,
            name: '1'
        },
        {
            id: 2,
            name: '1'
        }])
        const currentPage1 = ref(5)
        const size = ref<ComponentSize>('default')
        const background = ref(false)
        const disabled = ref(false)
        const router = useRouter();
        const queryType=ref()
        const options=ref([{
      label:'项目编号',
      value:'id'
    },{
      label:'项目名称',
      value:'name'
    }])
    let totalItems=ref(1000)
   /*  window.addEventListener('resize', () => {
      smallScreen.value = window.innerWidth < 768;
    }); */
    let searchProp = ref()
    const smallScreen = ref(window.innerWidth < 768);
        const direction = ref<DrawerProps['direction']>('rtl')
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
            queryType.value=null;
      searchProp.value=null;
        }
        function handleDashBoardClick(row: any) {
            router.push({ name: 'dashboards', query: { projectId: row.id } });
        }
      
        return {
            Document,
            Files,
            Search,
            RefreshLeft,
            ProjectTableData,
            direction,
            currentPage1,
            size,
            disabled,
            background,
            queryType,
            options,
            searchProp,
            smallScreen,
            totalItems,
            searchProject,
            reset,
            handleSizeChange,
            handleCurrentChange,
            handleDashBoardClick,
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
    height: 50px;
    padding: 10px;
    background-color: #f0eeee;
    box-shadow: 10px 10px 10px #e1e3e700;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
}
</style>
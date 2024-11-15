<template>
  <el-row>
    <el-col :span="2"><el-button :icon="Close" circle /></el-col>
    <el-col :span="22"> 
    <donut-chart-component/>
    <histogram-chart-component/>
    <pie-chart-component/></el-col>
   
  </el-row>
   
  </template>
  
  <script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {Close} from '@element-plus/icons-vue'
import DonutChartComponent from '@/components/DonutChart.vue';
import HistogramChartComponent from '@/components/HistogramChart.vue'
import PieChartComponent from '@/components/PieChart.vue'
import { useRoute } from 'vue-router';
  export default defineComponent({
    name: 'ProjectGenerationComponent',
    components: {
    DonutChartComponent,
    HistogramChartComponent ,
    PieChartComponent // 在 components 中注册子组件
  },
    setup() {
     const route=useRoute()
     const {projectId}= route.query
      console.log('项目id',projectId)
      return {
        projectId,
        Close
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
  </style>
    
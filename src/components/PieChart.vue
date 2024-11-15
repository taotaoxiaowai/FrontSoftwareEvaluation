<template>
    <div class="dashboard">
        <div id="approval-chart" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

export default {
    name: 'PieChartComponent',
    setup() {
        let ApprovalChart: echarts.ECharts | null = null;
        onMounted(() => {
            ApprovalPieChart();
            window.addEventListener('resize', handleResize);
        });

        const handleResize = () => {
            ApprovalChart?.resize();
        };

        function ApprovalPieChart() {
       const chartDom = document.getElementById('approval-chart')!;
       ApprovalChart = echarts.init(chartDom);
    const option = {
     title: { text: '项目审批状态图' },
     series: [
       {
         type: 'pie',
         data: [
           { value: 35, name: '已审批' },
           { value: 25, name: '未审批' },
           { value: 20, name: '驳回' },
          
         ]
       }
     ]
   };
   ApprovalChart.setOption(option);
 }
        return {
            

        };
    }
};
</script>

<style scoped>
.dashboard {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}
</style>
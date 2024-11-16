<template>
    <div class="dashboard">
        <div id="approval-chart" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted ,watch} from 'vue';

export default {
    name: 'PieChartComponent',
    props: {
    theme: {
      type: String,
      required: true
    }
  },
    setup(props:any) {
        let ApprovalChart: echarts.ECharts | null = null;
        onMounted(() => {
          InitApprovalPieChart();
            window.addEventListener('resize', handleResize);
        });

        const handleResize = () => {
            ApprovalChart?.resize();
        };

        function InitApprovalPieChart() {
       const chartDom = document.getElementById('approval-chart')!;
       ApprovalChart = echarts.init(chartDom,props.theme);
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
 watch(
            () => props.theme,
            () => {
              ApprovalChart?.dispose(); // 销毁旧图表实例
              InitApprovalPieChart(); // 使用新主题重新初始化图表
            }
        );
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
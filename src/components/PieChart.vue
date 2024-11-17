<template>
  <div class="dashboard">
    <div id="approval-chart" style="width: 800px; height: 600px;"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

export default {
  name: 'PieChartComponent',
  props: {
    theme: {
      type: String,
      required: true
    }
  },
  setup(props: any) {
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
      ApprovalChart = echarts.init(chartDom, props.theme);
      let contributionData= [
              { value: 40, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' }
            ]
      const option = {
        
        title: {
              text: '任务分配图'
            },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data:contributionData
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
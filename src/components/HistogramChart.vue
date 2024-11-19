<template>
    <div class="dashboard">
        <div id="function-points-chart" style="width: 400px; height: 300px;"></div>
    </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

export default {
    name: 'HistogramChartComponent',
    props: {
        theme: {
            type: String,
            required: true
        },
        id:{
            type: Number,
            required: true
        }
    },
    setup(props: any) {
        let functionPointsChart: echarts.ECharts | null = null;
        onMounted(() => {
            initProgressChart();
            window.addEventListener('resize', handleResize);
        });
        const handleResize = () => {
            functionPointsChart?.resize();
        };
        let mark=['阶段1', '阶段2', '阶段3', '阶段4']
        let count=[20, 40, 60, 80]
        async function getDashBoardDatas(id:any) {
      console.log(id)
    }
        function initProgressChart() {
            const chartDom = document.getElementById('function-points-chart')!;
            functionPointsChart = echarts.init(chartDom, props.theme);
            console.log(props.id)
            const option = {
                title: { text: '子系统功能点数' },
                xAxis: { type: 'category', data:mark },
                yAxis: { type: 'value' },
                series: [{ data:count , type: 'bar' }]
            };
            functionPointsChart.setOption(option);
        }
        watch(
            () => props.theme,
            () => {
                functionPointsChart?.dispose(); // 销毁旧图表实例
                initProgressChart(); // 使用新主题重新初始化图表
  
            }
        );
        return {
            initProgressChart,
            getDashBoardDatas
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
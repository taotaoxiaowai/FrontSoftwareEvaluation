<template>
    <div class="dashboard">
        <div id="function-points-chart" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

export default {
    name: 'HistogramChartComponent',
    setup() {
        let functionPointsChart: echarts.ECharts | null = null;
        onMounted(() => {
            initProgressChart();
            window.addEventListener('resize', handleResize);
        });

        const handleResize = () => {
            functionPointsChart?.resize();
        };

        function initProgressChart() {
            const chartDom = document.getElementById('function-points-chart')!;
            functionPointsChart = echarts.init(chartDom);
            const option = {
                title: { text: '项目功能点数' },
                xAxis: { type: 'category', data: ['阶段1', '阶段2', '阶段3', '阶段4'] },
                yAxis: { type: 'value' },
                series: [{ data: [20, 40, 60, 80], type: 'bar' }]
            };
            functionPointsChart.setOption(option);
        }

        return {
            initProgressChart

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
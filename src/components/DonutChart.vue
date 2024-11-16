<template>
    <div class="dashboard">
        <div id="estimate-report-chart" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

export default {
    name: 'DonutChartComponent',
    props: {
        theme: {
            type: String,
            required: true
        }
    },
    setup(props: any) {

        let estimateReportChart: echarts.ECharts | null = null;
        onMounted(() => {
            initEstimateReportChart()
            window.addEventListener('resize', handleResize)
            console.log(props.theme)
        })
        const handleResize = () => {
            estimateReportChart?.resize();

        };
        function initEstimateReportChart() {
            const chartDom = document.getElementById('estimate-report-chart')!;
            estimateReportChart = echarts.init(chartDom, props.theme);
            let option = {
                title: { text: '项目报告完成情况' },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '估算报告完成情况',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: '已完成' },
                            { value: 735, name: '未完成' },
                        ]
                    }
                ]
            };
            estimateReportChart.setOption(option);
        }

        watch(
            () => props.theme,
            () => {
                estimateReportChart?.dispose(); // 销毁旧图表实例
                initEstimateReportChart(); // 使用新主题重新初始化图表
            }
        );

        return {
            initEstimateReportChart,

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
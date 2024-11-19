<template>
    <div class="dashboard">
        <div id="function-points-area-chart" style="width: 400px; height: 300px;"></div>
    </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted, watch } from 'vue';

export default {
    name: 'AreaChartComponent',
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
        let estimateReportChart: echarts.ECharts | null = null;
        onMounted(() => {
            initEstimateReportChart()
            window.addEventListener('resize', handleResize)
            getDashBoardDatas(props.id)
        })
        const handleResize = () => {
            estimateReportChart?.resize();
        };
        let mark=['EIF', 'ILF', 'EQ', 'EO', 'EI']
        let time=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        let EIFCount=[140, 232, 101, 264, 90, 340, 250]
        let ILFCount=[120, 282, 111, 234, 220, 340, 310]
        let EQCount=[320, 132, 201, 334, 190, 130, 220]
        let EoCount=[220, 402, 231, 134, 190, 230, 120]
        let fiveCount=[220, 302, 181, 234, 210, 290, 150]
        function initEstimateReportChart() {
            const chartDom = document.getElementById('function-points-area-chart')!;
            estimateReportChart = echarts.init(chartDom, props.theme);
            let option = {
                color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                title: {
                    text: '子系统功能点分布图',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
               
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: time
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: mark[0],
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(128, 255, 165)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(1, 191, 236)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: EIFCount
                    },
                    {
                        name: mark[1],
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(0, 221, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(77, 119, 255)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: ILFCount
                    },
                    {
                        name: mark[2],
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(55, 162, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(116, 21, 219)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: EQCount
                    },
                    {
                        name: mark[3],
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(255, 0, 135)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(135, 0, 157)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: EoCount
                    },
                    {
                        name: mark[4],
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(255, 191, 0)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(224, 62, 76)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: fiveCount
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
        async function getDashBoardDatas(id:any) {
      console.log(id)
    }
        return {
            initEstimateReportChart,
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
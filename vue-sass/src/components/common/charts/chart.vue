<template>
    <div id="map-chart" style="height:65%;width:100%;margin-top: 1.6rem;"></div>
</template>
<style>

</style>
<script>
    import echarts from 'echarts'
    import map from 'echarts/map/js/china'
    export default{
        data(){
            return{
            }
        },
        props:{
            option:{default:{}}
        },
        watch:{
            option:{
                handler:function(val,oldval){
                    this.$nextTick(function(){
                        var dom = document.getElementById('map-chart');
                        var myChart = echarts.init(dom);
                        myChart.setOption(this.option, true);
                    })
                },
                deep:true
            }
        },
        mounted:function(){

        },
        components:{
        }
    }
</script>

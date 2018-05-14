<template>
  <div id="app">
     <shuttleBox  :set="shuttleSet"  v-model="shuttleSet.list2.value"></shuttleBox>
  </div>
</template>

<script>
    import shuttleBox from './components/shuttleBox'
export default {
    name: 'app',
    components:{
        shuttleBox
    },
    data () {
        return {
            shuttleSet:{
                list1:{
                    name:'列表1',
                    value:[{"key":58334,"value":"机机器学习2机器学习2机器学习2机器学习2机器学习2器学习2"},{"key":58335,"value":"机器学习9"},{"key":58336,"value":"机器学习12"},{"key":58337,"value":"机器学习6"},{"key":58338,"value":"机器学习10"}],
                },
                list2:{
                    name:'列表2',
                    value:[],
                }
            },
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

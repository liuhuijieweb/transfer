<template>
  <div style="position: relative">
    <div class="transfer_container">
      <div class="options">
        <p class="option_title">
          <input type="checkbox" class="all_check" :disabled="!this.list.length" :checked="listAllCheck" @click="allCheck(1)">
          <span>{{set.list1.name}}</span>
          <span class="option_title_right">{{checkedList.length}}/{{list.length}}</span>
        </p>
        <div class="option_content">
          <p v-for="(item,index) in list">
            <input type="checkbox" :checked="listAllCheck || item.checked" @click="toggleChecked(1,index)"><span :title="item.value">{{item.value}}</span>
          </p>
        </div>
      </div>
      <div class="buttons">
        <div class="add_button" :class="checkedList.length>0?'button_true':'button_false'" @click="add">{{'>'}}</div>
        <div class="add_button" :class="checkedValue.length>0?'button_true':'button_false'" @click="deleteArr">{{'<'}}</div>
      </div>
      <div class="lists">
        <div class="options">
          <p class="option_title">
            <input type="checkbox" class="all_check" :disabled="!this.value.length" :checked="valueAllCheck" @click="allCheck(2)">
            <span>{{set.list2.name}}</span>
            <span class="option_title_right">{{checkedValue.length}}/{{value.length}}</span>
          </p>
          <div class="option_content">
            <p v-for="(item,index) in value">
              <input type="checkbox" :checked="valueAllCheck || item.checked" @click="toggleChecked(2,index)"><span :title="item.value">{{item.value}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="disabled"></div>
  </div>
</template>

<script>
  export default {
      name: "shuttleBox",
      props:['set','disabled'],
      data(){
          return{
              list:[],
              value:[],
              checkedList:[],
              checkedValue:[],
              listAllCheck:false,
              valueAllCheck:false,
          }
      },
      mounted(){
          this.list = this.set.list1.value;
          this.value = this.set.list2.value;
      },
      methods:{
          //全选
          allCheck(num){
              if(num == 1){
                  //List
                  this.listAllCheck = !this.listAllCheck;
                  if(this.listAllCheck){
                      for(let item of this.list){
                          item.checked = true;
                      }
                      this.checkedList = [...this.list];
                  }else{
                      for(let item of this.list){
                          item.checked = false;
                      }
                      this.checkedList = [];
                  }
              }else if(num == 2){
                  //Value
                  this.valueAllCheck = !this.valueAllCheck;
                  if(this.valueAllCheck){
                      for(let item of this.value){
                          item.checked = true;
                      }
                      this.checkedValue = [...this.value];
                  }else{
                      for(let item of this.value){
                          item.checked = false;
                      }
                      this.checkedValue = [];
                  }
              }
          },
          //input  点击  切换选中状态
          toggleChecked(num,index){
              if(num == 1){
                  if(this.list[index].checked){
                      this.list[index].checked = false;
                      for(let item in this.checkedList){
                          if(this.checkedList[item].key == this.list[index].key){
                              this.checkedList.splice(item,1);
                          }
                      }
                  }else{
                      this.list[index].checked = true;
                      this.checkedList.push(this.list[index]);
                  }
                  if(this.checkedList.length < this.list.length){
                      this.listAllCheck = false;
                  }else{
                      this.listAllCheck = true;
                  }
              }else if(num == 2){
                  if(this.value[index].checked){
                      this.value[index].checked = false;
                      for(let item in this.checkedValue){
                          if(this.checkedValue[item].key == this.value[index].key){
                              this.checkedValue.splice(item,1);
                          }
                      }
                  }else{
                      this.value[index].checked = true;
                      this.checkedValue.push(this.value[index]);
                  }
                  if(this.checkedValue.length < this.value.length){
                      this.valueAllCheck = false;
                  }else{
                      this.valueAllCheck = true;
                  }
              }
          },
          //添加
          add(){
              this.listAllCheck = false;
              for (let array of this.checkedList){
                  array.checked = false;
                  this.list.splice(this.list.findIndex(item => item.key === array.key), 1)
              }
              let arr = [...this.value,...this.checkedList];
              this.value = this.unique(arr);
              //选中数组为空
              this.checkedList = [];
              if(this.valueAllCheck){
                  this.checkedValue = [...this.value];
              }
              if(this.value.length>0){
                  this.value.sort(this.compareUp(this.value,"key"));
              }
              //双向绑定
              this.$emit('input', this.value)
          },
          deleteArr(){
              this.valueAllCheck = false;
              for (let array of this.checkedValue){
                  array.checked = false;
                  this.value.splice(this.value.findIndex(item => item.key === array.key), 1)
              }
              let arr = [...this.list,...this.checkedValue];
              this.list = this.unique(arr);
              //选中数组为空
              this.checkedValue = [];
              if(this.listAllCheck){
                  this.checkedList = [...this.list];
              }
              if(this.list.length>0){
                  this.list.sort(this.compareUp(this.list,"key"));
              }
              //双向绑定
                this.$emit('input', this.value)
          },
          //调整顺序
          rise(index){
              if(index == 0){
                  return;
              }else{
                  [this.value[index-1],this.value[index]] = [this.value[index],this.value[index-1]];
                  let list = [...[],...this.value];
                  this.$set(this,'value',list);
              }
          },
          //升序排序
          compareUp(data,propertyName) { // 升序排序
              if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
                  return (object1, object2) => {
                      var value1 = object1[propertyName];
                      var value2 = object2[propertyName];
                      return value1.localeCompare(value2);
                  }
              } else {
                  return (object1, object2) => { // 属性值为数字
                      var value1 = object1[propertyName];
                      var value2 = object2[propertyName];
                      return value1 - value2;
                  }
              }
          },
          //数组去重
          unique(arr) {
              const res = new Map();
              return arr.filter((item) => !res.has(item.key) && res.set(item.key, 1))
          },
      }
  }
</script>

<style scoped>
  p{
    margin:0;
    padding:0;
  }
  .transfer_container{
    float:left;
    display: flex;
    text-align: left;
  }
  .all_check{
    margin-top:14px;
    margin-left:14px;
  }
  .options{
    width:260px;
    border:1px solid #09f;
    border-radius: 10px;
    overflow: hidden;
    height:400px;
  }
  .option_title{
    display: flex;
    background: #eeeeee;
    height:40px;
    line-height: 40px;
    font-size:14px;
    color:#535353;
  }
  .option_title span{
    flex: 1;
    padding-left:10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .option_title_right{
    text-align: right;
    padding-right:10px;
  }
  .option_content{
    overflow-y: scroll;
    height:360px;
  }
  .option_content p{
    padding-left:10px;
    height:30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .option_content p span.overflow{
    display: inline-block;
    width:160px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .option_content span{
    padding-left:10px;
  }
  .option_content p:nth-child(even){
    background:#fafafa;
  }
  /*滚动条 start*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 4px;
    background-color: #F5F5F5;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    background: #fff ;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color:rgba(222, 222, 222, 0.7);
  }
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color:rgba(222, 222, 222, 0.7);
  }
  .buttons{
    width:100px;
    height:400px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    /*border:1px solid #092;*/
  }
  .add_button{
    margin:20px 0;
    width:40px;
    height:40px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#ffffff;
  }
  .button_true{
    background: #09f;
  }
  .button_false{
    background: #eeeeee;
  }
  .lists{
    display: flex;
  }
  .transfer_container div{
    /*height:400px;*/
    /*border:1px solid #090;*/
  }
  .delete{
    float:right;
    color:red;
    cursor: pointer;
  }
  .mask{
    width:262px;
    height:402px;
    position: relative;
    z-index:5;
    opacity:0.1;
    background: #f5f5f5;
    border-radius: 10px;
  }

</style>

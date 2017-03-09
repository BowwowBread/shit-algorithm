<template>
    <div class="probleminput">
      <div class="addProblem">
        <div class="input">
        <label for="problemName">problemName : </label><input type="text" v-model="problemName" id="problemName"><br>
        <label for="source">source : </label><input type="text" v-model="source" id="source"><br>
        <label for="explanation">explanation : </label><input type="text" v-model="explanation" id="explanation"><br>
        <label for="inputExample">inputExample : </label><input type="text" v-model="inputExample" id="inputExample"><br>
        <label for="inputExample2">inputExample2 : </label><input type="text" v-model="inputExample2" id="inputExample2"><br>        
        <label for="outputExample">outputExample : </label><input type="text" v-model="outputExample" id="outputExample"><br>
        <label for="outputExample2">outputExample2 : </label><input type="text" v-model="outputExample2" id="outputExample2"><br>        
        <label for="timeLimit">timeLimit : </label><input type="text" v-model.number="timeLimit" id="timeLimit"><br>
        <label for="memoryLimit">memoryLimit : </label><input type="text" v-model.number="memoryLimit" id="memoryLimit"><br>
        </div>
        <div class="example">
          <p>문제이름 :{{problemName}}</p>
          <p>소스 : {{source}}</p>
          <p>설명 : {{explanation}}</p>
          <p>입력예제 : {{inputExample}}</p>
          <p>입력예제2 : {{inputExample2}}</p>          
          <p>출력예제 : {{outputExample}}</p>
          <p>출력예제2 : {{outputExample2}}</p>          
          <p>시간 : {{timeLimit}}</p>
          <p>메모리 : {{memoryLimit}}</p>
        </div>
        <button v-on:click="add">문제 등록</button>
      </div>
        <ul>

            <li v-for="item in items">
                번호 : <span>{{item.num}}</span><br>
                이름 : <span>{{item.name}}</span><br>
                소스 : <span>{{item.source}}</span><br>
                <br>
            </li>
            <br>

        </ul>
    </div>
</template>
<script>

export default{
  data() {
    return {
      items: [],
      problemName: '',
      source: '',
      explanation: '',
      inputExample: '',
      inputExample2: '',
      outputExample: '',
      outputExample2: '',
      timeLimit: '',
      memoryLimit: '',
    };
  },
  beforeCreate() {
    this.fetchData();
  },
  methods: {
  	add() {
    this.$http.post('api/problems', {
      problemname: this.problemName,
      source: this.source,
      explanation: this.explanation,
      inputexample: this.inputExample,
      inputexample2: this.inputExample2,
      outputexample: this.outputExample,
      outputexample2: this.outputExample2,
      timelimit: this.timeLimit,
      memorylimit: this.memoryLimit,
    });
  },
    fetchData() {
      this.$http.get('api/problems')
        .then((res) => {
          let i = 0;
          while (i < res.data.problems.length) {
            this.items.push({
              num: res.data.problems[i].num,
              name: res.data.problems[i].problemName,
              source: res.data.problems[i].source,
            });
            i += 1;
          }
        });
    },
  },
};
</script>
<style scoped>
  *{
    margin:0;
    padding:0;
  }
  .input{
    float: left;
    height:200px;
    width:300px;
  }
  input{
    float:right;
    height:20px;
  }
  label{
    float: left;
    height:20px;
    text-align: right;
    width: 100px;
  }
  .input{
    margin-left:20px;
  }
  .example{
    width:300px;
    height:200px;
    float:left;
    margin-left:300px;
  }
  ul{
    clear: both;
  }
</style>

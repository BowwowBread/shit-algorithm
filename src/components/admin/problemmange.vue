<template>
    <div class="probleminput">
        <button v-on:click="openAdd">{{addMsg}}</button>
        <div class="addProblem" v-if="addState">
        <div class="input">
        <label for="problemName">problemName : </label><input type="text" v-model="problemName" id="problemName"><br>
        <label for="source">source : </label><input type="text" v-model="source" id="source"><br>
        <label for="explanation">explanation : </label><input type="text" v-model="explanation" id="explanation"><br>
        <label for="score">score : </label><input type="text" v-model="score" id="score"  v-on:keypress="isNumber(event)"><br>
        <label for="inputExample">inputExample : </label><input type="text" v-model="inputExample" id="inputExample"><br>
        <label for="inputExample2">inputExample2 : </label><input type="text" v-model="inputExample2" id="inputExample2"><br>        
        <label for="outputExample">outputExample : </label><input type="text" v-model="outputExample" id="outputExample"><br>
        <label for="outputExample2">outputExample2 : </label><input type="text" v-model="outputExample2" id="outputExample2"><br>
        <label for="timeLimit">timeLimit : </label><input type="text" v-model="timeLimit" id="timeLimit"  v-on:keypress="isNumber(event)"><br>
        <label for="memoryLimit">memoryLimit : </label><input type="text" v-model="memoryLimit" id="memoryLimit"  v-on:keypress="isNumber(event)"><br>

        </div>
          <div class="example" >
          <p>문제이름 :{{problemName}}</p>
          <p>소스 : {{source}}</p>
          <p>설명 : {{explanation}}</p>
          <p>점수 : {{score}}</p>
          <p>입력예제 : {{inputExample}}</p>
          <p>입력예제2 : {{inputExample2}}</p>          
          <p>출력예제 : {{outputExample}}</p>
          <p>출력예제2 : {{outputExample2}}</p>          
          <p>시간 : {{timeLimit}}</p>
          <p>메모리 : {{memoryLimit}}</p>
        </div>
        <button v-on:click="add">문제 등록</button>
      </div>
        <div class="list">
        <div class="problemList">
        <ul>
            <li v-for="item in items">
                <p>번호 : {{item.num}}</p><br>
                <p>이름 : {{item.name}}</p><br>
                <p>소스 : {{item.source}}</p><br>
                <button v-on:click="solveListData(item.num)">제출목록</button>
                <button v-on:click="">문제수정</button>
                <button>문제삭제</button>
                <br>
                <br>
                <div class="problemModify">
                    <label for="problemNum">problemNum : </label><input type="text" v-model="problemNum" id="problemNum"><br>
                    <label for="problemName">problemName : </label><input type="text" v-model="problemName" id="problemName"><br>
                    <label for="source">source : </label><input type="text" v-model="source" id="source"><br>
                    <label for="explanation">explanation : </label><input type="text" v-model="explanation" id="explanation"><br>
                    <label for="score">score : </label><input type="text" v-model="score" id="score"  v-on:keypress="isNumber(event)"><br>
                    <label for="inputExample">inputExample : </label><input type="text" v-model="inputExample" id="inputExample"><br>
                    <label for="inputExample2">inputExample2 : </label><input type="text" v-model="inputExample2" id="inputExample2"><br>
                    <label for="outputExample">outputExample : </label><input type="text" v-model="outputExample" id="outputExample"><br>
                    <label for="outputExample2">outputExample2 : </label><input type="text" v-model="outputExample2" id="outputExample2"><br>
                    <label for="timeLimit">timeLimit : </label><input type="text" v-model="timeLimit" id="timeLimit"  v-on:keypress="isNumber(event)"><br>
                    <label for="memoryLimit">memoryLimit : </label><input type="text" v-model="memoryLimit" id="memoryLimit"  v-on:keypress="isNumber(event)"><br>
                </div>
            </li>
            <br>
        </ul>
        </div>
        <div class="solveList">
            <ul>
                <transition-group name="sigoPage">
                <li v-for="list in solveList" v-bind:key="list">
                    <p>이름 : {{list.username}}</p>
                    <p>학번 : {{list.studentcode}}</p>
                    <p>결과 : {{list.result}}</p>
                    <p>날짜 : {{list.date}}</p>
                    <p>코드 : {{list.code}}</p>
                </li>
                </transition-group>
            </ul>
        </div>
        </div>
    </div>
</template>
<script>

export default{
  data() {
    return {
      items: [],
      problemData: [],
      solveList: [],
      problemName: '',
      source: '',
      explanation: '',
      inputExample: '',
      inputExample2: '',
      outputExample: '',
      outputExample2: '',
      timeLimit: '',
      memoryLimit: '',
      score: '',
      addState: false,
      addMsg: '문제 등록하기',
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
  	openAdd() {
        this.addState = !this.addState;
        if (this.addState) {
        	this.addMsg = '닫기';
        } else {
        	this.addMsg = '문제 등록하기';
        }
    },
	  solveListData(num) {
//	  	console.log(num);
        this.solveList = [];
  	    this.$http.get('api/solution')
          .then((res) => {
  	    	let i = 0;
	          let username;
	          let id;
	          let studentcode;
	          let result;
	          let date;
	          let code;
	          while (i < res.data.resolves.length) {
            	if (res.data.resolves[i].resolveData.problemNum === num) {
                    id = res.data.resolves[i].userId;
                    result = res.data.resolves[i].resolveData.result;
                    date = res.data.resolves[i].resolveData.date;
                    code = res.data.resolves[i].resolveData.code;
            		this.$http.get(`api/users/search/${id}`)
                      .then((userInfo) => {
            			 username = userInfo.data.users.username;
            			 studentcode = userInfo.data.users.studentCode;
	                      console.log(`${username} : ${studentcode} : ${result} : ${date} : ${code}`);
	                      this.solveList.push({
	                      	username,
                            studentcode,
                            result,
                            date,
                            code,
                          });
                      });
		            }
                i += 1;
            }
          });
    },
    isNumber(number) {
		  const evt = (number) || window.event;
		  const charCode = (evt.which) ? evt.which : evt.keyCode;
		  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
			  evt.preventDefault();
			  console.log('if');
			  return false;
		  }
			  console.log('else');
			  return true;
	  },
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
      score: this.score,
    })
      .then(() => {
	      this.$swal(
		      '등록 성공',
		      '문제를 등록하였습니다',
		      'success',
	      );
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
  textarea{
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
    .list{
        display:flex;
        clear:both;
    }
    .list > div {
        flex: 1;
    }
    ul{
        margin-left:50px;
    }
  .sigoPage-enter-active {
      transition: all 1s ease;
  }
  .sigoPage-leave-active {
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .sigoPage-enter, .sigoPage-leave-to
      /* .slide-fade-leave-active for <2.1.8 */
  {
      transform: translateX(100px);
      opacity: 0;
  }
</style>

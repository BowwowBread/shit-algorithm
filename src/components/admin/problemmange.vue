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
                <button v-on:click="modifyData(item.num)">문제수정</button>
                <button v-on:click="deleteData(item.num)">문제삭제</button>
                <br>
                <br>
                <div class="modify" v-if="item.num == problemNum && modifyState">
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
                    <button v-on:click="modify">수정하기</button>
                </div>
            </li>
            <br>
        </ul>
        </div>
        <div class="solveList">
            <transition-group name="sigoPage">
            <ul v-for="list in solveList" v-bind:key="list">
                    <li>이름 : {{list.username}}</li>
                    <li>학번 : {{list.studentcode}}</li>
                    <li>결과 : {{list.result}}</li>
                    <li>날짜 : {{list.date}}</li>
                    <li>코드 : {{list.code}}</li>
            </ul>
            </transition-group>
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
      problemNum: '',
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
      modifyState: false,
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
    deleteData(num) {
	    this.$swal({
		    title: '문제 삭제',
		    text: '정말로 삭제하시겠습니까?',
		    type: 'question',
		    showCancelButton: true,
		    confirmButtonText: '삭제',
	    }).then(() => {
	    	this.$http.delete(`api/problems/${num}`)
              .then(() => {
	              this.$swal(
		              '삭제 완료',
		              `${num}번 문제를 삭제하셨습니다`,
		              'success',
	              );
              })
              .catch((err) => {
	              this.$swal(
		              '삭제 실패',
		              err,
		              'fail',
	              );
              });
	    })
          .catch(() => {
	          this.$swal(
		          '삭제 실패',
		          err,
		          'fail',
	          );
          });
    },
    modify() {
    this.$http.put('api/problems', {
            problemnum: this.problemNum,
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
                '수정 성공',
                '문제를 수정하였습니다',
                'success',
            );
        })
        .catch((err) => {
            alert(err);
        });
    },
    modifyData(num) {
        this.$http.get(`api/problems/${num}`)
        .then((res) => {
        	this.modifyState = !this.modifyState;
        	console.log(res);
        	this.problemName = res.data.problem.problemName;
        	this.source = res.data.problem.source;
        	this.inputExample = res.data.problem.problemData.inputExample;
	        this.inputExample2 = res.data.problem.problemData.inputExample2;
	        this.outputExample = res.data.problem.problemData.outputExample;
	        this.outputExample2 = res.data.problem.problemData.outputExample2;
	        this.memoryLimit = res.data.problem.problemData.memoryLimit;
	        this.timeLimit = res.data.problem.problemData.memoryLimit;
	        this.problemNum = res.data.problem.num;
	        this.score = res.data.problem.score;
	        this.explanation = res.data.problem.explanation;
	        console.log(this.problemNum);
	        console.log(num);
          })
          .catch((err) => {
	          this.$swal(
		          '문제 조회 실패',
		          err,
		          'fail',
	          );
          });
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
          })
          .catch((err) => {
	          this.$swal(
		          '결과 로드 실패',
		          err,
		          'fail',
	          );
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
      })
      .catch((err) => {
	      this.$swal(
		      '등록 실패',
		      err,
		      'fail',
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
        })
        .catch((err) => {
	        this.$swal(
		        '문제 로드 실패',
		        err,
		        'fail',
	        );
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
    min-width:300px;
  }
  input{
    float:right;
    height:20px;
    display: block;
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
    display: block;
  }
  .input{
    margin-left:20px;
    float: left;
  }
  .addProblem{
      min-width: 1000px;
  }
  .modify{
      clear: both;
      width: 50%;
      min-width:300px;
      max-width: 300px;
  }
  .modify button{
      float: left;
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
    li{
        margin-top: 50px;
    }
    .solveList{
        min-width: 500px;
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

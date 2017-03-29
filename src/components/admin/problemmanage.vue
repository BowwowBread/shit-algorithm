<template>
    <div class="probleminput" v-if="enteringProblemmanage">
        <div class="problem">
        <button v-on:click="openAdd">{{addMsg}}</button>
        <div class="addProblem" v-if="addState">
        <div class="input">

        <label for="problemName">problemName : </label><input type="text" v-model="problemName" id="problemName"><br>
        <label for="source">source : </label><input type="text" v-model="source" id="source"><br>
        <label for="explanation">explanation : </label><input type="text" v-model="explanation" id="explanation"><br>
        <label for="score">score : </label><input type="text" v-model="score" id="score"  v-on:keypress="isNumber(event)"><br>
        <label for="inputExample">inputExample : </label><input type="text" v-model="inputExample" id="inputExample"><br>
        <label for="inputExample2">inputExample2 : </label><input type="text" v-model="inputExample2" id="inputExample2"><br>
            <label for="outputExample">outputExample : </label><textarea type="text" v-model="outputExample" id="outputExample"></textarea><br>
            <label for="outputExample2">outputExample2 : </label><textarea type="text" v-model="outputExample2" id="outputExample2"></textarea><br>
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
        <button class="addProblemButton"v-on:click="add">문제 등록</button>
            <select v-model="problemType">
                <option value="normal">일반</option>
                <option value="contest">대회</option>
            </select>
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
                <button v-on:click="deleteData(item.num, item)">문제삭제</button>
                <br>
                <br>
                <div class="modify" v-if="item.num == problemNum && modifyState">
                    <label for="problemName">problemName : </label><input type="text" v-model="problemName" id="problemName"><br>
                    <label for="source">source : </label><input type="text" v-model="source" id="source"><br>
                    <label for="explanation">explanation : </label><textarea type="text" v-model="explanation" id="explanation"></textarea><br>
                    <label for="score">score : </label><input type="text" v-model="score" id="score"  v-on:keypress="isNumber(event)"><br>
                    <label for="inputExample">inputExample : </label><input type="text" v-model="inputExample" id="inputExample"><br>
                    <label for="inputExample2">inputExample2 : </label><input type="text" v-model="inputExample2" id="inputExample2"><br>
                    <label for="outputExample">outputExample : </label><input type="text" v-model="outputExample" id="outputExample"><br>
                    <label for="outputExample2">outputExample2 : </label><input type="text" v-model="outputExample2" id="outputExample2"><br>
                    <label for="timeLimit">timeLimit : </label><input type="text" v-model="timeLimit" id="timeLimit"  v-on:keypress="isNumber(event)"><br>
                    <label for="memoryLimit">memoryLimit : </label><input type="text" v-model="memoryLimit" id="memoryLimit"  v-on:keypress="isNumber(event)"><br>
                    <label for="type">type : </label>
                    <select v-model="problemType">
                    <option value="normal">일반</option>
                    <option value="contest">대회</option>
                    </select>
                    <button v-on:click="modify">수정하기</button>
                </div>
            </li>
            <br>
        </ul>
        </div>
        </div>
        <div class="solveList">
            <transition-group name="problemmanage" tag="div">
            <ul v-for="list in solveList" v-bind:key="list">
                    <li>이름 : {{list.username}}</li>
                    <li>학번 : {{list.studentcode}}</li>
                    <li>결과 : {{list.result}}</li>
                    <li>날짜 : {{list.date}}</li>
                    <li><pre>코드 : {{list.code}}</pre></li>
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
      data: [],
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
      lastNum: 0,
      problemType: 'normal',
      enteringProblemmanage: false,
    };
  },
  created() {
    // 문제 로드
	  this.fetchData();
  },
  updated() {
    this.$nextTick(() => {
      // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
      this.$store.commit('loadingOff');
      this.$Progress.finish();
    });
  },
  methods: {
  	openAdd() {
      // 문제 등록 버튼
        this.addState = !this.addState;
        if (this.addState) {
        	this.addMsg = '닫기';
        } else {
        	this.addMsg = '문제 등록하기';
        }
    },
    deleteData(num, item) {
      // 문제 삭제
	    this.$swal({
        // 삭제 확인 모달
		    title: '문제 삭제',
		    text: '정말로 삭제하시겠습니까?',
		    type: 'question',
		    showCancelButton: true,
		    confirmButtonText: '삭제',
            cancelButtonText: '취소',
	    })
          .then(() => {
            // 삭제 확인
	          this.userToken = this.$cookie.get('userToken');
	          this.$http.defaults.headers.common.Authorization = this.userToken;
            this.$http.delete(`problems/${num}`)
              .then(() => {
                // 삭제 성공
	              this.$swal({
                  // 성공 모달
                      title: '삭제 완료',
                      text: `${num}번 문제를 삭제하셨습니다`,
                      type: 'success',
                    });
                // 리스트의 해당 인덱스의 문제 삭제
                this.items.splice(this.items.indexOf(item), 1);
              })
              .catch((err) => {
                // 삭제 실패
	              this.$swal({
                  // 실패 모달
		              title: '삭제 실패',
		              text: err,
		              type: 'error',
	              });
              });
	    })
          .catch(() => {
            // 삭제 실패
	          this.$swal({
              // 실패 모달
			          title: '삭제 실패',
			          text: err,
			          type: 'error',
		          });
          });
    },
    modify() {
      // 문제 수정
	    this.$http.defaults.headers.common.Authorization = this.userToken;
	    this.$http.put('problems', {
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
            type: this.problemType,
        })
        .then(() => {
          // 수정 성공
	        this.$swal({
            // 성공 모달
		        title: '수정 성공',
		        text: '문제를 수정하였습니다',
		        type: 'success',
	        });
        })
        .catch((err) => {
          // 수정 실패
	      let errMsgs;
	      if (err.response.data.message === 'validation error') {
	        errMsgs = '모든 정보를 입력해주세요';
          }
        this.$swal({
          // 실패 모달
                title: '수정 실페',
                text: errMsgs,
                type: 'error',
            });
        });
    },
    modifyData(num) {
      // 해당 문제 정보 로드
	    this.$http.defaults.headers.common.Authorization = this.userToken;
	    this.$http.get(`problems/${num}`)
        .then((res) => {
          // 문제 정보 로드 성공
                  this.addState = !this.addState;
        if (this.addState) {
        	this.addMsg = '닫기';
        } else {
        	this.addMsg = '문제 등록하기';
        }
        	this.modifyState = !this.modifyState;
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
	        this.type = res.data.problem.type;
          })
          .catch((err) => {
            // 로드 실패
	          this.$swal({
		          title: '문제 조회 실패',
		          text: err,
		          type: 'error',
	          });
          });
    },
    solveListData(num) {
      // 해당 문제 결과 로드
        this.solveList = [];
        this.$http.defaults.headers.common.Authorization = this.userToken;
        this.$http.get('solution')
          .then((res) => {
            // 문제 결과 로드 성공
  	    	let i = 0;
	          let username;
	          let id;
	          let studentcode;
	          let result;
	          let date;
	          let code;
	          while (i < res.data.resolves.length) {
            	if (res.data.resolves[i].resolveData.problemNum === num) {
                // 문제 결과의 번호와 해당 문제의 번호가 맞으면 데이터 추가
                    id = res.data.resolves[i].userId;
                    result = res.data.resolves[i].resolveData.result;
                    date = res.data.resolves[i].resolveData.date;
                    code = res.data.resolves[i].resolveData.code;
                    this.$http.defaults.headers.common.Authorization = this.userToken;
                    // 해당 아이디의 정보 로드
                    this.$http.get(`users/search/${id}`)
                      .then((userInfo) => {
            			 username = userInfo.data.users.username;
            			 studentcode = userInfo.data.users.studentCode;
                   // 데이터 추가
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
            // 문제 결과 로드 실패
	          this.$swal({
              // 실패 모달
		          title: '결과 로드 실패',
		          text: err,
		          type: 'error',
	          });
          });
    },
    isNumber(number) {
      // 문제 수정 추가시, 메모리, 시간 제한 숫자 체크
		  const evt = (number) || window.event;
		  const charCode = (evt.which) ? evt.which : evt.keyCode;
		  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
			  evt.preventDefault();
			  return false;
		  }
			  return true;
	  },
  	add() {
      // 문제 등록
      this.$http.defaults.headers.common.Authorization = this.userToken;
      this.$http.post('problems', {
      type: this.problemType,
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
        // 등록 성공
	      this.$swal(
          // 성공 모달
		      '등록 성공',
		      '문제를 등록하였습니다',
		      'success',
	      );
        // 데이터 추가
	      this.items.push({
	      	num: this.lastNum + 1,
            name: this.problemName,
            source: this.source,
          });
      })
      .catch((err) => {
        // 등록 실패
      	let errMsg;
      	if (err.response.data.message === 'validation error') {
      		errMsg = '정보가 부족합니다';
        }
	      this.$swal({
          // 실패 모달
		      title: '등록 실패',
		      text: errMsg,
		      type: 'error',
	      });
      });
  },
    fetchData() {
      // 문제 로드
	    this.userToken = this.$cookie.get('userToken');
	    this.$http.defaults.headers.common.Authorization = this.userToken;
	    this.$http.get('problems')
        .then((res) => {
          let i = 0;
          console.log(res);
          while (i < res.data.problems.length) {
            // 데이터 추가
            this.data.push({
              num: res.data.problems[i].num,
              name: res.data.problems[i].problemName,
              source: res.data.problems[i].source,
            });
            i += 1;
          }
          this.$http.get('problems/contest')
          // 대회 문제 로드
            .then((resContest) => {
            let j = 0;
              while (j < resContest.data.problems.length) {
                this.data.push({
                  num: resContest.data.problems[j].num,
                  name: resContest.data.problems[j].problemName,
                  source: resContest.data.problems[j].source,
                  });
                j += 1;
                }
                if (j === resContest.data.problems.length) {
                  // 문제 리스트 정렬                  
                  const sort = 'num';
                  this.data.sort(function (a, b) {
                    return a[sort] - b[sort];
                  });
                  i = 0;
                  while (i < this.data.length) {
                    // 데이터 추가
                    this.items.push({
                      num: this.data[i].num,
                      name: this.data[i].name,
                      source: this.data[i].source,
                    });
                    i += 1;
                  }
                }
             })
           .catch((err) => {
             // 문제 로드 실패
                this.$swal({
                  // 실패 모달
                title: '문제 로드 실패',
                text: err,
                type: 'error',
              });
            });
          this.enteringProblemmanage = true;
        })
        .catch((err) => {
          // 문제 로드 실패
	        this.$swal({
            // 실패 모달
		        title: '문제 로드 실패',
		        text: err,
		        type: 'error',
	        });
        });
    },
  },
};
</script>
<style src="../../assets/css/problemmanage.css" scoped></style>

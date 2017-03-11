<template>
    <div id="solve">
        <div class="sigo_container" v-for="item in items">
            <div class="solve_title">
                <div class="solve_num">
                    {{item.num}} 번 -
                </div>
                <div class="solve_name">
                    {{item.name}} 문제를 풀어봅시다
                </div>
            </div>
            <hr id="head-hr">
            <div class="solve_sidebar">
                <div class="sidebar_title">
                    <h3>문제 설명</h3>
                    <hr id="sub-hr">
                </div>
                <hr>
                <div class="solve_explain">
                    {{item.explanation}}
                </div>
                <div class="solve_inputex">
                    {{item.inputex}}
                </div>
                <div class="solve_outputex">
                    {{item.outputex}}
                </div>
            </div>
            <div class="solve_main">
                <div class="solve_input">
                    <monaco-editor class="monacoEditor" width="100%" language="c" :code="code" :editorOptions="options" v-on:keydown@mounted="onMounted" @codeChange="onCodeChange">
                    </monaco-editor>
                </div>
                <div class="solve_footer">
                    <div class="solve_output">
                        <p>{{runMsg}}</p><br>
                        <pre>{{codeResult}}</pre>
                    </div>
                    <div class="solve_button">
                        <div class="solve_run" @click="codeRun">
                            실행하기
                        </div>
                        <div class="solve_reset" @click="codeReset">
                            초기화하기
                        </div>
                        <div class="solve_submit" @click="codeSubmit">
                            제출하기
                        </div>
                    </div>
                </div>

            </div>
            <div class="pageicon">
              <a href="#"><i class="big reply icon"></i></a>
              <a href="#"><i class="big share icon"></i></a>
            </div>
        </div>

    </div>

</template>
<script>
import MonacoEditor from 'vue-monaco-editor';

export default {
  name: 'solve',
  components: {
    MonacoEditor,
  },
  data() {
    return {
    	userid: '',
      problemUrl: '"../api/problems/"',
      urlParams: '',
      items: [],
      lang: 'c',
      printf: null,
      scanf: null,
      codeResult: '',
      compileResult: '',
      code: '',
      runState: false,
      runMsg: '실행 결과가 이곳에 나타납니다',
      options: {
        selectOnLineNumbers: true,
        cursorBlinking: 'smooth',
        fontSize: 15,
        fontWeight: 'lighter',
        lineHeight: 30,
        mouseWheelScrollSensitivity: 2,
        mouseWheelZoom: true,
        parameterHints: true,
        tabCompletion: true,
        language: this.lang,
        contextmenu: false,
      },
    };
  },
  created() {
    //      토큰 테스트
    this.userToken = this.$cookie.get('userToken');
    if (this.userToken != null) {
      this.userToken = this.$cookie.get('userToken');
//      this.$http.defaults.headers.common.Authorization = this.userToken;
      this.$http.get('/api/users/my-info')
        .then((resInfo) => {
          if (resInfo.status === 200) {
            this.userid = resInfo.data.user.userId;
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
	    this.$swal({
		    title: '입장 실패',
		    text: '로그인을 해주세요',
		    type: 'error',
	    })
	    .then(
		    function (result) {
			    location.href = '/';
		    },
	    );
    }
    const ROOT_URL = 'http://121.186.23.245:9999';
    this.$http.defaults.baseURL = ROOT_URL;
    const id = this.$route.params.num;
//    const id = this.$route.params.num;
    this.$http.get(`/api/problems/${id}`)
      .then((res) => {
        this.items.push({
          num: res.data.problem.num,
          name: res.data.problem.problemName,
          source: res.data.problem.source,
          explanation: res.data.problem.explanation,
          inputex: res.data.problem.problemData.inputExample,
          outputex: res.data.problem.problemData.outputExample,
          time: res.data.problem.problemData.timeLimit,
          memorylimit: res.data.problem.problemData.memoryLimit,
        });
      });
  },
  destroy() {
    this.solveMenu = false;
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    onCodeChange(editor) {
      this.code = editor.getValue();
      console.log(editor.getValue());
    },
    codeReset() {
      this.editor.setValue('');
    	this.code = '';
    	this.runMsg = '실행 결과가 이곳에 나타납니다';
    	this.codeResult = '';
    },
    codeRun() {
      if (this.code.replace(/^\s*/, '') === '') {
        this.$swal(
          '컴파일오류',
          '코드를 입력해주세요',
          'error',
        );
        this.runMsg = 'ERROR';
    		return;
      }
      this.$http.post('/api/solution', {
      	userid: this.userid,
        problemnum: this.items[0].num,
        inputcode: this.code,
        name: 'problem',
        lang: this.lang,
        mode: true,
      })
        .then((resSubmit) => {
          this.codeResult = resSubmit.data.result;
          this.runMsg = '실행 결과 ';
        })
      .catch((err) => {
	      if (err.response.data.result === 'compile error') {
		    this.runMsg = '컴파일 에러';
		    this.codeResult = err.response.data.message;
	      } else if (err.response.data.result === 'error') {
	        this.runMsg = '에러';
            this.codeResult = err.response.data.message;
          }
      });
    },
    codeSubmit() {
      if (this.code.replace(/^\s*/, '') === '') {
        this.$swal(
          '컴파일오류',
          '코드를 입력해주세요',
          'error',
        );
        this.runMsg = 'ERROR';
    		return;
      }
      this.$http.post('/api/solution', {
        userid: this.userid,
        problemnum: this.items[0].num,
        inputcode: this.code,
        name: 'problem',
        lang: this.lang,
      })
        .then((resSubmit) => {
          const result = resSubmit.data.result;
          if (result === 'success') {
            this.runMsg = 'SUCCESS';
            this.$swal({
              title: '정답',
              text: '다른 문제도 풀어보세요',
              type: 'success',
            })
            .then(() => {
              location.href = '/problems';
            });
          } else {
            this.runMsg = 'FAIL';
            this.$swal(
                '실패',
                '다시 도전해 보세요',
                'error',
              );
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
<style src="../../assets/css/solve.css" scoped>
</style>
<style scoped>
  .monacoEditor{
    width: auto !important;
    height: calc(100vh - 400px - 70px) !important;
  }
</style>

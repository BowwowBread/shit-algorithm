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
                <!-- <hr> -->
                <div class="solve_explain">
                    {{item.explanation}}
                </div>
                <div class="solve_inputex">
                  <p>입력 값 예제</p>
                    <pre>{{item.inputex}}</pre>
                </div>
                <div class="solve_outputex">
                  <p>출력 값 예제</p>
                    <pre>{{item.outputex}}</pre>
                </div>
            </div>
            <div class="solve_main">
                <div class="solve_input">
                    <monaco-editor class="monacoEditor" width="100%" language="c" :code="code" :editorOptions="options"  @mounted="onMounted" @codeChange="onCodeChange">
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
              <a href="/problems"><i class="big reply icon"></i></a>
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
      urlParams: '',
      items: [],
      lang: 'c',
      printf: null,
      scanf: null,
      codeResult: '',
      compileResult: '',
      code: `int main() {
      //코드를 입력해주세요
}`,
      runState: false,
      runMsg: '실행 결과가 이곳에 나타납니다',
      options: {
        selectOnLineNumbers: true,
        cursorBlinking: 'smooth',
        fontSize: 15,
        fontWeight: 'lighter',
        lineHeight: 15,
        mouseWheelScrollSensitivity: 2,
        mouseWheelZoom: true,
        parameterHints: true,
        tabCompletion: true,
        language: this.lang,
        contextmenu: false,
      },
    };
  },
  beforeCreate() {
	  //      토큰 테스트
    this.userToken = this.$cookie.get('userToken');
	  if (this.userToken != null) {
	    this.userToken = this.$cookie.get('userToken');
	    this.$http.defaults.headers.common.Authorization = this.userToken;
	    this.$http.get('users/my-info')
        .then((resInfo) => {
          this.userid = resInfo.data.user.userId;
          const id = this.$route.params.num;
          this.$http.defaults.headers.common.Authorization = this.userToken;
          this.$http.get(`problems/${id}`)
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
          })
          .catch((err) => {
            if (err.response.data.message === '아직 오픈되지 않았습니다.') {
              this.$swal({
                title: '문제 로드 실패',
                text: '대회기간이 아닙니다',
                type: 'error',
              })
              .then(() => {
                location.href = '/problems';
              });
            }
          });
        })
        .catch((error) => {
        this.$swal({
                title: '유저 조회 실패',
                text: error,
                type: 'error',
            })
            .then(() => {
                location.href = '/';
            });
        });
    } else {
	    this.$swal({
		    title: '입장 실패',
		    text: '로그인을 해주세요',
		    type: 'error',
	    })
	    .then(() => {
            location.href = '/';
        });
    }
  },
  destroy() {
    this.solveMenu = false;
  },
  updated() {
    this.$nextTick(() => {
      this.$store.commit('loadingOff');
      this.$Progress.finish();
    });
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    onCodeChange(editor) {
      this.code = editor.getValue();
    },
    codeReset() {
      this.editor.setValue(`int main() {
      //코드를 입력해주세요
}`);
    	this.code = `int main() {
      //코드를 입력해주세요
}`;
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
	    this.$http.post('solution', {
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
	    this.$http.post('solution', {
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
        this.$swal({
                title: '실패',
                text: '다시 도전해 보세요',
                type: 'error',
            });
        });
    },
  },
};
</script>
<style src="../../assets/css/solve.css" scoped></style>

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
          <div class="solve_explainner">
            {{item.explanation}}
          </div>
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
          <monaco-editor class="monacoEditor" width="100%" language="c" :code="code" :editorOptions="options" @mounted="onMounted" @codeChange="onCodeChange">
          </monaco-editor>
        </div>
        <div class="solve_footer">
          <div class="solve_output">
            <p>{{runMsg}}</p>
            <div class="solve-outputner">
              <pre>{{codeResult}}</pre>
            </div>
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
        code: `/*
  * 1. 입력받을 경우 scanf 는 단 한번만 사용한다.
  * 2. printf 는 몇번을 사용해도 상관없으나, 출력 예제와 나오도록 구현한다.
  * 3. 파일이나 시스템을 다루는 함수를 사용할 수 없으며, 혹여나 사용시 Runtime error를 띄움.
  * 4. 결과를 출력하는 코드를 작성할 때, 출력 예제 값과 동일한 형식으로 나오도록 해야한다.
  * 4-1. 출력 예제를 잘 보고, \\n 과 같은 줄넘김과 띄어쓰기를 주의하여 작성한다.
  * 5. stdio.h, math.h 라이브러리는 선언되어 있는 상태이다.
  * 6. 실행하기는 미리 값을 테스트 해보는 것으로 작성한 코드에 입력 값 예제가 들어가고, 출력 값 예제와 같은 정답이 되어야하는 알고리즘을 작성해야한다.
  */      
  int main() {
        //코드를 입력해주세요
  }
  `,
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
        // 유저 정보 조회
        this.$http.get('users/my-info')
          .then((resInfo) => {
            this.userid = resInfo.data.user.userId;
            const id = this.$route.params.num;
            this.$http.defaults.headers.common.Authorization = this.userToken;
            // 해당 라우터 파람의 값으로 문제 로드
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
                  // 대회기간이 아닌 경우
                  this.$swal({
                      // 실패 모달
                      title: '문제 로드 실패',
                      text: '대회기간이 아닙니다',
                      type: 'error',
                                                                        allowOutsideClick: false,
                    })
                    .then(() => {
                      // 문제페이지로 이동
                      location.href = '/problems';
                    });
                }
              });
          })
          .catch((error) => {
            // 유저 조회 실패
            this.$swal({
                // 실패 모달
                title: '유저 조회 실패',
                text: error,
                type: 'error',
                                                                  allowOutsideClick: false,
              })
              .then(() => {
                // 메인으로 이동
                location.href = '/';
              });
          });
      } else {
        // 토큰 인증 실패
        this.$swal({
            // 실패 모달
            title: '입장 실패',
            text: '로그인을 해주세요',
            type: 'error',
                                                              allowOutsideClick: false,
          })
          .then(() => {
            // 메인으로 이동
            location.href = '/';
          });
      }
    },
    updated() {
      this.$nextTick(() => {
        // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
    methods: {
      onMounted(editor) {
        // 에디터 생성
        this.editor = editor;
      },
      onCodeChange(editor) {
        // 에디터 감지
        this.code = editor.getValue();
      },
      codeReset() {
        // 에디터 초기화
        this.editor.setValue(`/*
  * 1. 입력받을 경우 scanf 는 단 한번만 사용한다.
  * 2. printf 는 몇번을 사용해도 상관없으나, 출력 예제와 나오도록 구현한다.
  * 3. 파일이나 시스템을 다루는 함수를 사용할 수 없으며, 혹여나 사용시 Runtime error를 띄움.
  * 4. 결과를 출력하는 코드를 작성할 때, 출력 예제 값과 동일한 형식으로 나오도록 해야한다.
  * 4-1. 출력 예제를 잘 보고, \\n 과 같은 줄넘김과 띄어쓰기를 주의하여 작성한다.
  * 5. stdio.h, math.h 라이브러리는 선언되어 있는 상태이다.
  * 6. 실행하기는 미리 값을 테스트 해보는 것으로 작성한 코드에 입력 값 예제가 들어가고, 출력 값 예제와 같은 정답이 되어야하는 알고리즘을 작성해야한다.
  */        
  int main() {
        //코드를 입력해주세요
  }
  `);
        this.code = `/*
  * 1. 입력받을 경우 scanf 는 단 한번만 사용한다.
  * 2. printf 는 몇번을 사용해도 상관없으나, 출력 예제와 나오도록 구현한다.
  * 3. 파일이나 시스템을 다루는 함수를 사용할 수 없으며, 혹여나 사용시 Runtime error를 띄움.
  * 4. 결과를 출력하는 코드를 작성할 때, 출력 예제 값과 동일한 형식으로 나오도록 해야한다.
  * 4-1. 출력 예제를 잘 보고, \\n 과 같은 줄넘김과 띄어쓰기를 주의하여 작성한다.
  * 5. stdio.h, math.h 라이브러리는 선언되어 있는 상태이다.
  * 6. 실행하기는 미리 값을 테스트 해보는 것으로 작성한 코드에 입력 값 예제가 들어가고, 출력 값 예제와 같은 정답이 되어야하는 알고리즘을 작성해야한다.
  */     
  */      
  int main() {
        //코드를 입력해주세요
  }
  `;
        this.runMsg = '실행 결과가 이곳에 나타납니다';
        this.codeResult = '';
      },
      codeRun() {
        // 에디터 실행
        if (this.code.replace(/^\s*/, '') === '') {
          // 공백만있는 경우
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
            // 실행 성공
            this.codeResult = resSubmit.data.result;
            this.runMsg = '실행 결과 ';
          })
          .catch((err) => {
            // 실행 실패
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
        // 코드 제출
        if (this.code.replace(/^\s*/, '') === '') {
          this.$swal(
            // 실패 모달
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
            // 제출 성공
            const result = resSubmit.data.result;
            if (result === 'success') {
              // 실패
              this.runMsg = 'SUCCESS';
              this.$swal({
                  // 성공 모달
                  title: '정답',
                  text: '다른 문제도 풀어보세요',
                  type: 'success',
                                                                    allowOutsideClick: false,
                })
                .then(() => {
                  // 문제페이지로 이동
                  location.href = '/problems';
                });
            } else {
              // 실패
              this.runMsg = 'FAIL';
              this.$swal(
                // 실패 모달
                '실패',
                '다시 도전해 보세요',
                'error',
              );
            }
          })
          .catch((err) => {
            // 제출 실패
            this.$swal({
              // 실패 모달
              title: '실패',
              text: '다시 도전해 보세요',
              type: 'error',
            });
          });
      },
    },
  };
</script>

<style src="../../assets/css/solve.css" scoped>
  
</style>

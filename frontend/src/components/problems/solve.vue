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
            <div class="solve_sidebar">
                <div class="sidebar_title">
                    <h3>문제 설명</h3>
                </div>
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
                    <monaco-editor height="600" language="c" :code="code" :editorOptions="options" @mounted="onMounted" @codeChange="onCodeChange">
                    </monaco-editor>
                </div>
                <div class="solve_footer">
                    <div class="solve_output">
                        실행 결과가 이곳에 나타납니다<br>
                        <pre>{{code}}</pre>
                    </div>
                    <div class="solve_button">
                        <div class="solve_run">
                            실행하기
                        </div>
                        <div class="solve_reset">
                            초기화하기
                        </div>
                        <div class="solve_submit" @click="codeSubmit">
                            제출하기
                        </div>
                    </div>
                </div>

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
      problemUrl: '"../api/problems/"',
      urlParams: '',
      items: [],
      lang: 'c',
      printf: null,
      scanf: null,
      result: '',
      code: '',
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
      },
    };
  },
  created() {
//    this.solveMenu = true;
//    if (this.$cookie.get('userToken') == null) {
//      alert('로그인 해주세요');
//      location.href = '/';
//    }
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
    codeSubmit() {
      const ROOT_URL = 'http://121.186.23.245:9999';
      this.$http.defaults.baseURL = ROOT_URL;
      this.$http.post('/api/solution', {
        inputcode: this.code,
        name: this.items[0].num,
        lang: this.lang,
      })
        .then((resSubmit) => {
      	  const num = resSubmit.data.name;
          this.printf = this.code.match('print');
          this.scanf = this.code.match('scanf');

          if (this.scanf == null) {
            // printf만 있을 경우
            console.log('printf');
            this.$http.get(`api/solution/${num}`)
              .then((resResult) => {
            	  console.log(resResult);
                this.result = resResult.data.result;
                console.log(this.result);
                if (this.result === this.items[0].outputex) {
                  this.$swal({
                  	title: '정답',
                    text: '다른 문제도 풀어보세요',
                    type: 'success',
                  })
                    .then(() => {
                      location.href = '/problems';
                    });
                } else {
                  this.$swal(
                    '실패',
                    '다시 도전해 보세요',
                    'error',
                  );
                }
              });
          } else {
          	// scanf 있을 경우
            console.log('scanf');
            const inputex = this.items[0].inputex;
            const outputex = this.items[0].outputex;
            console.log(inputex);
            console.log(num);
          	this.$http.get(`api/soliution/${num}/${decodeURI(inputex)}`)
              .then((resResult) => {
          		  this.result = resResult.data.result;
          		  if (this.result === outputex) {
          		  	console.log('정답');
            }
              });
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    inputCode(e) {
      this.code = e.target.value;
    },
    problemData() {

    },
  },
};
</script>
<style src="../../assets/css/solve.css" scoped></style>
<style scoped>

</style>

<template>
  <div class="probleminput" v-if="enteringProblemresult">
    <ul>
      <li v-for="data in problemData">
        <p>ID : {{data.userid}}</p>
        <br>
        <p>Num : {{data.num}}</p>
        <br>
        <p>language : {{data.lang}}</p>
        <br>
        <p>Date : {{data.date}}</p>
        <br>
        <pre>Code : {{data.code}}</pre>
        <br>
        <p>Result : {{data.result}}</p>
        <br>
        <p>Time : {{data.time}}</p>
        <br>
        <p>Memory : {{data.memory}}</p>
        <br>
        <br>
      </li>
      <br>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        problemData: [],
        ratioData: [],
        enteringProblemresult: false,
      };
    },
    created() {
      // 문제 결과 로드
      this.ratio();
    },
    updated() {
      this.$nextTick(() => {
        // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
    methods: {
      ratio() {
        // 문제 결과 로드
        this.userToken = this.$cookie.get('userToken');
        this.$http.defaults.headers.common.Authorization = this.userToken;
        this.$http.get('solution')
          .then((res) => {
            // 로드 성공
            let i = 0;
            while (i < res.data.resolves.length) {
              const date = res.data.resolves[i].resolveData.date.replace('T', ', ');
              this.problemData.push({
                userid: res.data.resolves[i].userId,
                code: res.data.resolves[i].resolveData.code,
                date: date.substring(0, date.length - 8),
                lang: res.data.resolves[i].resolveData.language,
                memory: res.data.resolves[i].resolveData.memory,
                num: res.data.resolves[i].resolveData.problemNum,
                result: res.data.resolves[i].resolveData.result,
                time: res.data.resolves[i].resolveData.time,
              });
              // 데이터 추가
              this.ratioData.push({
                [i]: res.data.resolves[i].resolveData.problemNum,
              });
              i += 1;
            }
            this.enteringProblemresult = true;
          })
          .catch((err) => {
            // 문제 결과 로드 실패
            this.$swal({
              // 실페 모달
              title: '문제 결과 로드 실패',
              text: err,
              type: 'error',
            });
          });
      },
    },
  };
</script>
<style scoped>

</style>
<style src="../../assets/css/problemresult.css" scoped></style>
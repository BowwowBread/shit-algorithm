<template>
    <div class="probleminput" v-if="enteringProblemresult">
        <ul>
            <li v-for="data in problemData">
                <p>ID : {{data.userid}}</p><br>
                <p>Num : {{data.num}}</p><br>
                <p>language : {{data.lang}}</p><br>
                <p>Date : {{data.date}}</p><br>
                <p>Code : {{data.code}}</p><br>
                <p>Result : {{data.result}}</p><br>
                <p>Time : {{data.time}}</p><br>
                <p>Memory : {{data.memory}}</p><br>
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
        problemData: [],
        ratioData: [],
        enteringProblemresult: false,
      };
    },
    created() {
      this.ratio();
    },
    beforeCreate() {
      this.$Progress.start();
    },
    updated() {
      this.$Progress.finish();
    },
    methods: {
      ratio() {
        this.userToken = this.$cookie.get('userToken');
        this.$http.defaults.headers.common.Authorization = this.userToken;
        this.$http.get('solution')
          .then((res) => {
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
          this.ratioData.push({
            [i]: res.data.resolves[i].resolveData.problemNum,
          });
          i += 1;
        }
        this.enteringProblemresult = true;
      })
        .catch((err) => {
          this.$swal({
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


<template>
    <div class="openNotice" v-if="entering">
        <p>번호 : {{num}}</p>
        <p>제목 : {{name}}</p>
        <p>내용 : {{contents}}</p>
        <p>날짜 : {{date}}</p>
    <div class="openNotice" v-i="entering">
      <div class="notipoll">
        <div class="notipen">
            <div class="noti-head">
                <p>{{name}}</p>
            </div>
            <hr>
            <div class="noti-main">
                <p>{{contents}}</p>
            </div>
        </div>
        <div class="noti-tag">
            <div class="noti1">
                <p>{{num}}</p>
            </div>
            <div class="noti2">
                <p>{{date}}</p>
            </div>
        </div>
      </div>
    </div>
    <div class="pageicon">
      <a href="/notice"><i class="big reply icon"></i></a>
    </div>
    </div>
</template>
<script>
    export default{
      name: 'openNotice',
      data() {
        return {
          num: '',
          name: '',
          contents: '',
          date: '',
          entering: false,
        };
      },
      updated() {
        this.$Progress.finish();
      },
      created() {
        const num = this.$route.params.num;
        console.log(num);
        this.$http.get(`notices/${num}`)
          .then((res) => {
              this.num = res.data.notice.num;
              this.name = res.data.notice.noticeName;
              this.contents = res.data.notice.contents;
              this.date = res.data.notice.date.replace('T', ', ');
              this.date = this.date.substring(0, this.date.length - 8);
              this.entering = true;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
</script>
<style src="../../assets/css/opennotice.css" scoped></style>

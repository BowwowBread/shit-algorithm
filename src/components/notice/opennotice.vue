<template>
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
      created() {
        const num = this.$route.params.num;
        console.log(num);
        this.$http.get(`notices/${num}`)
          .then((res) => {
              this.num = res.data.notice.num;
              this.name = res.data.notice.noticeName;
              this.contents = res.data.notice.contents;
              this.date = res.data.notice.date;
              this.entering = true;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
</script>
<style src="../../assets/css/opennotice.css" scoped></style>

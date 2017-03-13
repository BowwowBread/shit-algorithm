<template>
    <div class="openNotice">
        <p>번호 : {{num}}</p>
        <p>제목 : {{name}}</p>
        <p>내용 : {{contents}}</p>
        <p>날짜 : {{date}}</p>
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
        };
      },
      created() {
        const num = this.$route.params.num;
        this.noticenum = num;
        console.log(num);
        this.$http.get(`api/notices/${num}`)
          .then((res) => {
              this.num = res.data.notice.num;
              this.name = res.data.notice.noticeName;
              this.contents = res.data.notice.contents;
              this.date = res.data.notice.date;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
</script>
<style src="../../assets/css/opennotice.css" scoped></style>

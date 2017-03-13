<template>
    <div class="openNotice">
        openNotice{{noticenum}}
    </div>
</template>
<script>
    export default{
      name: 'openNotice',
      data() {
        return {
            noticenum: '',
        };
      },
      created() {
        const num = this.$route.params.num;
        this.noticenum = num;
        console.log(num);
        this.$http.get(`api/notices/${num}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
</script>
<style src="../../assets/css/opennotice.css" scoped></style>

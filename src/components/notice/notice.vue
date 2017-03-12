<template>
    <div id="notice">
        notice
    </div>
</template>
<script>
    export default {
      name: 'notice',
      data() {
        return {
          notices: [],
        };
      },
      created() {
        this.$http.get('api/notices')
          .then((res) => {
            let i = 0;
            while (i < res.data.notices.length) {
              this.notices.push({
                num: res.data.notices[i].num,
                noticename: res.data.notices[i],
              });
              i += 1;
            }
          })
          .catch((err) => {
            alert(err);
          });
      },
    };
</script>
<style src="../../assets/css/notice.css" scoped></style>
<style scoped>
    *{
        margin:0;
        padding:0;
    }
</style>

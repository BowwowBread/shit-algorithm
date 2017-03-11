<template>
  <div class="nonaccount">
    nonaccount
    <ul>

      <li v-for="member in members">
        아이디: <span>{{member.userid}}</span><br>
        이름: <span>{{member.username}}</span><br>
        학번 : <span>{{member.studentcode}}</span><br>
        등급 : <span>{{member.rating}}</span><br>
        승인여부 : <span>{{member.account}}</span><br>
        <button v-on:click="account(member.userid)">승인하기</button>
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
        members: [],
      };
    },
    created() {
      this.userToken = this.$cookie.get('userToken');
      console.log(this.userToken);
      this.getMember();
    },
    methods: {
    	account(userid) {
        this.$http.defaults.headers.common.Authorization = this.userToken;
        this.$http.get(`api/users/account/${userid}`)
        .then((res) => {
          console.log(res);
        });
    },
      getMember() {
	      this.$http.defaults.headers.common.Authorization = this.userToken;
	      this.$http.get('api/users/non-account')
          .then((res) => {
            let i = 0;
            while (i < res.data.users.length) {
              this.members.push({
                userid: res.data.users[i].userId,
                username: res.data.users[i].username,
                studentcode: res.data.users[i].studentCode,
                rating: res.data.users[i].rating,
                account: res.data.users[i].account,
              });
              i += 1;
            }
          });
      },
    },
  };
</script>
<style scoped>

</style>

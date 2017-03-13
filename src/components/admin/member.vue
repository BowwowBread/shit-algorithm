<template>
    <div class="member">
        <ul>

            <li v-for="member in members">
                아이디: <span>{{member.userid}}</span><br>
                이름: <span>{{member.username}}</span><br>
                학번 : <span>{{member.studentcode}}</span><br>
                점수 : <span>{{member.score}}</span><br>
                <button v-on:click="deleteuser(member.userid, member)">유저 삭제</button>
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
	  //토큰테스트
      this.getMember();
  },
  methods: {
  	deleteuser(userid, member) {
		  this.$swal({
				  title: '문제 삭제',
				  text: '정말로 삭제하시겠습니까?',
				  type: 'question',
				  showCancelButton: true,
				  confirmButtonText: '삭제',
				  cancelButtonText: '취소',
			  })
			  .then(() => {
                  this.$http.delete(`api/users/${userid}`)
                        .then(() => {
						  this.$swal({
							  title: '삭제 완료',
							  text: `${userid} 님의 계정이 삭제되었습니다`,
							  type: 'success',
						  });
                          this.members.splice(this.members.indexOf(member), 1);
                        })
					  .catch((err) => {
						  this.$swal({
							  title: '삭제 실패',
							  text: err,
							  type: 'error',
						  });
					  });
			  })
			  .catch(() => {
				  this.$swal({
					  title: '삭제 실패',
                      text: err,
					  type: 'error',
				  });
			  });
    },
//            문제리스트
    getMember() {
	    this.userToken = this.$cookie.get('userToken');
	    this.$http.defaults.headers.common.Authorization = this.userToken;
	    this.$http.get('api/users')
        .then((res) => {
          let i = 0;
          while (i < res.data.users.length) {
            this.members.push({
              userid: res.data.users[i].userId,
              username: res.data.users[i].username,
              studentcode: res.data.users[i].studentCode,
              score: res.data.users[i].score,
            });
            i += 1;
          }
        })
          .catch((err) => {
	          this.$swal({
			          title: '유저 로드 실패',
			          text: err,
			          type: 'error',
		          });
          });
    },
  },
};
</script>
<style src="../../assets/css/member.css" scoped></style>


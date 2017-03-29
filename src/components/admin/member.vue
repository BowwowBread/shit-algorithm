<template>
    <div class="member" v-if="enteringMember">
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
      enteringMember: false,
    };
  },
  created() {
	  // 유저 정보 로드
    this.getMember();
  },
  updated() {
    this.$nextTick(() => {
      // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
      this.$store.commit('loadingOff');
      this.$Progress.finish();
    });
  },
  methods: {
  	deleteuser(userid, member) {
      // 유저 삭제
		  this.$swal({
        // 삭제 확인 모달
				  title: '유저 삭제',
				  text: '정말로 삭제하시겠습니까?',
				  type: 'question',
				  showCancelButton: true,
				  confirmButtonText: '삭제',
				  cancelButtonText: '취소',
			  })
			  .then(() => {
                  this.$http.delete(`users/${userid}`)
                        .then(() => {
                          // 삭제 완료
						  this.$swal({
                // 삭제 완료 모달
							  title: '삭제 완료',
							  text: `${userid} 님의 계정이 삭제되었습니다`,
							  type: 'success',
						  });
              // 리스트의 해당 인덱스의 유저 삭제
                          this.members.splice(this.members.indexOf(member), 1);
                        })
					  .catch((err) => {
              // 삭제 실패
						  this.$swal({
                // 삭제 실패 모달
							  title: '삭제 실패',
							  text: err,
							  type: 'error',
						  });
					  });
			  })
			  .catch(() => {
          // 삭제 실패
				  this.$swal({
            // 삭제 실패 모달
					  title: '삭제 실패',
                      text: err,
					  type: 'error',
				  });
			  });
    },
    getMember() {
      // 유저 정보 로드
	    this.$http.get('users')
        .then((res) => {
          // 로드 성공
          let i = 0;
          while (i < res.data.users.length) {
            // 데이터 추가
            this.members.push({
              userid: res.data.users[i].userId,
              username: res.data.users[i].username,
              studentcode: res.data.users[i].studentCode,
              score: res.data.users[i].score,
            });
            i += 1;
          }
      this.enteringMember = true;
    })
          .catch((err) => {
            // 유저 정보 로드 실패
	          this.$swal({
              // 로드 실패 모달
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


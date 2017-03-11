<template>
    <div id='mypage'>
        <div class='myinfo'>
            <ul>
                <li>
                    <p>이름</p>
                    <p>학번</p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            userToken: '',
        };
    },
    beforeCreate() {
	    const ROOT_URL = 'http://121.186.23.245:9999';
	    this.$http.defaults.baseURL = ROOT_URL;

//          토큰 테스트
	    this.userToken = this.$cookie.get('userToken');
	    if (this.userToken != null) {
		    this.userToken = this.$cookie.get('userToken');
		    this.$http.defaults.headers.common.Authorization = this.userToken;
		    this.$http.get('/api/users/my-info')
		    .then((resInfo) => {
			    if (resInfo.status === 200) {
				    this.userid = resInfo.data.user.userId;
			    }
		    })
		    .catch((error) => {
                this.$swal({
                    title: '유저 조회 실패',
                    text: error,
                    type: 'error',
                })
                .then(() => {
                    location.href = '/';
                });
		    });
	    } else {
            this.$swal({
                title: '입장 실패',
                text: '로그인을 해주세요',
                type: 'error',
            })
            .then(() => {
                location.href = '/';
            });
        }
    },
};
</script>
<style scoped>

</style>

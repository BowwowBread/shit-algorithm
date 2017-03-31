<template>
    <div class="openNotice">
        <div class="notice" v-if="entering">
            <div class="notipoll">
                <div class="notipen">
                    <div class="noti-head">
                        <p>{{name}}</p>
                    </div>
                    <div class="noti-main">
                        <div class="noti-in">
                            <p>{{contents}}</p>
                        </div>
                        <div class="noti-sub">
                            <p><span>{{num}}</span>번</p>
                            <p><span>{{date}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pageicon">
            <a href="/notice">
                <i class="big reply icon"></i>
            </a>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
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
            this.$nextTick(() => {
                // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
                this.$store.commit('loadingOff');
                this.$Progress.finish();
            });
        },
        created() {
            // 선택한 공지 로드            
            const num = this.$route.params.num;
            // 해당라우터의 파람값으로 공지를 로드
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
                    // 공지 로드 실패
                    this.$swal({
                        // 실패 모달
                        title: `${this.num}번 공지 로드 실패`,
                        text: err,
                        type: 'error',
                        allowOutsideClick: false,
                    })
                    .then(() => {
                        location.href = '/notice';
                    });
                });
        },
    };
</script>

<style src="../../assets/css/opennotice.css" scoped>
    
</style>

<template>
<div id="monitor">
    <div class="button">
        <div class="wrapper">
            <div class="four">
              <div class="btn">
                <button class="ui button">
                  On
                </button>
                <button class="ui button">
                  Off
                </button>
              </div>
                <div class="ui cards">
                    <div class="card" id="mncard">
                        <div class="content">
                            <div class="header"><a href="#">일반문제</a></div>
                            <div class="header"><a href="#">대회문제</a></div>
                        </div>
                    </div>
                </div>
                <div class="ui cards">
                    <div class="card" id="topcard">
                        <div class="content">
                            <div class="contentin">
                                <div class="header">
                                    <p>푼 문제</p>
                                </div>
                                <div class="header">
                                    <p>맞춘 문제</p>
                                </div>
                                <div class="header">
                                    <p>틀린 문제</p>
                                </div>
                            </div>
                            <hr>
                            <div class="content">
                                <div class="contentin">
                                    <p>1,232</p>
                                    <p>1,232</p>
                                    <p>1,232</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui cards">
                    <div class="card">
                        <div class="content">
                            <div class="header">
                                <p>아이디 : <span>admin</span></p>
                            </div>
                            <div class="meta">
                                <p>학번 : <span>10626</span></p>
                            </div>
                            <div class="meta">
                                <p>이름 : <span>기무띠</span></p>
                            </div>
                            <div class="meta">
                                <p>제출 결과 : <span>true / false</span></p>
                            </div>
                            <hr>
                            <div class="description">
                                <p>코드 : <span>12313124123131241231312412313124</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="content">
                            <div class="header">
                                <p>아이디 : <span>admin</span></p>
                            </div>
                            <div class="meta">
                                <p>학번 : <span>10626</span></p>
                            </div>
                            <div class="meta">
                                <p>이름 : <span>기무띠</span></p>
                            </div>
                            <hr>
                            <div class="description">
                                <p>코드 : <span>12313124</span></p>
                                <p>제출 결과 : <span>true / false</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'monitor',
    data() {
        return {

        };
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            this.$store.commit('loadingOff');
            this.$Progress.finish();
        });
    },
    methods: {
        monitoring() {
            this.$http.get('solution')
                .then((res) => {
                    let i = 0;
                    while (i < res.data.resolves.length) {
                        const data = res.data.resolves[i].resolveData.data.replace('T', ', ');
                        this.monitorData.push({
                            userid: res.data.resolves[i].userId,
                            code: res.data.resolves[i].resolveData.code,
                            date: data.substring(0, data.length - 8),
                            lang: res.data.resolves[i].resolveData.language,
                            memory: res.data.resolves[i].resolveData.memory,
                            num: res.data.resolves[i].resolveData.problemNum,
                            result: res.data.resolves[i].resolveData.result,
                            time: res.data.resolves[i].resolveData.time,
                        });
                        i += 1;
                    }
                });
        },
    },
};
</script>






<style src="../../assets/css/monitor.css" scoped></style>

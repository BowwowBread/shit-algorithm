<template>
<div id="monitor">
    <div class="button">
        <div class="wrapper">
            <h1>Menu</h1>
            <a class="menu-btn" onclick="toggleMenu()"></a>
            <section class="one" onclick="goToPage(0)">
                <h1>Profile</h1>
            </section>
            <section class="two" onclick="goToPage(1)">
                <h1>Friends</h1>
            </section>
            <section class="three" onclick="goToPage(2)">
                <h1>Messages</h1>
            </section>
            <section class="four" onclick="goToPage(3)">
                <h1>Settings</h1>
                <div class="ui cards">
                    <div class="card" id="card">
                        <div class="content">
                            <div class="header"><p>아이디 : <span>admin</span></p></div>
                            <div class="meta"><p>학번 : <span>10626</span></p></div>
                            <div class="meta"><p>이름 : <span>기무띠</span></p></div>
                            <hr>
                            <div class="description">
                                <p>코드 : <span>12313124</span></p>
                                <p>제출 결과 : <span>ture / false</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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

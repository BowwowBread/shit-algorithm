<template>
    <div id="monitor" v-if="entering">
        <div class="button">
            <div class="wrapper">
                <div class="four">
                    <div class="btn">
                        <button class="ui button">On</button>
                        <button class="ui button">Off</button>
                    </div>
                    <div class="ui cards">
                        <div class="card" id="mncard">
                            <div class="content">
                                <div class="header" v-on:click="normalMonitor"><a href="#">일반문제</a></div>
                                <div class="header" v-on:click="contestMonitor"><a href="#">대회문제</a></div>
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
                                    <div class="header">
                                        <p>컴파일 에러</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="content">
                                    <div class="contentin">
                                        <p>{{count}}</p>
                                        <p>{{success}}</p>
                                        <p>{{fail}}</p>
                                        <p>{{compileError}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <transition-group name="monitorlist" tag="div" class="ui cards">
                        <div class="card" v-for="monitor in monitorData" v-bind:key="monitor">
                            <div class="content">
                                <div class="header">
                                    <p>아이디 : <span>{{monitor.userid}}</span></p>
                                </div>
                                <div class="meta">
                                    <p>번호 : <span>{{monitor.num}}</span></p>
                                </div>
                                <div class="meta">
                                    <p>결과 : <span>{{monitor.result}}</span></p>
                                </div>
                                <div class="meta">
                                    <p>날짜 : <span>{{monitor.date}}</span></p>
                                </div>
                                <div class="meta">
                                    <p>시간/메모리 : <span>{{monitor.time}} / {{monitor.memory}}</span></p>
                                </div>
                                <hr>
                                <div class="description">
                                    <p>코드 : <span>{{monitor.code}}</span></p>
                                </div>
                            </div>
                        </div>
                        </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let i = 0;
    export default {
        name: 'monitor',
        data() {
            return {
                entering: false,
                monitorState: 'normal',
                monitorData: [],
                count: 0,
                success: 0,
                fail: 0,
                compileError: 0,
                resolveLength: 0,
            };
        },
        created() {
            this.userToken = this.$cookie.get('userToken');
            if (this.userToken != null) {
                this.$http.defaults.headers.common.Authorization = this.userToken;
                this.$http.get('users/my-info')
                    .then((resInfo) => {
                        this.userRating = resInfo.data.user.rating;
                        if (this.userRating !== 3) {
                            this.$swal({
                                    title: '입장 실패',
                                    text: '어드민이 아닙니다',
                                    type: 'error',
                                })
                                .then(() => {
                                    location.href = '/';
                                });
                        } else {
                            this.entering = true;
                            this.monitoring('first');
                            setInterval(() => {
                                this.monitoring('more');
                            }, 3000);
                        }
                    })
                    .catch((error) => {
                        this.$swal({
                                title: '유저 정보 조회 실패',
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
        mounted() {
            this.$nextTick(() => {
                this.$store.commit('loadingOff');
                this.$Progress.finish();
            });
        },
        methods: {
            normalMonitor() {
                this.monitorState = 'normal';
                this.monitorData = [];
                i = 0;
                this.monitoring('first');
                i = 0;
                setInterval(() => {
                    this.monitoring('more');
                }, 3000);
            },
            contestMonitor() {
                this.monitorState = 'contest';
                this.monitorData = [];
                i = 0;
                this.monitoring('first');
                i = 0;
                setInterval(() => {
                    this.monitoring('more');
                }, 3000);
            },
            monitoring(state) {
                this.$http.get('solution')
                    .then((res) => {
                        if (state === 'first') {
                            console.log('first');
                            this.success = 0;
                            this.fail = 0;
                            this.count = 0;
                            this.compileError = 0;
                            this.resolveLength = 0;
                            while (i < res.data.resolves.length) {
                                if (this.monitorState === 'normal') {
                                    if (res.data.resolves[i].resolveData.problemType === 'normal') {
                                        const data = res.data.resolves[i].resolveData.date.replace('T', ', ');
                                        if (res.data.resolves[i].resolveData.result === 'success') {
                                            this.success += 1;
                                        } else if (res.data.resolves[i].resolveData.result === 'fail') {
                                            this.fail += 1;
                                        } else if (res.data.resolves[i].resolveData.result === 'compile error') {
                                            this.compileError += 1;
                                        }
                                        this.count += 1;
                                        this.monitorData.push({
                                            userid: res.data.resolves[i].userId,
                                            code: res.data.resolves[i].resolveData.code,
                                            date: data.substring(0, data.length - 8),
                                            memory: res.data.resolves[i].resolveData.memory,
                                            num: res.data.resolves[i].resolveData.problemNum,
                                            result: res.data.resolves[i].resolveData.result,
                                            time: res.data.resolves[i].resolveData.time,
                                        });
                                    }
                                } else if (this.monitorState === 'contest') {
                                    if (res.data.resolves[i].resolveData.problemType === 'contest') {
                                        const data = res.data.resolves[i].resolveData.date.replace('T', ', ');
                                        if (res.data.resolves[i].resolveData.result === 'success') {
                                            this.success += 1;
                                        } else if (res.data.resolves[i].resolveData.result === 'fail') {
                                            this.fail += 1;
                                        } else if (res.data.resolves[i].resolveData.result === 'compile error') {
                                            this.compileError += 1;
                                        }
                                        this.count += 1;
                                        this.monitorData.push({
                                            userid: res.data.resolves[i].userId,
                                            code: res.data.resolves[i].resolveData.code,
                                            date: data.substring(0, data.length - 8),
                                            memory: res.data.resolves[i].resolveData.memory,
                                            num: res.data.resolves[i].resolveData.problemNum,
                                            result: res.data.resolves[i].resolveData.result,
                                            time: res.data.resolves[i].resolveData.time,
                                        });
                                    }
                                }
                                i += 1;
                                this.resolveLength = this.count;
                            }
                        } else if (state === 'more') {
                            i = 0;
                            this.count = 0;
                            if (this.monitorState === 'normal') {
                                while (i < res.data.resolves.length) {
                                    if (res.data.resolves[i].resolveData.problemType === 'normal') {
                                        this.count += 1;
                                    }
                                    i += 1;
                                }
                            } else if (this.monitorState === 'contest') {
                                while (i < res.data.resolves.length) {
                                    if (res.data.resolves[i].resolveData.problemType === 'contest') {
                                        this.count += 1;
                                    }
                                    i += 1;
                                }
                            }
                            if (this.resolveLength !== this.count) {
                                console.log('more');
                                i = (this.count - 1) - this.resolveLength;
                                while (i >= 0) {
                                    console.log(i);
                                    if (this.monitorState === 'normal') {
                                        if (res.data.resolves[i].resolveData.problemType === 'normal') {
                                            const data = res.data.resolves[i].resolveData.date.replace('T', ', ');
                                            if (res.data.resolves[i].resolveData.result === 'success') {
                                                this.success += 1;
                                            } else if (res.data.resolves[i].resolveData.result === 'fail') {
                                                this.fail += 1;
                                            } else if (res.data.resolves[i].resolveData.result === 'compile error') {
                                                this.compileError += 1;
                                            }
                                            this.monitorData.unshift({
                                                userid: res.data.resolves[i].userId,
                                                code: res.data.resolves[i].resolveData.code,
                                                date: data.substring(0, data.length - 8),
                                                memory: res.data.resolves[i].resolveData.memory,
                                                num: res.data.resolves[i].resolveData.problemNum,
                                                result: res.data.resolves[i].resolveData.result,
                                                time: res.data.resolves[i].resolveData.time,
                                            });
                                        }
                                    } else if (this.monitorState === 'contest') {
                                        if (res.data.resolves[i].resolveData.problemType === 'contest') {
                                            const data = res.data.resolves[i].resolveData.date.replace('T', ', ');
                                            if (res.data.resolves[i].resolveData.result === 'success') {
                                                this.success += 1;
                                            } else if (res.data.resolves[i].resolveData.result === 'fail') {
                                                this.fail += 1;
                                            } else if (res.data.resolves[i].resolveData.result === 'compile error') {
                                                this.compileError += 1;
                                            }
                                            this.monitorData.unshift({
                                                userid: res.data.resolves[i].userId,
                                                code: res.data.resolves[i].resolveData.code,
                                                date: data.substring(0, data.length - 8),
                                                memory: res.data.resolves[i].resolveData.memory,
                                                num: res.data.resolves[i].resolveData.problemNum,
                                                result: res.data.resolves[i].resolveData.result,
                                                time: res.data.resolves[i].resolveData.time,
                                            });
                                        }
                                    }
                                    i -= 1;
                                }
                                this.resolveLength = this.count;                                
                            }
                        }
                    })
                    .catch((err) => {
                        this.$swal({
                                title: '모니터링 페이지 오류',
                                text: err,
                                type: 'error',
                            })
                            .then(() => {
                                location.href = '/';
                            });
                    });
            },
        },
    };
</script>

<style src="../../assets/css/monitor.css" scoped>
    
</style>

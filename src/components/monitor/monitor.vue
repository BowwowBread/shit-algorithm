<template>
    <div id="monitor" v-if="entering">
        <div class="button">
            <div class="wrapper">
                <div class="four">
                    <div class="btn">
                        <button class="ui button" @click="contestOpen">On</button>
                        <button class="ui button" @click="contestClose">Off</button>
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
                    <transition-group name="monitorlist" tag="ul" class="ui cards">
                        <div class="card" v-for="monitor in monitorData" v-bind:key="monitor" v-on:click="codeView(monitor)">
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
    let monitoring = null;
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
            // 토큰 테스트
            this.userToken = this.$cookie.get('userToken');
            if (this.userToken != null) {
                this.$http.defaults.headers.common.Authorization = this.userToken;
                this.$http.get('users/my-info')
                    .then((resInfo) => {
                        // 유저정보 확인
                        this.userRating = resInfo.data.user.rating;
                        if (this.userRating !== 3) {
                            // 어드민이 아닌 경우
                            this.$swal({
                                    // 실패 모달
                                    title: '입장 실패',
                                    text: '어드민이 아닙니다',
                                    type: 'error',
                                                      allowOutsideClick: false,
                                })
                                .then(() => {
                                    // 메인으로 이동
                                    location.href = '/';
                                });
                        } else {
                            // 어드민인 경우
                            this.entering = true;
                            // 모니터링 시작                            
                            this.monitoring('first');
                            monitoring = setInterval(() => {
                                // 3초마다 모니터링 시작
                                this.monitoring('more');
                            }, 3000);
                        }
                    })
                    .catch((error) => {
                        // 유저 정보 조회 실패
                        this.$swal({
                                // 실패 모달
                                title: '유저 정보 조회 실패',
                                text: error,
                                type: 'error',
                                                  allowOutsideClick: false,
                            })
                            .then(() => {
                                // 메인으로 이동
                                location.href = '/';
                            });
                    });
            } else {
                // 토큰 테스트 실패
                this.$swal({
                        // 실패 모달
                        title: '입장 실패',
                        text: '로그인을 해주세요',
                        type: 'error',
                                          allowOutsideClick: false,
                    })
                    .then(() => {
                        // 메인으로 이동
                        location.href = '/';
                    });
            }
        },
        mounted() {
            this.$nextTick(() => {
                // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
                this.$store.commit('loadingOff');
                this.$Progress.finish();
            });
        },
        methods: {
            normalMonitor() {
                // 일반 모니터링
                this.monitorState = 'normal';
                this.monitorData = [];
                i = 0;
                this.monitoring('first');
                clearInterval(monitoring);
                monitoring = setInterval(() => {
                    this.monitoring('more');
                }, 3000);
            },
            contestMonitor() {
                // 대회 모니터링
                this.monitorState = 'contest';
                this.monitorData = [];
                i = 0;
                this.monitoring('first');
                clearInterval(monitoring);
                monitoring = setInterval(() => {
                    this.monitoring('more');
                }, 3000);
            },
            codeView(item) {
                this.$swal({
                    title: 'Code',
                    html: `<pre style="text-align:left;">${item.code}</pre>`,
                });
            },
            contestOpen() {
                this.$http.get('users/contest/true')
                    .then(() => {
                        this.$swal(
                            '대회 오픈',
                            '대회가 시작되었습니다.',
                            'success',
                        );
                    })
                    .catch((err) => {
                        this.$swal({
                            title: '대회 오픈 실패',
                            text: err,
                            type: 'error',
                        });
                    });
            },
            contestClose() {
                this.$http.get('users/contest/false')
                    .then(() => {
                        this.$swal(
                            '대회 종료',
                            '대회가 종료되었습니다.',
                            'success',
                        );
                    })
                    .catch((err) => {
                        this.$swal({
                            title: '대회 종료 실패',
                            text: err,
                            type: 'error',
                        });
                    });
            },
            monitoring(state) {
                // 문제 결과 로드
                this.$http.get('solution')
                    .then((res) => {
                        // 로드 성공
                        if (state === 'first') {
                            // 처음 모니터링하는 경우
                            this.success = 0;
                            this.fail = 0;
                            this.count = 0;
                            this.compileError = 0;
                            this.resolveLength = 0;
                            while (i < res.data.resolves.length) {
                                if (this.monitorState === 'normal') {
                                    // 일반 모니터링인 경우
                                    if (res.data.resolves[i].resolveData.problemType === 'normal') {
                                        const data = res.data.resolves[i].resolveData.date.replace('T', ', ');
                                        // 성공 실패 총 결과 
                                        if (res.data.resolves[i].resolveData.result === 'success') {
                                            this.success += 1;
                                        } else if (res.data.resolves[i].resolveData.result === 'fail') {
                                            this.fail += 1;
                                        } else if (res.data.resolves[i].resolveData.result === 'compile error') {
                                            this.compileError += 1;
                                        }
                                        this.count += 1;
                                        // 데이터 추가
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
                                    // 대회 모니터링인 경우
                                    if (res.data.resolves[i].resolveData.problemType === 'contest') {
                                        const data = res.data.resolves[i].resolveData.date.replace('T', ', ');
                                        // 성공 실패 총 결과                                         
                                        if (res.data.resolves[i].resolveData.result === 'success') {
                                            this.success += 1;
                                        } else if (res.data.resolves[i].resolveData.result === 'fail') {
                                            this.fail += 1;
                                        } else if (res.data.resolves[i].resolveData.result === 'compile error') {
                                            this.compileError += 1;
                                        }
                                        this.count += 1;
                                        // 데이터 추가
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
                                // 현재 개수 저장
                                this.resolveLength = this.count;
                            }
                        } else if (state === 'more') {
                            // 처음 이후 모니터링
                            i = 0;
                            this.count = 0;
                            if (this.monitorState === 'normal') {
                                // 일반 모니터링인 경우
                                while (i < res.data.resolves.length) {
                                    // 문제 결과 개수 로드                                    
                                    if (res.data.resolves[i].resolveData.problemType === 'normal') {
                                        this.count += 1;
                                    }
                                    i += 1;
                                }
                            } else if (this.monitorState === 'contest') {
                                // 대회 모니터링인 경우
                                while (i < res.data.resolves.length) {
                                    // 문제 결과 개수 로드
                                    if (res.data.resolves[i].resolveData.problemType === 'contest') {
                                        this.count += 1;
                                    }
                                    i += 1;
                                }
                            }
                            if (this.resolveLength !== this.count) {
                                // 전의 문제결과 개수와 현재 문제결과의 개수가 다른 경우
                                // 최신문제가 인덱스 0 이므로 0부터 시작
                                i = (this.count - 1) - this.resolveLength;
                                while (i >= 0) {
                                    if (this.monitorState === 'normal') {
                                        // 일반 모니터링인 경우
                                        if (res.data.resolves[i].resolveData.problemType === 'normal') {
                                            const data = res.data.resolves[i].resolveData.date.replace('T', ', ');
                                            // 성공 샐피 총 결과
                                            if (res.data.resolves[i].resolveData.result === 'success') {
                                                this.success += 1;
                                            } else if (res.data.resolves[i].resolveData.result === 'fail') {
                                                this.fail += 1;
                                            } else if (res.data.resolves[i].resolveData.result === 'compile error') {
                                                this.compileError += 1;
                                            }
                                            // 데이터를 앞에서부터 추가
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
                                            // 성공 실패 총 결과
                                            if (res.data.resolves[i].resolveData.result === 'success') {
                                                this.success += 1;
                                            } else if (res.data.resolves[i].resolveData.result === 'fail') {
                                                this.fail += 1;
                                            } else if (res.data.resolves[i].resolveData.result === 'compile error') {
                                                this.compileError += 1;
                                            }
                                            // 데이터를 앞에서부터 추가
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
                                // 현재 개수 저장
                                this.resolveLength = this.count;
                            }
                        }
                    })
                    .catch((err) => {
                        // 문제 결과 로드 실패
                        this.$swal({
                                // 실패 모달
                                title: '모니터링 페이지 오류',
                                text: err,
                                type: 'error',
                            })
                            .then(() => {
                                // 메인으로 이동
                                location.href = '/';
                            });
                    });
            },
        },
    };
</script>

<style src="../../assets/css/monitor.css" scoped>
    
</style>

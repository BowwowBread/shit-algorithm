<template>
    <div class="noticemanage" v-if="enteringNoticemanage">
        <button v-on:click="noticeAdd">{{noticeMsg}}</button>
        <div class="addNotice" v-if="noticeAddState">
            <div class="inputNotice">
                <label for="name">name : </label><input type="text" v-model="name" id="name"><br>
                <label for="content">content : </label><input type="text" v-model="content" id="content"><br>
                <select v-model="type">
                    <option value="notice">공지</option>
                    <option value="news">뉴스피드</option>
                </select>
            </div>
            <button v-on:click="addNotice">등록하기</button>
        </div>
        <div class="listNotice">
            <ul>
                <li v-for="notice in noticeList">
                    <p>번호 : {{notice.num}}</p><br>
                    <p>제목 : {{notice.name}}</p><br>
                    <p>내용 : {{notice.content}}</p><br>
                    <p>타입 : {{notice.type}}</p><br>
                    <button v-on:click="modifyNotice(notice.num)">공자수정</button>
                    <button v-on:click="deleteNotice(notice.num, notice)">공지삭제</button>
                    <div class="noticeModify" v-if="notice.num == num && noticeModify">
                        <label for="name">name : </label><input type="name" v-model="name" id="name" ><br>
                        <label for="content">content : </label><input type="content" v-model="content" id="content"><br>
                        <label for="type">type : </label>
                        <select v-model="type">
                            <option value="notice">공지</option>
                            <option value="news">뉴스</option>
                        </select>
                        <button v-on:click="modify">수정하기</button>
                    </div>
                    <br>
                    <br>
                </li>
                <br>
            </ul>
        </div>
    </div>
</template>
<script>

export default{
  name: 'noticemanage',
  data() {
    return {
      noticeAddState: false,
      noticeMsg: '공지 등록하기',
      name: '',
      num: '',
      content: '',
      type: 'notice',
      noticeList: [],
      noticeModify: false,
      lastNotice: 0,
      enteringNoticemanage: false,
    };
  },
  created() {
    this.loadNotice();
  },
  updated() {
    this.$nextTick(() => {
      this.$store.commit('loadingOff');
      this.$Progress.finish();
    });
  },
  methods: {
    modify() {
      this.$http.put('notices', {
          num: this.num,
          noticeName: this.name,
          contents: this.content,
          type: this.type,
        })
        .then(() => {
          this.$swal({
            title: '수정 성공',
            text: '공지를 수정하였습니다',
            type: 'success',
          });
        })
        .catch((err) => {
          let errMsgs;
          if (err.response.data.message === 'validation error') {
            errMsgs = '모든 정보를 입력해주세요';
          }
          this.$swal({
            title: '수정 실패',
            text: errMsgs,
            type: 'error',
          });
        });
    },
    noticeAdd() {
      this.noticeAddState = !this.noticeAddState;
      if (this.noticeAddState) {
        this.noticeMsg = '닫기';
      } else {
        this.noticeMsg = '공지 등록하기';
      }
    },
    modifyNotice(num) {
      this.$http.get(`notices/${num}`)
        .then((res) => {
          this.noticeModify = !this.noticeModify;
          this.num = res.data.notice.num;
          this.name = res.data.notice.noticeName;
          this.content = res.data.notice.contents;
          this.type = res.data.notice.type;
        })
        .catch((err) => {
          this.$swal({
            title: '공지 조회 실패',
            text: err,
            type: 'error',
          });
        });
    },
    deleteNotice(num, notice) {
      this.$swal({
          title: '공 삭제',
          text: '정말로 삭제하시겠습니까?',
          type: 'question',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
        })
        .then(() => {
          this.$http.delete(`notices/${num}`)
            .then(() => {
              this.$swal({
                title: '삭제 완료',
                test: `${num}번 공지를 삭제하셨습니다`,
                type: 'success',
              });
              this.noticeList.splice(this.noticeList.indexOf(notice), 1);
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
    loadNotice() {
      this.$http.get('notices')
        .then((res) => {
          let i = 0;
          while (i < res.data.notices.length) {
            this.noticeList.push({
              name: res.data.notices[i].noticeName,
              content: res.data.notices[i].contents,
              type: res.data.notices[i].type,
              num: res.data.notices[i].num,
            });
            this.lastNotice = res.data.notices[i].num;
            i += 1;
          }
          this.enteringNoticemanage = true;
        })
        .catch((err) => {
          this.$swal({
            title: '공지 로드 실패',
            text: err.response.data.message,
            type: 'error',
          });
        });
    },
    addNotice() {
      this.$http.post('notices', {
        noticename: this.name,
        contents: this.content,
        type: this.type,
      })
        .then(() => {
            this.$swal(
              '등록 성공',
              '공지를 등록하였습니다',
              'success',
            );
            this.noticeList.push({
              num: this.lastNotice + 1,
              name: this.name,
              content: this.content,
              type: this.type,
            });
        })
        .catch((err) => {
            let errMsg;
            if (err.response.data.message === 'validation error') {
              errMsg = '정보를 모두 입력해주세요';
            }
            this.$swal({
              title: '등록 실패',
              text: errMsg,
              type: 'error',
            });
        });
    },
  },
};
</script>
<style src="../../assets/css/noticemanage.css" scoped></style>


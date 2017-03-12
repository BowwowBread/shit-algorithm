<template>
    <div class="noticemanage">
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
                    <button v-on:click="modifyNotice(notice.num)">공자수정</button>
                    <button v-on:click="deleteNotice(notice.num)">공지삭제</button>
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
      content: '',
      type: 'notice',
      noticeList: [],
    };
  },
  create() {
    this.loadNotice();
  },
  methods: {
    noticeAdd() {
      this.noticeAddState = !this.noticeAddState;
      if (this.noticeAddState) {
        this.noticeMsg = '닫기';
      } else {
        this.noticeMsg = '공지 등록하기';
      }
    },
    modifyNotice(num) {
      this.$http.put('api/notices', {
        num,
        noticename: this.name,
        contents: this.content,
      })
        .then(() => {
          this.$swal(
            '수정 성공',
            '공지를 수정하였습니다',
          );
        });
    },
    deleteNotice(num) {
      this.$swal({
          title: '문제 삭제',
          text: '정말로 삭제하시겠습니까?',
          type: 'question',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
        })
        .then(() => {
          this.$http.delete(`api/notices/${num}`)
            .then(() => {
              this.$swal({
                title: '삭제 완료',
                test: `${num}번 공지를 삭제하셨습니다`,
                type: 'success',
              });
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
      this.$http.get('api/notices')
        .then((res) => {
          let i = 0;
          while (i < res.data.length) {
            this.noticeList.push({
              name: res.data.noticename,
              content: res.data.contents,
            });
            i += 1;
          }
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
      this.$http.post('api/notices', {
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
              name: this.name,
              content: this.content,
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
<style scoped>

</style>

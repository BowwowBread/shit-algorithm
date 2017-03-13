<template>
<div class="timeline">

  <div id="content">
    <div class="ui grid" id="micon">
      <div class="five wide column">
        <i class="massive write icon"></i>
        <h1 class="ui header">제일 많이 푼 문제
                 <div class="sub header">
                   <p>100번 문제</p>
                   <p class="iconpol"><i class="caret right icon"></i><a href="#">풀러가기</a></p></div>
               </h1>
      </div>
      <div class="six wide column">
        <i class="massive thumbs  up icon"></i>
        <h1 class="ui header">인기있는 문제
                 <div class="sub header">
                   <p>100번 문제</p>
                   <p class="iconpol"><i class="caret right icon"></i><a href="#">풀러가기</a></p></div>
               </h1>
      </div>
      <div class="five wide column">
        <i class="massive student icon"></i>
        <h1 class="ui header">도전 해볼만한 문제
                 <div class="sub header">
                   <p>100번 문제</p>
                   <p class="iconpol"><i class="caret right icon"></i><a href="#">풀러가기</a></p></div>
               </h1>
      </div>
    </div>
    <div class="mainproblom">
      <h3 class="ui header">뉴스피드</h3>
      <div class="ui card">
        <div class="ui grid">
          <div class="fifteen wide column" id="eleven">
            <div class="prolist">
              <div class="navlist">
                <p class="pheader">OOO님이 100번 문제를 풀었습니다!</p>
                <div class="meta">
                  <a>나도 풀어보기</a>
                </div>
              </div>
              <hr class="hr">
              <div class="navlist">
                <p class="pheader">OOO님이 100번 문제를 첫 번째로 풀었습니다!</p>
                <div class="meta">
                  <a>나도 풀러가기</a>
                </div>
              </div>
              <hr class="hr">
              <div class="navlist">
                <p class="pheader">OOO님이 100번 문제를 10번 풀었습니다!</p>
                <div class="meta">
                  <a>2014.10.04</a>
                </div>
              </div>
              <hr class="hr">
              <button class="fluid ui button">더 보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="footer">
    <div class="fomain">
      <div class="ui grid">
        <div class="three wide column" id="one">
          <h3 id="lefth">
                SIGO는?
              </h3>
          <p id="leftp">서울아이티고등학교 학생들이 만든 알고리즘 사이트 입니다.</p>
        </div>
        <div class="three wide column"></div>
        <div class="five wide column" id="two">
          <div class="footlist1">
            <div class="foheader">
              <h3>문제풀이</h3>
            </div>
            <div class="ui middle aligned animated list">
              <div class="item">
                <div class="content">
                  <div class="header"><a href="#">문제</a></div>
                </div>
              </div>
              <div class="item">
                <div class="content">
                  <div class="header"><a href="#">출처</a></div>
                </div>
              </div>
              <div class="item">
                <div class="content">
                  <div class="header"><a href="#">단계</a></div>
                </div>
              </div>
              <div class="item">
                <div class="content">
                  <div class="header"><a href="#">최근문제</a></div>
                </div>
              </div>
              <div class="item">
                <div class="content">
                  <div class="header"><a href="#">기타</a></div>
                </div>
              </div>
            </div>
          </div>
          <div class="footlist2">
            <div class="foheader">
              <h3>랭킹</h3>
            </div>
            <div class="ui middle aligned animated list">
              <div class="item">
                <div class="content">
                  <div class="header"><a href="#">랭킹</a></div>
                </div>
              </div>
              <div class="item">
                <div class="content">
                  <div class="header"><a href="#">페이지</a></div>
                </div>
              </div>
              <div class="item">
                <div class="content">
                  <div class="header"><a href="#">아이템</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="five wide column" id="three">
          <div class="footlist1">
            <div class="foheader">
              <h3>문의하기</h3>
              <p> 불편한점이나 개선되어야할 점, 버그 등은 문의해주세요.</p>
            </div>
            <div class="ui list">
              <a class="item" href="#" id="saws">문의 하기</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footsub">
      <div class="fosub">
        <div class="ddd">
          <a href="#"><i class="big facebook icon"></i></a>
          <a href="#"><i class="big github icon"></i></a>
          <a href="#"><i class="big twitter icon"></i></a>
          <a href="#"><i class="big youtube icon"></i></a>
          <a href="#"><i class="big google Plus icon"></i></a>
        </div>
        <div class="ccc">
          <p>2017 SiGO. All rights reserved.</p>
        </div>
        <!-- <div class="oll">
            <p>© 2017 All Rights Reserved. <br> 프로젝트 이름: shit<br> 이 사이트는 저작권은 shit 한테 있고, shit의 허락을 받거나 출처를 남기며 퍼가세요.<br> seoul it high school 2017.
          </p>
        </div> -->
      </div>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    name: 'sigo',
    data() {
      return {
        userCount: '',
      };
    },
    created() {
//      const ROOT_URL = 'http://121.186.23.245:9999';
//      this.$http.defaults.baseURL = ROOT_URL;
//      this.$http.get('./api/users')
//        .then((resUserInfo) => {
//          this.userCount = resUserInfo.data.users.length;
//        <!--});-->
//      console.log(this.userCount);
    },
  };
</script>
<style src="../../assets/css/timeline.css" scoped></style>


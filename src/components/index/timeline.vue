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
          <p>© 2016 IT Factory COIN. All rights reserved.</p>
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
<style scoped>
/*  #292929
rgb(48,200,164)
rgb(35,131,109)
#208A66 */


.timeline{
  background: rgb(244,244,244);
}

#content {
  padding-top: 50px;
}

#footer {
  margin-top: 10%;
}


/*콘덴트영역*/

#micon{
  margin: 0px 77px;
}
#eleven {
  width: 100% !important;
}
.iconpol{
  margin-left: -20px;
}
.iconpol a{
  color: rgb(48,200,164);
}
.iconpol a:hover{
  color: rgb(35,131,109);
}


.sub.header p{
  font-size: 18px;
  margin: 0;
}

.meta a{
  color: rgb(48,200,164) !important
}

.meta a:hover{
  color: rgb(35,131,109) !important
}

h3.ui.header {
  font-size: 30px;
  font-weight: 500;
  margin: 25px;
  /*color:rgb(50,156,130);*/
}

h1.ui.header{
  font-size: 33px;
  font-weight: 500;
  margin-top: 0;
}
hr.hr {
  border: 1px solid rgb(230, 230, 230);
  margin: 0px;
}

p.pheader {
  color: rgba(0, 0, 0, 0.6);
  font-size: 17px;
  margin: 0;
}

a.header:hover {
  font-size: 17px;
}

.five.wide.column {
  text-align: center;
}

.six.wide.column {
  text-align: center;
}

.navlist:hover {
  color: rgba(0, 0, 0, 0.4);
  font-size: 17px;
}

.content .header {
  margin-left: 35%;
}

.navlist {
  padding: 13px 0px 13px 30px;
}

.mainproblom {
  margin: 0px 77px;
  margin-top: 70px;
}

.ui.card {
  width: 100%;
}

.fluid.ui.button {
  border-radius: 0px 0px 4px 4px;
  background-color: white;
}

.navlist:hover {
  background-color: rgb(249, 249, 249);
}

.fluid.ui.button:hover {
  background-color: rgb(249, 249, 249);
}

.prolist {
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
}
.massive.write.icon{
  background: #1e7e7b;
    color: white;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    padding-top: 26px;
    font-size: 90px;
    margin-bottom: 30px;
}
.massive.thumbs.up.icon{
  background: #1e7e7b;
    color: white;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    padding-top: 26px;
    font-size: 90px;
    margin-bottom: 30px;
}
.massive.student.icon{
  background: #1e7e7b;
    color: white;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    padding-top: 26px;
    font-size: 90px;
    margin-bottom: 30px;
}




/*풋터 영역*/

.item .content a {
  color: rgb(175, 175, 175)
}

.item .content a:hover {
  color: rgb(221, 221, 221)
}

.fosub .ddd a {
  color: rgb(48,200,164)
}

.fosub .ddd a:hover {
  color: rgb(35,131,109)
}

div.one {
  margin: 0px 20px 0px 20px;
}

.ui.middle.aligned.animated.list {
  text-align: start;
}

.fomain {
  margin: 0px 77px;
  font-family: sans-serif;
  padding: 50px 0px;
}

.fosub {
  font-family: sans-serif;
  font-weight: 100;
  margin: 0px 77px;
  padding: 10px 0px;
  color: white;
}

.footsub {
  background: #1F1F1F;
  padding: 15px;
  padding-left: 0;
}

.footlist1 {
  padding-right: 120px;
}

.ddd {
  margin-left: 42%;
}

.ccc {
  margin-left: 40%;
  margin-top: 15px;
}

#saws {
  color: rgb(48,200,164)
}

#saws:hover {
  color: rgb(35,131,109)
}

#lefth {
  font-size: 30px;
}

#leftp {
  font-size: 20px;
  font-weight: 100;
}

#one {
  color: white;
}

#two {
  display: flex;
  color: white;
  text-align: start;
}

#three {
  text-align: start;
  color: white;
}

#footer {
  background: #252525;
}
</style>

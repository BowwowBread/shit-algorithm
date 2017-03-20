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
                <div class="four-set">
                  <div class="fo-shit">
                    <div class="foleft">
                      <p>아이디</p>
                      <p>학번</p>
                      <p>이름</p>
                    </div>
                    <div class="foright">
                      <p>코드</p>
                      <p>제출 결과</p>
                    </div>
                  </div>
                </div>
            </section>
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
};
</script>


<style src="../../assets/css/monitor.css" scoped></style>

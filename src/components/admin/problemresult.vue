<template>
    <div class="probleminput">
        <ul>
            <li v-for="data in problemData">
                <p>ID : {{data.userid}}</p><br>
                <p>Num : {{data.num}}</p><br>
                <p>language : {{data.lang}}</p><br>
                <p>Date : {{data.date}}</p><br>
                <p>Code : {{data.code}}</p><br>
                <p>Result : {{data.result}}</p><br>
                <p>Time : {{data.time}}</p><br>
                <p>Memory : {{data.memory}}</p><br>
                <br>
            </li>
            <br>
        </ul>
    </div>
</template>
<script>

	export default{
		data() {
			return {
				problemData: [],
                ratioData: [

                ],
			};
		},
		created() {
			this.ratio();
		},
		methods: {
			ratio() {
				this.$http.get('api/solution')
					.then((res) => {
						let i = res.data.resolves.length - 1;
                        while (i !== 0) {
	                        this.problemData.push({
								userid: res.data.resolves[i].userId,
								code: res.data.resolves[i].resolveData.code,
								date: res.data.resolves[i].resolveData.date,
								lang: res.data.resolves[i].resolveData.language,
								memory: res.data.resolves[i].resolveData.memory,
								num: res.data.resolves[i].resolveData.problemNum,
								result: res.data.resolves[i].resolveData.result,
								time: res.data.resolves[i].resolveData.time,
							});
	                        this.ratioData.push({
                                [i]: res.data.resolves[i].resolveData.problemNum,
                            });
							i -= 1;
						}
						console.log(res);
                        console.log(this.ratioData);
					});
			},
		},
	};
</script>
<style scoped>
    *{
        margin:0;
        padding:0;
    }

    ul{
        clear: both;
        margin-left:50px;
    }
</style>

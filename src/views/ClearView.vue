<template>
    <div class="clear-form">
        <h1>Congratulations!</h1>

        <!-- ここから追記 -->
        <div>
            <ul>
                <li v-for="(item, index) in ranking" :key="index"
                    :class="{ active: item.username == currentUsername }">
                    <span class="rank">{{ item.rank }}位:</span>
                    <span class="username">{{ item.username }}</span>
                    <span class="time">{{ formatTime(item.time) }}</span>
                </li>
            </ul>
        </div>
        <!-- ここまで追記（styleとscriptにも追記箇所があるので注意） -->

        <a :href="replayLink">Replay</a>
    </div>
</template>

<style>
.clear-form {
    width: 300px;
    padding: 20px;
    background-color: white;
    margin: 0 auto;
    text-align: center;
}

a {
    display: block;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    color: black;
    border: 1px solid black;
}

/* ここから追記 */

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 5px 0;
    text-align: left;
}

li.active {
    font-weight: bold;
    color: red
}

.rank {
    display: inline-block;
    width: 50px;
    margin-left: 50px;
}

.username {
    display: inline-block;
    width: 75px;
}

/* ここまで追記 */
</style>

<script>
export default {
    data() {
        let urlParams = new URLSearchParams(window.location.search);
        return {
            field: [],
            token: sessionStorage.getItem('token'),
            level: urlParams.get('level') || '1',
            ranking: [], // 追記
            currentUsername: sessionStorage.getItem('username'), // 追記
        };
    },
    mounted() {
        if (!this.token) {
            this.$router.push('/');
            return;
        }

        this.fetchRanking(); // 追記
    },
    computed: {
        replayLink() {
            return `/field?level=${this.level}`;
        }
    }, // カンマに注意
    // ここから追記
    methods: {
        async fetchRanking() {
            let response = await fetch(`http://localhost:8085/api/results?level=${this.level}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })

            let data = await response.json();

            // 時間が短い順に並べ替えて上位3件を取得
            let sortedResults = data
                .sort((a, b) => a.time - b.time)
                .slice(0, 3);

            // 順位付け
            sortedResults.forEach((result, index) => {
                if (index > 0 && sortedResults[index - 1].time == result.time) {
                    // 同率順位の場合は、前の順位を引き継ぐ
                    result.rank = sortedResults[index - 1].rank;
                } else {
                    result.rank = index + 1;
                }
            });
            this.ranking = sortedResults;
        },
        formatTime(seconds) {
            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }
    // ここまで追記
};
</script>

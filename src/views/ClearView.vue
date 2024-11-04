<template>
    <div class="clear-form">
        <h1>Congratulations!</h1>
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
</style>

<script>
export default {
    data() {
        let urlParams = new URLSearchParams(window.location.search);
        return {
            field: [],
            token: sessionStorage.getItem('token'),
            level: urlParams.get('level') || '1',
        };
    },
    mounted() {
        // 認証トークンがない場合はスタート画面に遷移
        if (!this.token) {
            this.$router.push('/');
            return;
        }
    },
    computed: {
        replayLink() {
            return `/field?level=${this.level}`;
        }
    }
};
</script>
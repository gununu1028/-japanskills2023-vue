<template>
    <div class="login-form">
        <form @submit.prevent="login">
            <div>
                <label for="username">Username</label><br>
                <input v-model="username" type="text" id="username" required>
            </div>
            <div>
                <label for="password">Password</label><br>
                <input v-model="password" type="password" id="password" required>
            </div>
            <button type="submit">Login</button>
        </form>

        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<style>
.login-form {
    width: 300px;
    padding: 20px;
    background-color: white;
    margin: 0 auto;
}

.login-form input,
.login-form button {
    width: 100%;
    margin-bottom: 10px;
}

.login-form button {
    background-color: white;
}
</style>

<script>
export default {
    data() {
        return {
            username: sessionStorage.getItem('username') || '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            sessionStorage.setItem('token', '');

            try {
                // 認証APIに接続
                let response = await fetch('http://localhost:8085/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });
                let data = await response.json();

                // 認証に失敗したらエラーを返す
                if (response.status !== 200) {
                    this.errorMessage = '認証に失敗しました。';
                    return;
                }

                // 他の画面でも利用するため、認証トークンなどをローカルストレージに保存
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', this.username);

                // 選択画面へ
                this.$router.push('/select');
            } catch (error) {
                // 何らかの問題が起きたときは、認証失敗とみなす
                this.errorMessage = '認証に失敗しました。';
            }
        }
    }
};
</script>

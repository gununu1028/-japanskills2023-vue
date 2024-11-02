<template>
    <div>
        <h1>ログイン</h1>
        <form @submit.prevent="login">
            <div>
                <label for="username">ユーザーネーム:</label>
                <input v-model="username" type="text" id="username" required>
            </div>
            <div>
                <label for="password">パスワード:</label>
                <input v-model="password" type="password" id="password" required>
            </div>
            <button type="submit">ログイン</button>
        </form>

        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: localStorage.getItem('username') || '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            localStorage.setItem('token', '');

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

                // フィールドなどで利用するため、認証トークンなどをローカルストレージに保存
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', this.username);

                // フィールドを開く
                this.$router.push('/field');
            } catch (error) {
                // 何らかの問題が起きたときは、認証失敗とみなす
                this.errorMessage = '認証に失敗しました。';
            }
        }
    }
};
</script>

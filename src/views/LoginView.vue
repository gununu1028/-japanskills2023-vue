<template>
    <div>
        <h2>ログイン</h2>
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
            try {
                const response = await fetch('http://localhost:8085/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });

                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', this.username);
                this.$emit('login-success');
            } catch (error) {
                this.errorMessage = '認証に失敗しました。';
            }
        }
    }
};
</script>

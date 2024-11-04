<template>
    <div class="select-form">
        <h1>Welcome, GORIN3!</h1>
        <p>Your total play time is 10min.</p>
        <div class="select-form-list">
            <a href="#">Profile Settings</a>
            <a href="#">Logout</a>
            <a href="/field?level=1">Easy</a>
            <a href="/field?level=2">Normal</a>
        </div>
    </div>
</template>

<style>
.select-form {
    width: 400px;
    padding: 20px;
    background-color: white;
    margin: 0 auto;
}

.select-form-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 10px;
}

.select-form-list a {
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
        return {
            token: sessionStorage.getItem('token')
        };
    },
    mounted() {
        if (!this.token) {
            this.$router.push('/');
        }
    }
};
</script>
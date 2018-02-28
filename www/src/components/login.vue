<template>
    <div class="login">
        <img src="../assets/logo2.jpg" height="200">
        <h1>Login to GranolaGram!</h1>
        <form @submit.prevent="login">
            <input type="text" v-model="user.email" placeholder="Email">
            <input type="password" v-model="user.password" placeholder="Password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>
<script>
    export default{
        name: 'login',
        data() {
            return{
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login(){
                this.$store.dispatch("login", this.user)
            }
        }
    }
</script>
<style>
</style>
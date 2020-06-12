
<template>
    <div>
        <Header/>
    <div class="card">
        <img src="https://static.runoob.com/images/mix/img_avatar.png" alt="John" style="width:100%">

        <h1>找回密码</h1>
        <div class="container">
        <form action="/action_page.php">
            <label for="cname">邮箱</label>
            <input type="text" id="cname" name="cname" placeholder="请输入注册邮箱..">

            <label for="cname">验证码</label>
            <input type="text" id="cname" name="cname" placeholder="请输入验证码..">

            <input type="submit" class="btn-red" value="点击获取">
        </form>
        </div>
    </div>
    </div>
</template>

<style scoped src= @/assets/css/retrieve.css>
</style>
<script>
    import Header from "../components/Header";
    export default {
        components: {Header}
    }
</script>

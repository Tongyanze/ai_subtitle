<template>
    <div class="header">
        <div class="container">
            <div class="header-logo">
                <router-link to="/">AI字幕君</router-link>
            </div>
            <div class="header-list">
                <ul>
                    <li>
                        <router-link to="/login">登录</router-link>
                    </li>
                    <li>
                        <router-link to="/register">注册</router-link>
                    </li>
                    <li>
                        <a href="javascript:void(0)">关于我们</a>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Header",
        props:{
            a: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style scoped>
    .header{
        position: fixed;
        z-index: 1000;
        height: 60px;
        right: 0;
        left: 0;
        top: 0;
        background: rgb(107, 154, 255);
        box-shadow: 0 1px 10px -6px rgba(0,0,0,0.42), 0 1px 10px 0 rgba(0,0,0,0.12), 0 4px 5px -2px rgba(0,0,0,0.1);
    }

    .header .container{
        padding: 10px 0;
        display: flex;
        margin: 0 5%;
        height: 40px;
    }

    .header-logo{
        color: white;
        font-size: 20px;
        line-height: 40px;
        margin-right: auto;
    }

    .header-logo a{
        text-decoration: none;
        color: white;
    }


    .header-list {

    }

    .header-list ul{
        display: flex;
        padding: 0;
        margin: 0;
        height: 40px;
        list-style: none;
    }

    .header-list li{
        line-height: 20px;
        padding: 10px 25px;
        font-size: 12px;
        color: white;
    }

    .header-list a, .header-list router-link{
        text-decoration: none;
        color: white;
        transition: color 1s;
    }

    .header-list a:hover, .header-list router-link:hover{

        color: rgb(51, 209, 255);
    }

</style>

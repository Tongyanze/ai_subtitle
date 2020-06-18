<template>
    <div class="footer">
        这里是页面底端，预留位
        <div class="copy-right">
            Copyright @SDU_AI字幕君开发组 2020
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="scss" scoped>
    .footer{
        padding: 12px 0;
        position: absolute;
        bottom: 0;
        height: $footer-height;
        background-color: $dark-blue;
        width: 100%;
        box-sizing:border-box;
        color: rgb(217, 217, 217);
    }

    .copy-right{
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 12px;

    }

</style>

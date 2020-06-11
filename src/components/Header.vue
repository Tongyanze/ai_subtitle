<template>
    <div class="header">
        <div class="header-logo">

        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
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

    .header-logo{
        
    }
</style>

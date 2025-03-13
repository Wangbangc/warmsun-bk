<script setup>
import { onMounted, ref } from 'vue'
const ready = ref(false)

onMounted(() => {
    setTimeout(() => {
        ready.value = true
    }, 15000);
})
</script>

<template>
    <div v-show="ready" style="border: 1px solid var(--vp-c-divider);
            width: 180px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;">
        <!-- <span>赞赏-微信扫码</span>
        <img src="//cdn-feling-net.oss-cn-beijing.aliyuncs.com/images/wechat_zan.jpg" /> -->
    </div>
</template>

<style module></style>
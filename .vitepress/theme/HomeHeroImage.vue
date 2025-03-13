<script setup>
</script>

<template>
    <div style="width: 320px;margin-top: 50px;margin-left: 80px;">
        <n-flex>
            <n-skeleton text :width="10" />
        </n-flex>
        <n-flex :wrap="false" style="margin-top: 5px;">
            <n-skeleton style="margin-left: 40px;" :width="60" text /> <n-skeleton text :width="74"/>
        </n-flex>
        <n-flex :wrap="false" style="margin-top: 5px;">
            <n-skeleton style="margin-left: 40px;" :width="40" text /> <n-skeleton text :width="70"/>
        </n-flex>
        <n-flex :wrap="false" style="margin-top: 5px;">
            <n-skeleton style="margin-left: 40px;" :width="60" text /> <n-skeleton text :width="80"/>
        </n-flex>
        <n-flex :wrap="false" style="margin-top: 5px;">
            <n-skeleton style="margin-left: 40px;" :width="50" text /> <n-skeleton text :width="10"/>
        </n-flex>
        <n-flex style="margin-top: 5px;">
            <n-skeleton style="margin-left: 80px;" :width="80" text />
        </n-flex>
        <n-flex style="margin-top: 5px;">
            <n-skeleton style="margin-left: 80px;" :width="60" text />
        </n-flex>
        <n-flex style="margin-top: 5px;">
            <n-skeleton style="margin-left: 80px;" :width="70" text />
        </n-flex>
        <n-flex style="margin-top: 5px;">
            <n-skeleton style="margin-left: 40px;" :width="10" text />
        </n-flex>
        <n-flex style="margin-top: 5px;">
            <n-skeleton text :width="10" />
        </n-flex>
    </div>
</template>

<style module></style>
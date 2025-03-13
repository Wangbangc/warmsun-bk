<script setup>
defineProps({
    json_key: {
        type: String,
        default: ''
    },
    depth: {
        type: Number,
        default: 0
    },
})
</script>

<template>
    <br/>
    <span :class="$style.json_key"><span v-if="depth">{{ "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(depth) }}</span>"{{ json_key }}": </span>
</template>

<style module>
.json_key {
    color: var(--vp-c-indigo-1);
    font-weight: bold;
}
</style>
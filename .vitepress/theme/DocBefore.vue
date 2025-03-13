<script setup>
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const { page } = useData()
const { hasSidebar } = useSidebar()

</script>

<template>
    <div class="vp-doc">
        <h1>{{ page.title }}</h1>
        <div :class="$style.created">
            <span v-if="page.frontmatter.created" style="margin-right: 30px;">
                创建于: {{ page.frontmatter.created.substring(0, 10) }}
            </span>
        </div>
    </div>
</template>

<style module>
.created {
    margin-top: 10px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
}
</style>
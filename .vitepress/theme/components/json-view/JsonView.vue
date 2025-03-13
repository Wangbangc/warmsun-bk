<script setup>
const props = defineProps({
    obj: {
        type: [String, Number, Object, Array, Boolean],
        default: ''
    },
    tool_bar: {
        type: Boolean,
        default: false
    },
    storage_key: {
        type: String,
        default: ''
    },
    default_collapse_level: {
        type: String,
        default: '999'
    }
})

import { onMounted, ref, watch } from 'vue'
import axios from 'axios';

import Value from './Value.vue'
import { useMessage } from 'naive-ui'
const notify = useMessage()

import Clipboard from 'clipboard';
new Clipboard('#copy_json_content').on("success", (e) => {
    notify.success('复制成功_C')
    e.clearSelection()
})
new Clipboard('#copy_json_obj', {
    text: function (trigger) {
        return JSON.stringify(props.obj, null, 4)
    }
}).on("success", (e) => { notify.success('复制成功_F') })
new Clipboard('#copy_json_obj_compress', {
    text: function (trigger) {
        return JSON.stringify(props.obj)
    }
}).on("success", (e) => { notify.success('复制成功_F_S') })

const skeleton_mode = ref(false)
const escape_render = ref(false)
const collapse_level = ref(props.default_collapse_level)


onMounted(() => {
    if (props.storage_key && localStorage.getItem(`${props.storage_key}_skeleton_mode`)) {
        skeleton_mode.value = JSON.parse(localStorage.getItem(`${props.storage_key}_skeleton_mode`))
    }
    if (props.storage_key && localStorage.getItem(`${props.storage_key}_escape_render`)) {
        escape_render.value = JSON.parse(localStorage.getItem(`${props.storage_key}_escape_render`))
    }
    if (props.storage_key && localStorage.getItem(`${props.storage_key}_collapse_level`)) {
        collapse_level.value = localStorage.getItem(`${props.storage_key}_collapse_level`)
    }
})
watch(skeleton_mode, (new_val) => {
    if (props.storage_key) {
        localStorage.setItem(`${props.storage_key}_skeleton_mode`, new_val)
    }
})
watch(escape_render, (new_val) => {
    if (props.storage_key) {
        localStorage.setItem(`${props.storage_key}_escape_render`, new_val)
    }
})
watch(collapse_level, (new_val) => {
    if (props.storage_key) {
        localStorage.setItem(`${props.storage_key}_collapse_level`, new_val)
    }
})
</script>

<template>
    <div :class="$style.main_box">
        <n-flex :class="$style.tool_bar" v-if="tool_bar" justify="space-between" align="center">
            <n-flex align="center">
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-flex align="center">
                            <n-switch v-model:value="skeleton_mode">
                                <template #checked>骨架模式</template>
                                <template #unchecked>骨架模式</template>
                            </n-switch>
                        </n-flex>
                    </template>
                    对于数组, 只解析它的第一项
                </n-tooltip>
                <n-divider vertical />
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-flex align="center">
                            <n-switch v-model:value="escape_render">
                                <template #checked>转义渲染</template>
                                <template #unchecked>转义渲染</template>
                            </n-switch>
                        </n-flex>
                    </template>
                    举个例子: 开启这个开关后, StringValue 中如果包含 \n, 会真的渲染成换行
                </n-tooltip>
                <n-divider vertical />
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-radio-group v-model:value="collapse_level" size="small">
                            <n-radio-button value="1" label="1级"></n-radio-button>
                            <n-radio-button value="2" label="2"></n-radio-button>
                            <n-radio-button value="3" label="3"></n-radio-button>
                            <n-radio-button value="4" label="4"></n-radio-button>
                            <n-radio-button value="5" label="5"></n-radio-button>
                            <n-radio-button value="999" label="n级"></n-radio-button>
                        </n-radio-group>
                    </template>
                    一键快速 折叠/展开
                </n-tooltip>
            </n-flex>
            <!-- apihub 扫码登录做完后, create方法 对接 apihub, get 方法迁移过去. 目前是在 json 页面实现了旧版本 get方法, 注释掉 create 入口 -->
            <!-- <n-button size="small">转发当前JSON</n-button> -->
            <div>
                <n-radio-group size="small">
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-button id="copy_json_content" data-clipboard-target="#json_content"
                                size="small">复制_C</n-button>
                        </template>
                        复制_Current, 结果框的内容, 所见即所得. 包含 骨架模式 转义渲染 折叠 等效果, 但不会包含 `>...12` 这些数量提示.
                    </n-tooltip>
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-button id="copy_json_obj" size="small">复制_F</n-button>
                        </template>
                        复制_Full, 按解析出的 JavaScript 对象复制, 完整的内容. 带换行, 带缩进.
                    </n-tooltip>
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-button id="copy_json_obj_compress" size="small">复制_F_S</n-button>
                        </template>
                        复制_Full_Short, 按解析出的 JavaScript 对象复制, 完整的内容. 但是去除了多余的换行与空格.
                    </n-tooltip>
                </n-radio-group>

            </div>
        </n-flex>
        <pre :class="$style.json_content" id="json_content"><Value :json_value="obj" :new_line="false" 
            :skeleton_mode="skeleton_mode" :escape_render="escape_render" :collapse_level="collapse_level" /></pre>
    </div>
</template>

<style module>
.main_box {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.tool_bar {
    min-height: 42px;
    font-size: 14px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgb(239, 239, 245);
}

.json_content {
    margin: 0;
    padding: 10px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    font-size: var(--vp-code-font-size);
    font-family: var(--vp-font-family-mono);
    overflow: auto;
    text-wrap: auto;
}
</style>
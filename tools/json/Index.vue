<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import JsonView from '../../.vitepress/theme/components/json-view/JsonView.vue'

const ready = ref(false)

const src_group = ref([
    '{"Hello":"搜索引擎排名不太稳定，加入书签 方便下次打开。","特性列表":["多种复制模式","一键折叠","对数组只解析第一项 —— 骨架模式","转义渲染\\n","兼容 最后一项后面多出一个逗号:,",],"obj":{"num":-24,"null":null,"boolean":true},"objList":[{"num":24,"boolean":false,"objList":[{"key":"value"},{}]}]}',
    '{"多加几个输入位置":"可以当作历史记录使用"}', "{}", "{}", "{}", "{}"
])
const src_group_index = ref(0)
const src_group_tab_name_prefix = '输入'

const result = ref('')

function onChangeSrc(index) {    
    if (index != undefined) {
        if (typeof(index) == 'string') {
            index = index.replace(src_group_tab_name_prefix, '')
        }
        src_group_index.value = index
    }
    if (src_group_index.value >= src_group.value.length) {
        src_group_index.value = 0
    }
    localStorage.tool_json_src_group_index = src_group_index.value
    if (src_group.value[src_group_index.value] === '') {
        return
    }
    try {
        result.value = JSON.parse(src_group.value[src_group_index.value].replace(/,(\s*[}\]])/g, " $1"))
        localStorage.tool_json_src_group = JSON.stringify(src_group.value)
    } catch (e) {
        result.value = e.message
    }
}

function getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key)
}

function loadJsonSrcByShareId(shareId) {
    axios.postForm('https://api.feling.net/unclassified/jsonShare/get', {
        'shareId': shareId
    }).then(response => {
        src_group.value[src_group_index.value] = response.data.data.jsonSrc
    }).catch(error => {
        src_group.value[src_group_index.value] = `{"提示":"shareId: ${shareId} 对应的 JSON 加载失败"}`
    }).finally(() => {
        onChangeSrc()
    })
}

onMounted(() => {
    if (localStorage.tool_json_src_group) {
        src_group.value = JSON.parse(localStorage.tool_json_src_group)
    }
    if (localStorage.tool_json_src_group_index) {
        src_group_index.value = localStorage.tool_json_src_group_index
    }
    let shareId = getQueryParam('shareId')
    if (shareId) {
        src_group.value[src_group_index.value] = `{"提示":"shareId: ${shareId} 对应的 JSON 加载中..."}`
        loadJsonSrcByShareId(shareId)
    } else {
        onChangeSrc()
    }
    ready.value = true
})

</script>

<template>
    <div v-if="ready" class="page-content">
        <n-grid x-gap="12" cols="10" class="ah-height-1-1">
            <n-grid-item span="4">
                <n-tabs class="ah-height-1-1" type="line" :default-value="src_group_tab_name_prefix + src_group_index" @update:value="onChangeSrc">
                <n-tab-pane style="flex:1" :name="src_group_tab_name_prefix + index" v-for="(_, index) in src_group">
                    <textarea class="ah-height-1-1" spellcheck="false" v-model="src_group[index]" v-on:input="onChangeSrc(index)"></textarea>
                </n-tab-pane>
            </n-tabs>
            </n-grid-item>
            <n-grid-item span="6" style="overflow: auto;">
                <JsonView :obj="result" :tool_bar="true" storage_key="tool_json" />
            </n-grid-item>
        </n-grid>
    </div>
    <div v-else class="page-content">
        <n-spin size="large" />
    </div>
</template>

<style module></style>
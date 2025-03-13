<script setup>
import { onMounted, ref } from 'vue'
import { Base64 } from 'js-base64'

const ready = ref(false)
const defaultTab = ref(undefined)

const txt_origin = ref('Base64 编码解码')
const txt_base64 = ref('')

const img_textarea = ref('')
const img_type = ref('')
const img_size = ref('')
const img_src = ref('')

function onChangeDefaultTab(tabName) {
    localStorage.tool_base64_defaultTab = tabName
}

function onChangeTxtOrigin() {
    localStorage.tool_base64_txt_origin = txt_origin.value
    txt_base64.value = Base64.encode(txt_origin.value)
}

function onChangeTxtBase64() {
    txt_origin.value = Base64.decode(txt_base64.value)
    localStorage.tool_base64_txt_origin = txt_origin.value
}

function onChangeImgTextarea() {
    img_type.value = ''
    img_size.value = ''
    _onChangeImgTextarea()
}
function _onChangeImgTextarea() {
    if (img_textarea.value.startsWith("http") || img_textarea.value.startsWith("data:image")) {
        img_src.value = img_textarea.value
    } else {
        img_src.value = 'data:image;base64,' + img_textarea.value
    }
    if (img_textarea.value.length < (1024 * 512)) {
        localStorage.tool_base64_img_textarea = img_textarea.value
    }
}

function onChangeImgFile(fileList) {
    if (fileList.length > 0) {
        processImgFile(fileList[0].file)
    } else {
        img_type.value = ''
        img_size.value = ''
        img_textarea.value = ''
        _onChangeImgTextarea()
    }
}

function processImgFile(file) {
    img_type.value = file.type
    if (file.size < 1024) {
        img_size.value = file.size + ' B'
    } else {
        img_size.value = parseInt(file.size / 1024) + ' KB'
    }
    var reader = new FileReader()
    reader.onload = function (o) {
        img_textarea.value = o.target.result
        _onChangeImgTextarea()
    }
    reader.readAsDataURL(file);
}

onMounted(() => {
    defaultTab.value = localStorage.tool_base64_defaultTab
    if (localStorage.tool_base64_txt_origin) {
        txt_origin.value = localStorage.tool_base64_txt_origin
    }
    if (localStorage.tool_base64_img_textarea) {
        img_textarea.value = localStorage.tool_base64_img_textarea
    }
    onChangeTxtOrigin()
    onChangeImgTextarea()
    ready.value = true
})

</script>

<template>
    <div v-if="ready" class="page-content">
        <n-tabs type="line" pane-wrapper-style="flex:1" pane-class="ah-height-1-1" :default-value=defaultTab
            :on-update:value=onChangeDefaultTab>
            <n-tab-pane name="文字 ⇄ Base64">
                <n-grid x-gap="12" cols="10" class="ah-height-1-1">
                    <n-grid-item span="5">
                        <textarea class="ah-height-1-1" placeholder="编码前" spellcheck="false" v-model="txt_origin"
                            v-on:input="onChangeTxtOrigin"></textarea>
                    </n-grid-item>
                    <n-grid-item span="5">
                        <textarea class="ah-height-1-1" placeholder="编码后" autofocus spellcheck="false"
                            v-model="txt_base64" v-on:input="onChangeTxtBase64"></textarea>
                    </n-grid-item>
                </n-grid>
            </n-tab-pane>
            <n-tab-pane name="Base64 ⇄ 图片">
                <n-grid x-gap="12" cols="10" class="ah-height-1-1">
                    <n-grid-item span="4">
                        <textarea class="ah-height-1-1"
                            placeholder="请输入 base64 字符串，可以不带‘data:image/xxx;base64,’前缀。或者图片url地址。" autofocus
                            spellcheck="false" v-model="img_textarea" v-on:input="onChangeImgTextarea"></textarea>
                    </n-grid-item>
                    <n-grid-item span="6">
                        <div class="ah-height-1-1">
                            <n-upload :max="1" :on-update:file-list="onChangeImgFile">
                                <n-upload-dragger>
                                    <n-text>
                                        点击或拖动文件到该区域来上传
                                    </n-text>
                                </n-upload-dragger>
                            </n-upload>
                            <div>
                                <span v-if="img_type">类型: {{ img_type }}</span>
                                <span v-if="img_size" style="margin-left: 50px;">大小: {{ img_size }}</span>
                            </div>
                            <div>
                                <img v-if="img_textarea" alt="结果图片" v-bind:src="img_src" style="max-height: calc(100vh - var(--vp-nav-height) - 256px)"></img>
                            </div>
                        </div>

                    </n-grid-item>
                </n-grid>
            </n-tab-pane>
            <template #suffix>
                <a href="/pages/base64.html">理解 Base64 编码</a>
            </template>
        </n-tabs>
    </div>
    <div v-else class="page-content">
        <n-spin size="large" />
    </div>
</template>

<style module></style>
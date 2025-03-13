<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { useMessage } from 'naive-ui'
const notify = useMessage()
const ready = ref(false)
const msgBox = ref(null);
const msg2Show = ref([{
    type: "sys", // "sys"、"biz-recv"、"biz-send"
    timestamp: '',
    content: 'localStorage 保存最新 16 条消息'
}])
const url = ref('wss://who.apihub.net/echo')
const status = ref('closed') // closing, connecting, connected, 
const msg2Send = ref('')
const wsConnection = ref({})
const myMsg1 = ref('')
const myMsg2 = ref('')
const myMsg3 = ref('')
const myMsg4 = ref('')
const myMsg5 = ref('')

function doConnect() {
    if (!url.value.startsWith('ws://') && !url.value.startsWith('wss://')) {
        notify.warning('无效的服务器地址')
        return
    }
    status.value = 'connecting'
    wsConnection.value = new WebSocket(url.value)
    wsConnection.value.onopen = () => {
        status.value = 'connected'
        msg2Show.value.push({
            type: "sys",
            timestamp: formatTime(),
            content: `连接成功 (${url.value})`
        })
        nextTick(() => {
            msgBox.value.scrollTop = msgBox.value.scrollHeight
        })
    }
    wsConnection.value.onmessage = (event) => {
        msg2Show.value.push({
            type: "biz-recv",
            timestamp: formatTime(),
            content: event.data
        })
        nextTick(() => {
            msgBox.value.scrollTop = msgBox.value.scrollHeight
        })
    }
    wsConnection.value.onclose = () => {
        status.value = 'closed'
        msg2Show.value.push({
            type: "sys",
            timestamp: formatTime(),
            content: `连接已断开 (${url.value})`
        })
        nextTick(() => {
            msgBox.value.scrollTop = msgBox.value.scrollHeight
        })
    }
}
function doDisconnect() {
    status.value = 'closing'
    wsConnection.value.close()
}
function doSend() {
    wsConnection.value.send(msg2Send.value)
    msg2Show.value.push({
        type: "biz-send",
        timestamp: formatTime(),
        content: msg2Send.value
    })
}
function doSend1() {
    wsConnection.value.send(myMsg1.value)
    msg2Show.value.push({
        type: "biz-send",
        timestamp: formatTime(),
        content: myMsg1.value
    })
}
function doSend2() {
    wsConnection.value.send(myMsg2.value)
    msg2Show.value.push({
        type: "biz-send",
        timestamp: formatTime(),
        content: myMsg2.value
    })
}
function doSend3() {
    wsConnection.value.send(myMsg3.value)
    msg2Show.value.push({
        type: "biz-send",
        timestamp: formatTime(),
        content: myMsg3.value
    })
}
function doSend4() {
    wsConnection.value.send(myMsg4.value)
    msg2Show.value.push({
        type: "biz-send",
        timestamp: formatTime(),
        content: myMsg4.value
    })
}
function doSend5() {
    wsConnection.value.send(myMsg5.value)
    msg2Show.value.push({
        type: "biz-send",
        timestamp: formatTime(),
        content: myMsg5.value
    })
}

function formatTime(time) {
    if (!time) {
        time = new Date()
    }

    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
    if (localStorage.tool_wsp_msg2Show) {
        msg2Show.value = JSON.parse(localStorage.tool_wsp_msg2Show)
    }
    if (localStorage.tool_wsp_url) {
        url.value = localStorage.tool_wsp_url
    }
    if (localStorage.tool_wsp_msg2Send) {
        msg2Send.value = localStorage.tool_wsp_msg2Send
    }
    if (localStorage.tool_wsp_myMsg1) {
        myMsg1.value = localStorage.tool_wsp_myMsg1
    }
    if (localStorage.tool_wsp_myMsg2) {
        myMsg2.value = localStorage.tool_wsp_myMsg2
    }
    if (localStorage.tool_wsp_myMsg3) {
        myMsg3.value = localStorage.tool_wsp_myMsg3
    }
    if (localStorage.tool_wsp_myMsg4) {
        myMsg4.value = localStorage.tool_wsp_myMsg4
    }
    if (localStorage.tool_wsp_myMsg5) {
        myMsg5.value = localStorage.tool_wsp_myMsg5
    }
    ready.value = true
})

watch(msg2Show, (new_val) => {
    if (!new_val) {
        return
    }
    if (new_val.length > 16) {
        new_val = new_val.slice(-16)
    }
    localStorage.tool_wsp_msg2Show = JSON.stringify(new_val)
}, { deep: true })
watch(url, (new_val) => {
    localStorage.tool_wsp_url = new_val
})
watch(msg2Send, (new_val) => {
    localStorage.tool_wsp_msg2Send = new_val
})
watch(myMsg1, (new_val) => {
    localStorage.tool_wsp_myMsg1 = new_val
})
watch(myMsg2, (new_val) => {
    localStorage.tool_wsp_myMsg2 = new_val
})
watch(myMsg3, (new_val) => {
    localStorage.tool_wsp_myMsg3 = new_val
})
watch(myMsg4, (new_val) => {
    localStorage.tool_wsp_myMsg4 = new_val
})
watch(myMsg5, (new_val) => {
    localStorage.tool_wsp_myMsg5 = new_val
})

</script>

<template>

    <div v-if="ready" class="page-content">
        <div ref="msgBox" :class="$style.msgBox">
            <div v-for="msg in msg2Show" style="display: flow-root;">
                <div :style="{
                    'text-align': { 'sys': 'center', 'biz-send': 'right' }[msg.type],
                    'float': { 'biz-send': 'right' }[msg.type],
                    'width': { 'sys': '100%', 'biz-send': 'fit-content', 'biz-recv': 'fit-content' }[msg.type],
                    'color': { 'sys': 'var(--vp-badge-info-text)', 'biz-send': 'var(--vp-badge-tip-text)', 'biz-recv': 'var(--vp-badge-warning-text)' }[msg.type],
                    'background-color': { 'sys': 'var(--vp-badge-info-bg)', 'biz-send': 'var(--vp-badge-tip-bg)', 'biz-recv': 'var(--vp-badge-warning-bg)' }[msg.type],
                    'border-radius': '6px',
                    'margin-bottom': '5px',
                    'padding': '5px',
                    'word-break': 'break-all',
                }">
                <span style="font-size:14px;color:var(--vp-badge-info-text)">
                    {{ msg.timestamp }}
                    <span v-if="msg.type == 'biz-send'">发送</span>
                    <span v-if="msg.type == 'biz-recv'">收到</span>
                    <br v-if="msg.type != 'sys'" />
                </span>
                    {{ msg.content }}
                </div>
            </div>
        </div>
        <div :class="$style.operationBox">
            <n-flex style="margin-bottom: 10px;">
                <n-input v-model:value="url" type="text" placeholder="WebSocket 服务器地址" />
                <n-button type="primary" :disabled="status != 'closed'" :loading="status == 'connecting'" @click="doConnect()">
                    <span v-show="status == 'connected'">已</span>连接
                </n-button>
                <n-button type="primary" :disabled="status != 'connected'" :loading="status == 'closing'"@click="doDisconnect()">
                    <span v-show="status == 'closed'">已</span>断开</n-button>
            </n-flex>
            <n-alert v-show="url.startsWith('ws://')" type="warning" :show-icon="false" style="margin-bottom: 10px;">
                <span>连接 ws:// 开头的服务器，需要允许浏览器加载不安全的脚本。</span>
            </n-alert>
            <n-flex style="margin-bottom: 10px;">
                <textarea type="text" v-model="msg2Send" style="min-height: 156px;" placeholder="要发送的消息内容"></textarea>
                <n-button type="primary" :disabled="status != 'connected'" @click="doSend()">发送</n-button>
            </n-flex>
            <n-tabs type="line" style="margin-bottom: 10px;">
                <n-tab-pane name="快捷消息1">
                    <textarea type="text" v-model="myMsg1" style="min-height: 156px;"
                        placeholder="快捷消息1, 要发送的消息内容"></textarea>
                    <n-button type="primary" :disabled="status != 'connected'" @click="doSend1()">发送消息1</n-button>
                </n-tab-pane>
                <n-tab-pane name="快捷消息2">
                    <textarea type="text" v-model="myMsg2" style="min-height: 156px;"
                        placeholder="快捷消息2, 要发送的消息内容"></textarea>
                    <n-button type="primary" :disabled="status != 'connected'" @click="doSend2()">发送消息2</n-button>
                </n-tab-pane>
                <n-tab-pane name="快捷消息3">
                    <textarea type="text" v-model="myMsg3" style="min-height: 156px;"
                        placeholder="快捷消息3, 要发送的消息内容"></textarea>
                    <n-button type="primary" :disabled="status != 'connected'" @click="doSend3()">发送消息3</n-button>
                </n-tab-pane>
                <n-tab-pane name="快捷消息4">
                    <textarea type="text" v-model="myMsg4" style="min-height: 156px;"
                        placeholder="快捷消息4, 要发送的消息内容"></textarea>
                    <n-button type="primary" :disabled="status != 'connected'" @click="doSend4()">发送消息4</n-button>
                </n-tab-pane>
                <n-tab-pane name="快捷消息5">
                    <textarea type="text" v-model="myMsg5" style="min-height: 156px;"
                        placeholder="快捷消息5, 要发送的消息内容"></textarea>
                    <n-button type="primary" :disabled="status != 'connected'" @click="doSend5()">发送消息5</n-button>
                </n-tab-pane>
            </n-tabs>
        </div>
    </div>
    <div v-else class="page-content">
        <n-spin size="large" />
    </div>
</template>

<style module>
.msgBox {
    overflow: auto;
    width: 50%;
    height: 100%;
    padding: 0 5px 0 0;
    border-radius: 6px
}

.operationBox {
    overflow: auto;
    width: 50%;
    height: 100%;
    padding: 0 0 0 5px;
    border-radius: 6px
}
</style>
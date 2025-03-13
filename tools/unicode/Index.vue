<script setup>
import { onMounted, ref } from 'vue'

const ready = ref(false)
const defaultTab = ref(undefined)

const txt_unicode = ref('')
const txt_chinese = ref('中文')

function onChangeDefaultTab(tabName) {
    localStorage.tool_unicode_defaultTab = tabName
}

function unicode2Chinese(str) {
    let re = str.match(/\\u[0-9a-fA-F]{4}/g);
    if (re == null) {
        return str
    }
    for (let i = 0; i < re.length; i++) {
        str = str.replace(re[i], unescape(re[i].replace("\\u", "%u")))
    }
    return str
}
function chinese2Unicode(str) {
    let ascii = ""
    for (let i = 0; i < str.length; i++) {
        var code = Number(str[i].charCodeAt(0));
        if (code > 127) {
            var charAscii = code.toString(16);
            charAscii = new String("0000").substring(charAscii.length, 4) + charAscii
            ascii += "\\u" + charAscii
        } else {
            ascii += str[i]
        }
    }
    return ascii
}

function onChangeTxtUnicode() {
    txt_chinese.value = unicode2Chinese(txt_unicode.value)
    localStorage.tool_unicode_txt_chinese = txt_chinese.value
}

function onChangeTxtChinese() {
    localStorage.tool_unicode_txt_chinese = txt_chinese.value
    txt_unicode.value = chinese2Unicode(txt_chinese.value)
}

onMounted(() => {
    defaultTab.value = localStorage.tool_unicode_defaultTab
    if (localStorage.tool_unicode_txt_chinese) {
        txt_chinese.value = localStorage.tool_unicode_txt_chinese
    }
    onChangeTxtChinese()
    ready.value = true
})

</script>

<template>
    <div v-if="ready" class="page-content">
        <n-tabs type="line" pane-wrapper-style="flex:1" pane-class="ah-height-1-1" :default-value=defaultTab
            :on-update:value=onChangeDefaultTab>
            <n-tab-pane name="解码">
                <n-grid x-gap="12" :cols="2" class="ah-height-1-1">
                    <n-grid-item>
                        <textarea class="ah-height-1-1" placeholder="请输入 unicode 编码" spellcheck="false"
                            v-model="txt_unicode" v-on:input="onChangeTxtUnicode"></textarea>
                    </n-grid-item>
                    <n-grid-item>
                        <textarea class="ah-height-1-1" placeholder="请输入 中文 字符串" autofocus spellcheck="false"
                            v-model="txt_chinese" v-on:input="onChangeTxtChinese"></textarea>
                    </n-grid-item>
                </n-grid>
            </n-tab-pane>
            <n-tab-pane name="介绍">
                <div>
                    <n-h2>什么是 \uxxxx ？</n-h2>
                    <n-text>
                        \uxxxx 转中文，实际上 unicode 编码转中文。我们经常使用的字符编码主要有两种。一种是 utf8，另一种就是 unicode。<br>
                        utf8 编码一般被用在我们直接编辑的文本，也就是在文本编辑器中所见所得的字符的编码。特点是占用存储空间相对小。<br>
                        unicode 编码常作为程序运行过程中，内存中表示字符所使用的编码，特点是每个字符所占用的长度相同。<br>
                        以上两种编码的使用场景应该作为一种默认的规范。可以完美的避免各种乱码问题。<br>
                    </n-text>
                    <n-h2>为什么会有 \uxxxx 转中文的需求 ？</n-h2>
                    <n-text>
                        因为内存中的字符串，直接对应于我们代码中的一个字符串变量。如果程序规范，它会以 unicode 编码的形式存储在内存中。<br>
                        然后我们直接打印这个字符串变量，经常就出现了 \uxxxx 的所谓乱码。实际是打印的操作不够规范。<br>
                        可以这样说服自己，我们统一把给人看的字符串用 utf8 表示，给机器看的字符串用 unicode 表示。<br>
                        打印的目的是要给人看，所以多加一句代码把字符串变量由 unicode 转成 utf8 再输出也是合理的。<br>
                    </n-text>
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
    <div v-else class="page-content">
        <n-spin size="large" />
    </div>
</template>

<style module>

</style>
<script setup>
import { onMounted, ref } from 'vue'
import { Base64 } from 'js-base64'
import JsonView from '../../.vitepress/theme/components/json-view/JsonView.vue'

const ready = ref(false)

const jwt_src = ref('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeXNhZG1pbkB0aGluZ3Nib2FyZC5vcmciLCJ1c2VySWQiOiIzMjAzOGFmMC1hZDA4LTExZWQtOTMyMy03M2IxM2Y4ZDk5M2EiLCJzY29wZXMiOlsiU1lTX0FETUlOIl0sInNlc3Npb25JZCI6IjA3ZTU2ZGRlLTc4ZTEtNGRjZi04ZDlkLWNkYmYwYjg5NDFkYyIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjgyMzg3NDc1LCJleHAiOjE2ODI5OTIxNzUsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiIxMzgxNDAwMC0xZGQyLTExYjItODA4MC04MDgwODA4MDgwODAiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0._-o7jEd8k5UtE5C_YdApKk9Zn_m8riKvj4aH6YOCcvMrLIU2xrRBWCxzS_8XL4gTWM0cmm6TwmKjpVRVfMcoPw')
const jwt_result_header = ref('')
const jwt_result_body = ref('')

function onChangeJwtSrc() {
    if (jwt_src.value === '') {
        return
    }
    try {
        let jwtSrc = jwt_src.value.replace("Bearer ", "").split(".")

        jwt_result_header.value = JSON.parse(Base64.decode(jwtSrc[0]))
        jwt_result_body.value = JSON.parse(Base64.decode(jwtSrc[1]))

        localStorage.tool_jwt_src = jwt_src.value
    } catch (e) {
        jwt_result_header.value = ''
        jwt_result_body.value = e.message
    }
}

onMounted(() => {
    if (localStorage.tool_jwt_src) {
        jwt_src.value = localStorage.tool_jwt_src
    }
    onChangeJwtSrc()
    ready.value = true
})

</script>

<template>
    <div v-if="ready" class="page-content">
        <n-grid x-gap="12" cols="10" class="ah-height-1-1">
            <n-grid-item span="4">
                <textarea class="ah-height-1-1" spellcheck="false" v-model="jwt_src" v-on:input="onChangeJwtSrc"></textarea>
            </n-grid-item>
            <n-grid-item span="6" style="overflow: auto; display: flex; flex-direction: column;">
                <JsonView :obj="jwt_result_header" :default_collapse_level="0" style="height: fit-content;" />
                <JsonView :obj="jwt_result_body" style="height: 0; flex: 1;" />
            </n-grid-item>
        </n-grid>
    </div>
    <div v-else class="page-content">
        <n-spin size="large" />
    </div>
</template>

<style module></style>
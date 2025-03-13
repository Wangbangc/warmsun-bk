<script setup>
import { ref, onMounted } from 'vue'

const groups = ref([
    {
        timestamp: ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0).getTime()),
        date: ref('')
    },
    {
        timestamp: ref(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime()),
        date: ref('')
    },
    {
        timestamp: ref(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), 0, 0, 0).getTime()),
        date: ref('')
    },
    {
        timestamp: ref(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), 0, 0).getTime()),
        date: ref('')
    },
    {
        timestamp: ref(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), 0).getTime()),
        date: ref('')
    },
    {
        timestamp: ref(new Date().getTime()),
        date: ref('')
    },

])

function onChangeTimestamp(group_index) {
    if (!groups.value[group_index].timestamp) {
        groups.value[group_index].date = ''
        return
    }
    const d = new Date(parseInt(groups.value[group_index].timestamp))
    if (d == 'Invalid Date') {
        groups.value[group_index].date = ''
        return
    }
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    const milliseconds = String(d.getMilliseconds()).padStart(3, '0');

    groups.value[group_index].date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function onChangeDate(group_index) {
    if (!groups.value[group_index].date || groups.value[group_index].date.length < 19) {
        groups.value[group_index].timestamp = ''
        return
    }
    groups.value[group_index].timestamp = new Date(groups.value[group_index].date).getTime()
    if (isNaN(groups.value[group_index].timestamp)) {
        groups.value[group_index].timestamp = ''
    }
}

onMounted(() => {
    for (let i = 0; i < groups.value.length; i++) {
        onChangeTimestamp(i)
    }
})

</script>

<template>
    <div class="page-content">
        <div>
            <p>时间戳格式化：</p>
            <div v-for="(_, index) in groups">
                <n-flex :wrap="false" align="baseline" style="margin: 15px 0;">
                    <n-input type="number" autofocus v-model:value.number="groups[index].timestamp" placeholder="时间戳毫秒数"
                        v-on:input="onChangeTimestamp(index)" />
                    ⇄
                    <n-input type="text" v-model:value="groups[index].date" placeholder="格式化后的时间"
                        v-on:input="onChangeDate(index)" />
                </n-flex>
            </div>
        </div>
    </div>
</template>

<style module>

</style>
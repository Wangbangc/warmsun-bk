<script setup>
const props = defineProps({
    json_value: {
        type: [String, Number, Object, Array, Boolean],
        default: ''
    },
    depth: {
        type: Number,
        default: 0
    },
    new_line: {
        type: Boolean,
        default: true
    },
    comma: {
        type: Boolean,
        default: false
    },
    skeleton_mode: {
        type: Boolean,
        default: false
    },
    escape_render: {
        type: Boolean,
        default: false
    },
    collapse_level: {
        type: [Number, String],
        default: 999
    }
})

import { onMounted, ref } from 'vue'
import Key from './Key.vue'

function isString(value) {
    return typeof value === 'string';
}
function stringValueEscape(value) {
    if (props.escape_render) {
        return `"${value}"`
    } 
    return JSON.stringify(value)
}

function isNull(value) {
    return value === null;
}

function isNumber(value) {
    return typeof value === 'number';
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

function isArray(value) {
    return Array.isArray(value);
}

function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toggleCollapse(event) {
    if (event.target.nextSibling.style.display == 'none') {
        event.target.nextSibling.style.display = 'inline'
    } else {
        event.target.nextSibling.style.display = 'none'
    }
}

onMounted(() => {
    
})
</script>

<template><span v-if="new_line"><br /><span>{{ "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(depth) }}</span></span>
    <span v-if="isString(json_value)"><span :class="$style.json_string">{{ stringValueEscape(json_value) }}</span><span v-if="comma">,</span></span>
    <span v-if="isNumber(json_value)"><span :class="$style.json_number">{{ json_value }}</span><span v-if="comma">,</span></span>
    <span v-if="isBoolean(json_value)"><span :class="$style.json_boolean">{{ json_value }}</span><span v-if="comma">,</span></span>
    <span v-if="isNull(json_value)"><span :class="$style.json_null">null</span><span v-if="comma">,</span></span>

    <span v-if="isArray(json_value)">[<i v-on:click="toggleCollapse" :class="$style.collapse_icon">&gt...{{ json_value.length }}</i>
        <span v-show="depth < collapse_level">
            <span v-if="skeleton_mode">
                <Value v-if="json_value.length" :json_value="json_value[0]" :depth="depth + 1" 
                    :skeleton_mode="skeleton_mode" :escape_render="escape_render" :collapse_level="collapse_level"
                    :comma="false"/>
            </span>
            <span v-else v-for="(item, index) in json_value">
                <Value :json_value="item" :depth="depth + 1" 
                    :skeleton_mode="skeleton_mode" :escape_render="escape_render" :collapse_level="collapse_level"
                    :comma="index < json_value.length - 1"/>
            </span>
            <span v-if="json_value.length"><br /><span>{{ "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(depth) }}</span></span>
        </span>]<span v-if="comma">,</span>
    </span>

    <span v-if="isObject(json_value)">{<i v-on:click="toggleCollapse" :class="$style.collapse_icon">&gt...{{ Object.keys(json_value).length }}</i>
        <span v-show="depth < collapse_level">
            <span v-for="(value, key, index) in json_value">
                <Key :json_key="key" :depth="depth + 1" />
                <Value :json_value="value" :depth="depth + 1" :new_line="false" 
                    :skeleton_mode="skeleton_mode" :escape_render="escape_render" :collapse_level="collapse_level"
                    :comma="index < Object.keys(json_value).length - 1" />
            </span>
            <span v-if="Object.keys(json_value).length"><br /><span>{{ "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(depth) }}</span></span>
        </span>}<span v-if="comma">,</span>
    </span>
</template>

<style module>
.json_key {
    color: var(--vp-c-indigo-1);
    font-weight: bold;
}

.json_string {
    color: var(--vp-c-green-1);
}

.json_number {
    color: var(--vp-c-purple-1);
}

.json_boolean {
    color: var(--vp-c-red-1);
}

.json_null {
    color: var(--vp-c-gray-1);
}

.collapse_icon {
    font-size: 12px;
    color: var(--vp-c-gray-1);
    cursor: pointer;
    user-select: none;
}
</style>
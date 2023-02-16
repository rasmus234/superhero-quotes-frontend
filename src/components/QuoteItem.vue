<template>
    <blockquote class="otro-blockquote">
        {{ quote?.text }}
        <span v-if="quote?.author">{{ quote?.author }}</span>
        <span v-else>Unknown Author</span>
        <div class="timer-bar" :style="`--duration: ${refreshTimeSeconds}`"></div>
    </blockquote>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";
import type {GetQuoteDto} from "@/models/GetQuoteDto";

const quote = ref<GetQuoteDto>();
const refreshTimeSeconds = 10;
let intervalId = 0;

onMounted(() => {
    init()
});

onUnmounted(() => {
    clearInterval(intervalId);
});

//fetch a quote from the azure function and then set a timer that does the same every 10 seconds
const init = async () => {
    await fetchQuote()
    intervalId = setInterval(fetchQuote, refreshTimeSeconds * 1000);
}
const fetchQuote = async () => {
    try {
        const response = await fetch(
            "http://localhost:7071/api/quote"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }
        const data: GetQuoteDto = await response.json();
        quote.value = data;
    } catch (e) {
        console.error(e);
    }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400italic);

.timer-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: #78C0A8;
    animation: roundtime calc(var(--duration) * 1s) linear forwards infinite;
    transform-origin: left center;
}

@keyframes roundtime {
    to {
        transform: scaleX(0);
    }
}

.otro-blockquote {
    border-radius: 5px;
    font-size: 1.4em;
    width: 60%;
    margin: 50px auto;
    font-family: Open Sans;
    font-style: italic;
    color: #555555;
    padding: 1.2em 30px 1.2em 75px;
    border-left: 8px solid #78C0A8;
    line-height: 1.6;
    position: relative;
    background: #EDEDED;
}

.otro-blockquote::before {
    font-family: Arial;
    content: "\201C";
    color: #78C0A8;
    font-size: 4em;
    position: absolute;
    left: 10px;
    top: -10px;
}

.otro-blockquote::after {
    content: '';
}

.otro-blockquote span {
    display: block;
    color: #333333;
    font-style: normal;
    font-weight: bold;
    margin-top: 1em;
}
</style>
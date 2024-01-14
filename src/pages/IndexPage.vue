<template>
  <q-page>
    <div>
      <q-carousel height="100vh" animated v-model="slide" navigation infinite :autoplay="autoplay" arrows
        transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
        @mouseleave="autoplay = true">
        <q-carousel-slide :name="1" img-src="../img/1.png" />
        <q-carousel-slide :name="2" img-src="../img/2.png" />
      </q-carousel>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const slide = ref(1)
const autoplay = ref(true)
</script>
true)

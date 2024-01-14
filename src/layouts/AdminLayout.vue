<template>
  <q-layout class="main" view="hHh lpR fFf">

    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn dense flat round color="black" icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-center">
          <img class="q-mt-sm" width="250px" src="../img/logo2.png">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-img class="text-center" src="../img/banner-bg.jpg">
        <div class="absolute-center bg-transparent">
          <div class=" text-h6 text-bold">WELCOME ADMIN</div>
        </div>
      </q-img>
      <q-separator class="q-mb-lg" />
      <div class="q-pa-md" style="max-width: 350px">
        <q-list>
          <q-item to="/admin" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="fa-regular fa-circle-user" />
            </q-item-section>
            <q-item-section>Students Info</q-item-section>
          </q-item>

        </q-list>
      </div>
      <q-separator class="q-mt-xl" />

      <q-list class="q-pa-md text-center">
        <q-item>
          <q-item-section>
            <q-btn label="Logout" color="primary" glossy />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section caption>
            CSR 2023
          </q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


</script>




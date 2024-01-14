<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar class="q-pa-none">
        <q-toolbar-title>
          <img class="q-mt-sm" width="250px" src="../img/logo.png">
        </q-toolbar-title>
        <q-tabs v-if="showTabs" align="left">
          <q-route-tab label="About" />
          <q-btn flat color="white" label="Admissions">
            <template>
            </template>
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item to="admissions/apply" clickable v-close-popup>
                  <q-item-section>Apply</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Why Join CSR</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Tuition Fees</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Requirements</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Enrollment Guides</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                  <q-menu anchor="top end" self="top start">
                    <q-list>
                      <q-item v-for="s in enrollMentGuidelines" :key="s" dense clickable>
                        <q-item-section>{{ s }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-route-tab label="Programs" />
          <q-route-tab label="Student Services" />
        </q-tabs>
        <q-btn v-if="!showTabs" class="btn-toggler q-mr-md" dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <!-- drawer content -->
      <div>sample</div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const showTabs = ref(true)
const enrollMentGuidelines = ref([
  'New Students', 'Continuing Students', 'Old Returning Students', 'Transeferees', 'Second Courses'
])

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {
  leftDrawerOpen.value = false
  const mediaQuery = window.matchMedia('(max-width: 1024px)')

  const handleMediaQuery = (mq) => {
    showTabs.value = !mq.matches
  }

  handleMediaQuery(mediaQuery)
  mediaQuery.addEventListener('change', handleMediaQuery)

})

</script>

<template>
  <q-page padding>
    <div class="flex column flex-center">
      <q-img width="750px" src="../img/logo2.png" />
      <div style="margin-top: -25px;" class="text-h5 ">Academic Information Management System
      </div>
      <div class="q-mt-md" style="width:450px">
        <q-card>
          <q-card-section>
            <div class="q-mb-sm">Student Number</div>
            <q-input class="q-mb-sm" label="Your Student Number" outlined dense />
            <div class="q-mb-sm">Password</div>
            <q-input label="Your Password" outlined dense />
            <div class="row justify-end q-mt-sm">
              <a href="#">Forgot your password?</a>
            </div>
            <div class="row justify-between q-mt-md">
              <q-checkbox v-model="rememberMe" label="Remember Me" />
              <q-btn class="q-px-md" color="primary" label="Sign In" dense />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const rememberMe = ref('')
</script>

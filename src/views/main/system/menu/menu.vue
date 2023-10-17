<script setup lang="ts">
import pageContent from "@/components/pageContent/pageContent.vue"
import contentConfig from "./config/content.config"
</script>

<template>
  <div class="menu">
    <pageContent :content-config="contentConfig"></pageContent>
  </div>
</template>

<style scoped lang="less"></style>

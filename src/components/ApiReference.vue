<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference';
import '@scalar/api-reference/style.css';
</script>

<template>
  <div class="api-reference-container">
    <ApiReference
      :configuration="{
        spec: {
          url: '/api/scalekit.swagger.json',
        },
        theme: 'bluePlanet',
        hiddenClients: true,
        hideTestRequestButton: true,
        hideModels: true,
      }"
    />
  </div>
</template>

<style>
.api-reference-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>

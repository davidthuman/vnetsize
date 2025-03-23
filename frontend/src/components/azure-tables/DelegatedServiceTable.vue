<script setup>

import { ref } from 'vue';

const delegatedServices = ref([
  {
    name: 'Microsoft.DBforPostgreSQL/flexibleServers',
    minSize: '/28',
    maxSize: '/27',
    recommendedSize: '/27',
    relatedServices: 'Azure Database for PostgreSQL - Flexible Server',
  },
  {
    name: 'Microsoft.Web/serverFarms',
    minSize: '/26',
    maxSize: '/27',
    recommendedSize: '/27',
    relatedServices: 'Azure App Service',
  },
  {
    name: 'Microsoft.Network/dnsResolvers',
    minSize: '/28',
    maxSize: 'N/A',
    recommendedSize: '/28',
    relatedServices: 'Azure Private DNS Resolver (inbound)',
  },
  {
    name: 'Microsoft.Network/dnsResolvers',
    minSize: '/28',
    maxSize: 'N/A',
    recommendedSize: '/28',
    relatedServices: 'Azure Private DNS Resolver (outbound)',
  },
  {
    name: 'Microsoft.AVS/privateClouds',
    minSize: '/22',
    maxSize: '/22',
    recommendedSize: '/22',
    relatedServices: 'Azure VMware Solution',
  },
]);

</script>

<template>

  <div class="card">
    <DataTable :value="delegatedServices" tableStyle="min-width: 50rem">
      <Column field="name" header="Delegated Services Name"></Column>
      <Column field="minSize" header="Min. Size of Subnet"></Column>
      <Column field="maxSize" header="Max. Size of Subnet"></Column>
      <Column field="recommendedSize" header="Recommended Size of Subnet"></Column>
      <Column field="relatedServices" header="Related Azure Services"></Column>
    </DataTable>
  </div>

</template>
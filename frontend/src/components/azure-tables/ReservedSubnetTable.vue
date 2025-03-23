<script setup>

import { ref } from 'vue';

const reservedSubnets = ref([
  {
    name: 'GatewaySubnet',
    minSize: '/27',
    maxSize: '/27',
    recommendedSize: '/27',
    relatedServices: 'Azure Virtual Network Gateway / ExpressRoute / Site-to-Site VPN',
  },
  {
    name: 'RouteServerSubnet',
    minSize: '/27',
    maxSize: '/24',
    recommendedSize: '/27',
    relatedServices: 'Azure Route Server',
  },
  {
    name: 'AzureBastionSubnet',
    minSize: '/26',
    maxSize: '/24',
    recommendedSize: '/26',
    relatedServices: 'Azure Bastion',
  },
  {
    name: 'AzureFirewallSubnet',
    minSize: '/26',
    maxSize: '/26',
    recommendedSize: '/26',
    relatedServices: 'Azure Firewall',
  },
  {
    name: 'AzureFirewallManagementSubnet',
    minSize: '/26',
    maxSize: '/16',
    recommendedSize: '/26',
    relatedServices: 'Azure Firewall Manager',
  },
]);

</script>

<template>

  <div class="card">
    <DataTable :value="reservedSubnets" tableStyle="min-width: 50rem">
      <Column field="name" header="Reserved Subnet Name"></Column>
      <Column field="minSize" header="Min. Size of Subnet"></Column>
      <Column field="maxSize" header="Max. Size of Subnet"></Column>
      <Column field="recommendedSize" header="Recommended Size of Subnet"></Column>
      <Column field="relatedServices" header="Related Azure Services"></Column>
    </DataTable>
  </div>

</template>
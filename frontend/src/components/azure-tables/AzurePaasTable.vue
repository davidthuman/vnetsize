<script setup>

import { ref } from 'vue';

const azurePaas = ref([
  {
    name: 'Azure Virtual WAN Hub',
    minSize: '/24',
    maxSize: 'N/A',
    recommendedSize: '/24',
    dedicatedSubnet: 'Yes',
  },
  {
    name: 'Azure Application Gateway',
    minSize: '/26 (Standard or WAF SKU)',
    maxSize: 'N/A',
    recommendedSize: '/24 (Standard_v2 or WAF_v2 SKU)',
    dedicatedSubnet: 'Yes',
  },
  {
    name: 'Azure AD Domain Services (AADDS)',
    minSize: '?',
    maxSize: 'N/A',
    recommendedSize: '?',
    dedicatedSubnet: 'No',
  },
  {
    name: 'Azure SQL Managed Instance (SQL MI)',
    minSize: '/27',
    maxSize: 'N/A',
    recommendedSize: '/26',
    dedicatedSubnet: 'Yes',
  },
  {
    name: 'App Services (Web Apps, Function, API Apps)',
    minSize: '/28',
    maxSize: 'N/A',
    recommendedSize: '/26',
    dedicatedSubnet: 'Yes',
  },
  {
    name: 'Azure API Management',
    minSize: '?',
    maxSize: 'N/A',
    recommendedSize: '?',
    dedicatedSubnet: 'Yes',
  },
  {
    name: 'Azure Container Instances (ACI)',
    minSize: '?',
    maxSize: 'N/A',
    recommendedSize: '?',
    dedicatedSubnet: 'Yes',
  },
  {
    name: 'Azure Spring Cloud',
    minSize: '/28',
    maxSize: 'N/A',
    recommendedSize: 'Depends on Requirement',
    dedicatedSubnet: 'Yes',
  },
  {
    name: 'Azure Red Hat OpenShift Master Subnet',
    minSize: '/27',
    maxSize: '/27',
    recommendedSize: '/27',
    dedicatedSubnet: 'Yes',
  },
  {
    name: 'Azure Red Hat OpenShift Worker Subnet',
    minSize: '/27',
    maxSize: '/24',
    recommendedSize: '/25',
    dedicatedSubnet: 'Yes',
  },
]);

</script>

<template>

  <div class="card">
    <DataTable :value="azurePaas" tableStyle="min-width: 50rem">
      <Column field="name" header="Azure PaaS"></Column>
      <Column field="minSize" header="Min. Size of Subnet"></Column>
      <Column field="maxSize" header="Max. Size of Subnet"></Column>
      <Column field="recommendedSize" header="Recommended Size of Subnet"></Column>
      <Column field="dedicatedSubnet" header="Dedicated Subnet"></Column>
    </DataTable>
  </div>

</template>
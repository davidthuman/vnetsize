<script setup>

import AzurePaasTable from './azure-tables/AzurePaasTable.vue';
import DelegatedServiceTable from './azure-tables/DelegatedServiceTable.vue';
import ReservedSubnetTable from './azure-tables/ReservedSubnetTable.vue';

</script>

<template>

  <div class="flex flex-col gap-5">
    <ReservedSubnetTable />
    <DelegatedServiceTable />
    <AzurePaasTable />
    <div>
      The tables above were taken from <a href="https://blog.pichuang.com.tw/azure-subnets.html">Visual Subnet Calculator (Azure Edition) (https://blog.pichuang.com.tw/azure-subnets.html)</a>
    </div>
  </div>

</template>
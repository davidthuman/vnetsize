<script setup>

import { ref, computed, reactive } from 'vue';

import { cidrToRange } from '@/assets/js/ip';

const ipAddressCidr = reactive({
  ipAddress: {
    value: null,
    clicked: false,
    invalid: computed(() => {
      if (!ipAddressCidr.ipAddress.clicked) {
        return false
      }
      if (ipAddressCidr.ipAddress.value === null) {
        return true;
      } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddressCidr.ipAddress.value)) {
        return true;
      } else {
        return false;
      }
    }),
  },
  cidr: {
    value: null,
    options: Array.from({ length: 33 }, (_, i) => `/${i}`).reverse(),
    clicked: false,
    invalid: computed(() => {
      if (!ipAddressCidr.cidr.clicked) {
        return false
      }
      if (ipAddressCidr.cidr.value === null) {
        return true;
      } else {
        return false;
      }
    }),
  },
  invalid: computed(() => {
    return (
      ipAddressCidr.ipAddress.invalid || !ipAddressCidr.ipAddress.clicked
    ) || (
        ipAddressCidr.cidr.invalid || !ipAddressCidr.cidr.clicked
      )
  }),
});

const ipAddressCidrStart = ref();

const ipAddressCidrEnd = ref();

const calculateIpAddressRange = () => {
  ipAddressCidrStart.value = ipAddressCidr.ipAddress.value;
  ipAddressCidrEnd.value = cidrToRange(ipAddressCidr.ipAddress.value, ipAddressCidr.cidr.value);
}

</script>

<template>

  <Panel class="md:w-96" toggleable>
    <template #header>
      <div class="text-xl font-medium">CIDR to Range</div>
    </template>
    <div class="flex flex-col gap-3">
      <div>IP Address and CIDR</div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-globe"></i>
        </InputGroupAddon>
        <InputText class="w-min" id="idAddressCidr" v-model="ipAddressCidr.ipAddress.value"
          :invalid="ipAddressCidr.ipAddress.invalid" placeholder="111.111.111.111"
          @focusout="ipAddressCidr.ipAddress.clicked = true;" />
        <Select class="w-min" v-model="ipAddressCidr.cidr.value" :options="ipAddressCidr.cidr.options"
          placeholder="CIDR" :invalid="ipAddressCidr.cidr.invalid" @focusout="ipAddressCidr.cidr.clicked = true;" />
      </InputGroup>
      <Button class="w-min" label="Calculate" :disabled="ipAddressCidr.invalid" @click="calculateIpAddressRange()" />
      <div class="flex gap-2">
        <div>Start: </div>
        <div>{{ ipAddressCidrStart }}</div>
      </div>
      <div class="flex gap-2">
        <div>End: </div>
        <div>{{ ipAddressCidrEnd }}</div>
      </div>
    </div>
  </Panel>

</template>
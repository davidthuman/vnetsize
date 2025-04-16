<script setup>

import { ref, computed, reactive } from 'vue';

import { rangeToCidrs } from '@/assets/js/ip'

const ipAddressRange = reactive({
  start: {
    value: null,
    clicked: false,
    invalid: computed(() => {
      if (!ipAddressRange.start.clicked) {
        return false
      }
      if (ipAddressRange.start.value === null) {
        return true;
      } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddressRange.start.value)) {
        return true;
      } else {
        return false;
      }
    }),
  },
  end: {
    value: null,
    clicked: false,
    invalid: computed(() => {
      if (!ipAddressRange.end.clicked) {
        return false
      }
      if (ipAddressRange.end.value === null) {
        return true;
      } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddressRange.end.value)) {
        return true;
      } else {
        return false;
      }
    }),
  },
  invalid: computed(() => {
    return (
      ipAddressRange.start.invalid || !ipAddressRange.start.clicked
    ) || (
        ipAddressRange.end.invalid || !ipAddressRange.end.clicked
      )
  }),
})

const ipAddressCidrs = ref();

const calculateIpAddressCidrs = () => {
  ipAddressCidrs.value = rangeToCidrs(ipAddressRange.start.value, ipAddressRange.end.value)
}

</script>

<template>

  <Panel class="md:w-96" toggleable>
    <template #header>
      <div class="text-xl font-medium">Range to CIDR</div>
    </template>
    <div class="flex flex-col gap-3">
      <div>IP Addresses</div>
      <InputGroup class="pt-5">
        <InputGroupAddon>
          <i class="pi pi-globe"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText class="w-min" id="idAddressStart" v-model="ipAddressRange.start.value"
            :invalid="ipAddressRange.start.invalid" @focusout="ipAddressRange.start.clicked = true;" />
          <label for="ipAddressStart">Start</label>
        </FloatLabel>
        <FloatLabel>
          <InputText class="w-min" id="idAddressEnd" v-model="ipAddressRange.end.value"
            :invalid="ipAddressRange.end.invalid" @focusout="ipAddressRange.end.clicked = true;" />
          <label for="idAddressEnd">End</label>
        </FloatLabel>
      </InputGroup>
      <Button class="w-min" label="Calculate" :disabled="ipAddressRange.invalid" @click="calculateIpAddressCidrs()" />
      <div>CIDRs</div>
      <div v-for="cidr in ipAddressCidrs">{{ cidr }}</div>
    </div>
  </Panel>

</template>
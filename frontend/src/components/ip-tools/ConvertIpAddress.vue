<script setup>

import { ref, computed, reactive } from 'vue';

import { parseIpV4Address } from '@/assets/js/ip'

const ipAddress = reactive({
  value: null,
  clicked: false,
  invalid: computed(() => {
    if (!ipAddress.clicked) {
      return false
    }
    if (ipAddress.value === null) {
      return true;
    } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddress.value)) {
      return true;
    } else {
      return false;
    }
  }),
});

const ipAddressDecimal = ref();

const ipAddressBinary = ref();

const convertIpAddress = () => {
  ipAddressDecimal.value = parseIpV4Address(ipAddress.value);
  ipAddressBinary.value = Number(parseIpV4Address(ipAddress.value)).toString(2);
}

</script>

<template>

  <Panel class="md:w-96" toggleable>
    <template #header>
      <div class="text-xl font-medium">Convert IP Address</div>
    </template>
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-3">
        <div>IP Address</div>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-globe"></i>
          </InputGroupAddon>
          <InputText id="idAddress" v-model="ipAddress.value" :invalid="ipAddress.invalid" placeholder="111.111.111.111"
            @focusout="ipAddress.clicked = true;" />
        </InputGroup>
        <Button class="w-min" label="Convert" :disabled="ipAddress.invalid || !ipAddress.clicked"
          @click="convertIpAddress()" />
      </div>
      <div class="flex flex-col gap-3">
        <div>Decimal</div>
        <div v-if="ipAddressDecimal !== null">{{ ipAddressDecimal }}</div>
      </div>
      <div class="flex flex-col gap-3">
        <div>Binary</div>
        <div v-if="ipAddressBinary !== null">{{ ipAddressBinary }}</div>
      </div>
    </div>
  </Panel>

</template>
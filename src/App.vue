<script setup>

import { ref, computed, reactive } from 'vue';

const regionIpAddressRange = "";

const numberVirtualNetworks = 0;

const numberSubnets = 0;

const subnetIpSize = 0;

const parseIpV4Address = (ipAddress) => {

  let number = 0;
  let exponent = 32 - 8;

  const segments = ipAddress.split('.');

  segments.forEach(segment => {

    const segmentNumber = parseInt(segment, 10);

    number += (segmentNumber * Math.pow(2, exponent));

    exponent -= 8

  });

  return number;
}

const convertIpAddress = () => {

  ipAddressDecimal.value = parseIpV4Address(ipAddress.value);

  ipAddressBinary.value = Number(parseIpV4Address(ipAddress.value)).toString(2);

}


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

const ipAddressCidr = reactive({
  value: null,
  clicked: false,
  invalid: computed(() => {
    if (!ipAddressCidr.clicked) {
      return false
    }
    if (ipAddressCidr.value === null) {
      return true;
    } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddressCidr.value)) {
      return true;
    } else {
      return false;
    }
  }),
  cidr: null,
});


const ipAddressDecimal = ref();

const ipAddressBinary = ref();

const cidrRanges = ref(
  Array.from({ length: 33 }, (_, i) => `/${i}`).reverse()
)

function toggleDarkMode() {
  document.documentElement.classList.toggle('app-dark');
}

</script>

<template>
  <div class="flex flex-col gap-5">
    <div name="header" class="flex justify-between items-center px-8 pt-8">
      <div class="flex items-center gap-3">
        <img src="/virtual-network.svg" width="50" />
        <div class="text-nowrap text-2xl">VNET Size</div>
      </div>
      <ToggleSwitch label="Toggle Dark Mode" @click="toggleDarkMode()" />
    </div>
    <div name="body" class="p-5 flex gap-3">
      <Card class="">
        <template #title>Convert IP Address</template>
        <template #content>
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-3">
              <div>IP Address</div>
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-globe"></i>
                </InputGroupAddon>
                <InputText id="idAddress" v-model="ipAddress.value" :invalid="ipAddress.invalid"
                  placeholder="111.111.111.111" @focusout="ipAddress.clicked = true;" />
              </InputGroup>
              <Button class="w-min" label="Convert" :disabled="ipAddress.invalid || !ipAddress.clicked"
                @click="convertIpAddress()" />
            </div>
            <div class="flex flex-col gap-3">
              <div>Dotted-Decimal to Decimal</div>
              <div v-if="ipAddressDecimal !== null">{{ ipAddressDecimal }}</div>
            </div>
            <div class="flex flex-col gap-3">
              <div>Dotted-Decimal to Binary</div>
              <div v-if="ipAddressBinary !== null">{{ ipAddressBinary }}</div>
            </div>
          </div>
        </template>
      </Card>
      <Card>
        <template #title>CIDR to Range</template>
        <template #content>
          <div class="flex flex-col gap-3">
            <div>IP Address and CIDR</div>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-globe"></i>
              </InputGroupAddon>
              <InputText class="w-min" id="idAddressCidr" v-model="ipAddressCidr.value" :invalid="ipAddressCidr.invalid"
                placeholder="111.111.111.111" @focusout="ipAddressCidr.clicked = true;" />
              <Select class="w-min" v-model="ipAddressCidr.cidr" :options="cidrRanges" placeholder="CIDR" />
            </InputGroup>
            <Button class="w-min" label="Calculate" :disabled="ipAddressCidr.invalid || !ipAddressCidr.clicked"
                @click="calculateIpAddressRange()" />
          </div>

        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>

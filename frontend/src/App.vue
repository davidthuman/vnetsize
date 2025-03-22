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

const decimalToDotted = (decimal) => {

  let binary = Number(decimal).toString(2);

  while (binary.length != 32) {
    binary = '0' + binary;
  }

  let ipAddress = '';

  while (binary.length != 0) {

    const segmentBinary = binary.substring(0, 8);
    binary = binary.substring(8);

    const segmentNumber = parseInt(segmentBinary, 2);
    ipAddress = ipAddress + segmentNumber.toString(10);

    if (binary.length != 0) {
      ipAddress += '.';
    }

  }

  return ipAddress;

}

const cidrToRange = (ipAddress, cidr) => {

  const number = parseIpV4Address(ipAddress);

  const count = Math.pow(2, 32 - cidr.substring(1)) - 1;

  const end = number + count;

  return decimalToDotted(end);

}

const ipAddressDecimal = ref();

const ipAddressBinary = ref();

// Dark Mode toggle

const darkMode = ref(false);

function toggleDarkMode() {
  document.documentElement.classList.toggle('app-dark');
  darkMode.value = !darkMode.value;
}

// CIDR to Range

const ipAddressCidrStart = ref();

const ipAddressCidrEnd = ref();

const calculateIpAddressRange = () => {
  ipAddressCidrStart.value = ipAddressCidr.ipAddress.value;
  ipAddressCidrEnd.value = cidrToRange(ipAddressCidr.ipAddress.value, ipAddressCidr.cidr.value);
}


// Range to CIDRs

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

const rangeToCidrs = (start, end) => {

  const startDecimal = parseIpV4Address(start);
  const endDecimal = parseIpV4Address(end);

  const count = endDecimal - startDecimal + 1;

  const cidrs = [];

  let currentIpAddressDecimal = startDecimal;
  let remainder = count;

  while (remainder != 0) {

    const exponent = Math.floor(Math.log2(remainder));
    const cidr = 32 - exponent;

    const added = Math.pow(2, exponent);

    cidrs.push(`${decimalToDotted(currentIpAddressDecimal)}/${cidr}`);

    currentIpAddressDecimal += added
    remainder -= added;
  }

  return cidrs;

}

const ipAddressCidrs = ref();

const calculateIpAddressCidrs = () => {
  ipAddressCidrs.value = rangeToCidrs(ipAddressRange.start.value, ipAddressRange.end.value)
}

</script>

<template>
  <div class="flex flex-col gap-5">
    <div name="header" class="flex justify-between items-center px-8 pt-8">
      <div class="flex items-center gap-3">
        <img src="/virtual-network.svg" width="50" />
        <div class="text-nowrap text-2xl font-medium">VNET Size</div>
      </div>
      <div class="flex items-center gap-2">
        <i v-if="darkMode" class="pi pi-sun"></i>
        <i v-else class="pi pi-moon"></i>
        <ToggleSwitch label="Toggle Dark Mode" @click="toggleDarkMode()" />
      </div>

    </div>
    <div name="body" class="p-5 grid grid-cols-2 gap-3">
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
              <InputText class="w-min" id="idAddressCidr" v-model="ipAddressCidr.ipAddress.value"
                :invalid="ipAddressCidr.ipAddress.invalid" placeholder="111.111.111.111"
                @focusout="ipAddressCidr.ipAddress.clicked = true;" />
              <Select class="w-min" v-model="ipAddressCidr.cidr.value" :options="ipAddressCidr.cidr.options"
                placeholder="CIDR" :invalid="ipAddressCidr.cidr.invalid"
                @focusout="ipAddressCidr.cidr.clicked = true;" />
            </InputGroup>
            <Button class="w-min" label="Calculate" :disabled="ipAddressCidr.invalid"
              @click="calculateIpAddressRange()" />
            <div class="flex gap-2">
              <div>Start: </div>
              <div>{{ ipAddressCidrStart }}</div>
            </div>
            <div class="flex gap-2">
              <div>End: </div>
              <div>{{ ipAddressCidrEnd }}</div>
            </div>
          </div>
        </template>
      </Card>
      <Card>
        <template #title>
          Range to CIDR
        </template>
        <template #content>

          <div class="flex flex-col gap-3">
            <div>IP Addresses</div>
            <InputGroup class="pt-5">
              <InputGroupAddon>
                <i class="pi pi-globe"></i>
              </InputGroupAddon>
              <FloatLabel>
                <InputText class="w-min" id="idAddressStart" v-model="ipAddressRange.start.value"
                  :invalid="ipAddressRange.start.invalid" 
                  @focusout="ipAddressRange.start.clicked = true;" />
                <label for="ipAddressStart">Start</label>
              </FloatLabel>
              <FloatLabel>
              <InputText class="w-min" id="idAddressEnd" v-model="ipAddressRange.end.value"
                :invalid="ipAddressRange.end.invalid"
                @focusout="ipAddressRange.end.clicked = true;" />
                <label for="idAddressEnd">End</label>
              </FloatLabel>
            </InputGroup>
            <Button class="w-min" label="Calculate" :disabled="ipAddressRange.invalid"
              @click="calculateIpAddressCidrs()" />
            <div>CIDRs</div>
            <div v-for="cidr in ipAddressCidrs">{{ cidr }}</div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>

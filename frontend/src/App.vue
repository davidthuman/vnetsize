<script setup>

import { ref, reactive, computed, registerRuntimeCompiler } from 'vue';

import { parseIpV4Address, cidrToRange, countToMasks } from '@/assets/js/ip';

const ipAddressRangeRegional = reactive({
  inputToggle: {
    value: true,
    clicked: false,
    invalid: false,
  },
  start: {
    value: null,
    clicked: false,
    invalid: computed(() => {
      if (!ipAddressRangeRegional.start.clicked) {
        return false
      }
      if (ipAddressRangeRegional.start.value === null) {
        return true;
      } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddressRangeRegional.start.value)) {
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
      if (!ipAddressRangeRegional.end.clicked) {
        return false
      }
      if (ipAddressRangeRegional.end.value === null) {
        return true;
      } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddressRangeRegional.end.value)) {
        return true;
      } else {
        return false;
      }
    }),
  },
  ipAddress: {
    value: null,
    clicked: false,
    invalid: computed(() => {
      if (!ipAddressRangeRegional.ipAddress.clicked) {
        return false
      }
      if (ipAddressRangeRegional.ipAddress.value === null) {
        return true;
      } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ipAddressRangeRegional.ipAddress.value)) {
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
      if (!ipAddressRangeRegional.cidr.clicked) {
        return false
      }
      if (ipAddressRangeRegional.cidr.value === null) {
        return true;
      } else {
        return false;
      }
    }),
  },
  invalid: computed(() => {
    if (!ipAddressRangeRegional.inputToggle.value) {
      return (
        ipAddressRangeRegional.start.invalid || !ipAddressRangeRegional.start.clicked
      ) || (
          ipAddressRangeRegional.end.invalid || !ipAddressRangeRegional.end.clicked
        )
    } else {
      return (
        ipAddressRangeRegional.ipAddress.invalid || !ipAddressRangeRegional.ipAddress.clicked
      ) || (
          ipAddressRangeRegional.cidr.invalid || !ipAddressRangeRegional.cidr.clicked
        )
    }
  }),
  computed: computed(() => {

    if (networkInputs.numberVirtualNetworks.value == 0) {
      return null
    }

    if (networkInputs.sizeVirtualNetwork.count == 0) {
      return null
    }

    return 

    if (ipAddressRangeRegional.inputToggle.value) {
      // CIDR
    } else {
      // Range
    }
  })
})

const networkInputs = reactive({
  numberVirtualNetworks: {
    value: 0,
    default: 0,
    result: null
  },
  sizeVirtualNetwork: {
    value: null,
    default: null,
    count: computed(() => {
      if (networkInputs.sizeVirtualNetwork.value == null) {
        return 0;
      } else {
        return Math.pow(2, 32 - Number(networkInputs.sizeVirtualNetwork.value.substring(1)))
      }
    }),
    result: null,
    options: Array.from({ length: 33 }, (_, i) => `/${i}`).reverse(),
    clicked: false,
    invalid: computed(() => {
      if (!networkInputs.sizeVirtualNetwork.clicked) {
        return false
      }
      if (networkInputs.sizeVirtualNetwork.value === null) {
        return true;
      } else {
        return false;
      }
    }),
  },
  numberSubnetsPerVirtualNetwork: {
    value: 0,
    default: 0,
    result: null
  },
  sizeSubnet: {
    value: null,
    default: null,
    count: computed(() => {
      if (networkInputs.sizeSubnet.value != null) {
        return Math.pow(2, 32 - Number(networkInputs.sizeSubnet.value.substring(1)));
      }
      if (networkInputs.sizeSubnet.result != null) {
        return Math.pow(2, 32 - Number(networkInputs.sizeSubnet.result.substring(1)));
      }
      return 0;
    }),
    result: null,
    options: Array.from({ length: 33 }, (_, i) => `/${i}`).reverse(),
    clicked: false,
    invalid: computed(() => {
      if (!networkInputs.sizeSubnet.clicked) {
        return false
      }
      if (networkInputs.sizeSubnet.value === null) {
        return true;
      } else {
        return false;
      }
    }),
  },
  invalid: computed(() => {
    if (ipAddressRangeRegional.invalid) {
      return true;
    }
    let nonZero = 0;
    let zero = 0;
    [
      networkInputs.numberVirtualNetworks,
      networkInputs.sizeVirtualNetwork,
      networkInputs.numberSubnetsPerVirtualNetwork,
      networkInputs.sizeSubnet
    ].forEach(element => {
      if ((element.value > 0) || (element.count > 0)) {
        nonZero += 1;
      } else {
        zero += 1;
      }
    });

    return !((nonZero == 2) && (zero == 2));
  }),
  plan: false,
})

const planRegionalNetwork = () => {

  let count;

  // Get count of available IP address
  if (ipAddressRangeRegional.inputToggle.value) {
    // CIDR
    const startNumber = parseIpV4Address(ipAddressRangeRegional.ipAddress.value);
    const endNumber = parseIpV4Address(cidrToRange(ipAddressRangeRegional.ipAddress.value, ipAddressRangeRegional.cidr.value));
    count = (endNumber - startNumber) + 1;
  } else {
    // Range
    const startNumber = parseIpV4Address(ipAddressRangeRegional.start.value);
    const endNumber = parseIpV4Address(ipAddressRangeRegional.end.value);
    count = endNumber - startNumber + 1;
  }

  console.log("Count of Regional Network", count)

  const sizeRegional = count;

  // Given Equations
  // regionalSize == numberVnet * vnetSize
  // vnetSize == numberSubnetPerVnet * subnetSize

  // Not given: vnetNumber, vnetSize
  // Given: subnetsPerVnetNumber, subnetSize, regionalSize
  // regionalSize == vnetNumber? * subnetPerVnetNumber * subnetSize

  if (
    (networkInputs.numberVirtualNetworks.value <= 0 || networkInputs.numberVirtualNetworks.count <= 0) &&
    (networkInputs.sizeVirtualNetwork.value <= 0 || networkInputs.sizeVirtualNetwork.count <= 0)
  ) {
      const numberVirtualNetworks = sizeRegional / 
      (
        networkInputs.numberSubnetsPerVirtualNetwork.value * 
        networkInputs.sizeSubnet.count
      )

      const sizeVirtualNetwork = sizeRegional / numberVirtualNetworks

      console.log("Number of Virtual Networks", numberVirtualNetworks)
      console.log("Size of Virtual Networks", sizeVirtualNetwork)
      console.log('Mask(s) for Virtual Networks', countToMasks(sizeVirtualNetwork))

      networkInputs.numberVirtualNetworks.result = numberVirtualNetworks;
      networkInputs.sizeVirtualNetwork.result = sizeVirtualNetwork;
      networkInputs.numberSubnetsPerVirtualNetwork.result = networkInputs.numberSubnetsPerVirtualNetwork.value;
      networkInputs.sizeSubnet.result = networkInputs.sizeSubnet.value;

    }

    // https://www.reddit.com/r/AZURE/comments/16tqbdm/one_subnet_for_all_private_endpoint/


  // Not given: subnetsPerVnetNumber, vnetSize
  // Given: subnetSize, vnetNumber
  // regionalSize == vnetNumber * subnetPerVnetNumber? * subnetSize

  // Not given: vnetSize, subnetSize
  // Given: subnetsPerVnetNumber, vnetNumber
  // regionalSize == vnetNumber * subnetPerVnetNumber * subnetSize?

  // Not given: subnetsPerVnetNumber, subnetSize
  // Given: vnetSize, vnetNumber
  // regionalSize == vnetNumber * subnetPerVnetNumber? * subnetSize

  networkInputs.plan = true;

}

</script>

<template>
  <div class="flex flex-col gap-5">
    <AppHeader />
    <Tabs value="0">
      <TabList>
        <Tab value="0">Plan</Tab>
        <Tab value="1">IP Tools</Tab>
        <Tab value="2">Azure Services</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div class="flex flex-col gap-8 pt-5">
            <!-- Regional Network -->
            <div class="flex flex-col gap-5 w-96">
              <div class="flex gap-8 items-center">
                <div class="text-lg font-medium text-nowrap">Regional Network</div>
                <div class="flex gap-2 items-centers">
                  <div>Range</div>
                  <ToggleSwitch v-model="ipAddressRangeRegional.inputToggle.value" />
                  <div>CIDR</div>
                </div>
              </div>
              <InputGroup v-if="!ipAddressRangeRegional.inputToggle.value" name="size-regional-network-range"
                class="pt-5">
                <InputGroupAddon>
                  <i class="pi pi-globe"></i>
                </InputGroupAddon>
                <FloatLabel>
                  <InputText class="w-min" id="idAddressStart" v-model="ipAddressRangeRegional.start.value"
                    :invalid="ipAddressRangeRegional.start.invalid"
                    @focusout="ipAddressRangeRegional.start.clicked = true;" />
                  <label for="ipAddressStart">Start</label>
                </FloatLabel>
                <FloatLabel>
                  <InputText class="w-min" id="idAddressEnd" v-model="ipAddressRangeRegional.end.value"
                    :invalid="ipAddressRangeRegional.end.invalid"
                    @focusout="ipAddressRangeRegional.end.clicked = true;" />
                  <label for="idAddressEnd">End</label>
                </FloatLabel>
              </InputGroup>
              <InputGroup v-if="ipAddressRangeRegional.inputToggle.value" name="size-regional-network-cidr"
                class="pt-5 w-32">
                <InputGroupAddon>
                  <i class="pi pi-globe"></i>
                </InputGroupAddon>
                <FloatLabel>
                  <InputText class="w-min" id="idAddressCidr" v-model="ipAddressRangeRegional.ipAddress.value"
                    :invalid="ipAddressRangeRegional.ipAddress.invalid"
                    @focusout="ipAddressRangeRegional.ipAddress.clicked = true;" />
                  <label for="idAddressEnd">IP Address</label>
                </FloatLabel>
                <FloatLabel>
                  <Select class="w-min" id="ipAddressMask" v-model="ipAddressRangeRegional.cidr.value"
                    :options="ipAddressRangeRegional.cidr.options" :invalid="ipAddressRangeRegional.cidr.invalid"
                    @focusout="ipAddressRangeRegional.cidr.clicked = true;" />
                  <label for="idAddressEnd">Mask</label>
                </FloatLabel>
              </InputGroup>
            </div>
            <div class="flex gap-8">
              <!-- Number of Virtual Networks -->
              <div class="flex flex-col gap-5 w-min">
                <div class="text-lg font-medium text-nowrap">Number of Virtual Networks</div>
                <InputNumber v-model="networkInputs.numberVirtualNetworks.value" inputId="integeronly" fluid :min="0"
                  showButtons />
              </div>
              <!-- Size of Virtual Network -->
              <div class="flex flex-col gap-5 w-56">
                <div class="text-lg font-medium text-nowrap">Size of Virtual Network</div>
                <InputGroup>
                  <InputNumber v-model="networkInputs.sizeVirtualNetwork.count" inputId="integeronly" fluid :min="0"
                    disabled />
                  <Select class="w-min" v-model="networkInputs.sizeVirtualNetwork.value"
                    :options="networkInputs.sizeVirtualNetwork.options" placeholder="Mask"
                    :invalid="networkInputs.sizeVirtualNetwork.invalid" @focusout="networkInputs.sizeVirtualNetwork.clicked = true;" />
                </InputGroup>
              </div>
            </div>
            <div class="flex gap-8">
              <!-- Number of Subnets per VNET -->
              <div class="flex flex-col gap-5 w-min">
                <div class="text-lg font-medium text-nowrap">Number of Subnets per VNET</div>
                <InputNumber v-model="networkInputs.numberSubnetsPerVirtualNetwork.value" inputId="integeronly" fluid
                  :min="0" showButtons />
              </div>
              <!-- Size of Subnet -->
              <div class="flex flex-col gap-5 w-56">
                <div class="text-lg font-medium text-nowrap">Size of Subnet</div>
                <InputGroup>
                  <InputNumber v-model="networkInputs.sizeSubnet.count" inputId="integeronly" fluid :min="0"
                    disabled />
                  <Select class="w-min" v-model="networkInputs.sizeSubnet.value"
                    :options="networkInputs.sizeSubnet.options" placeholder="Mask"
                    :invalid="networkInputs.sizeSubnet.invalid" @focusout="networkInputs.sizeSubnet.clicked = true;" />
                </InputGroup>
              </div>
            </div>
            <Button class="w-min" label="Plan" :disabled="networkInputs.invalid" @click="planRegionalNetwork()" />
            <div v-if="networkInputs.plan" class="flex flex-col gap-3">
              <div class="text-xl">Results</div>
              <div>
                <div class="text-lg">Regional Network</div>
                <div v-if="!ipAddressRangeRegional.inputToggle.value" class="pl-4">Range: {{ ipAddressRangeRegional.start.value }} - {{ ipAddressRangeRegional.end.value }}</div>
                <div v-else class="pl-4">CIDR: {{ ipAddressRangeRegional.ipAddress.value }}{{ ipAddressRangeRegional.cidr.value }}</div>
              </div>
              <div>
                <div class="text-lg">Number of Virtual Networks</div>
                <div class="pl-4"> {{ networkInputs.numberVirtualNetworks.result }} </div>
              </div>
              <div>
                <div class="text-lg">Size of Virtual Network</div>
                <div class="pl-4"> {{ countToMasks(networkInputs.sizeVirtualNetwork.result) }} </div>
                <div class="pl-4"> {{ networkInputs.sizeVirtualNetwork.result }} </div>
              </div>
              <div>
                <div class="text-lg">Number of Subnets per Virtual Network</div>
                <div class="pl-4"> {{ networkInputs.numberSubnetsPerVirtualNetwork.result }} </div>
              </div>
              <div>
                <div class="text-lg">Size of Subnet</div>
                <div class="pl-4"> {{ networkInputs.sizeSubnet.result }} </div>
                <div class="pl-4"> {{ networkInputs.sizeSubnet.count }} </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div class="md:p-5 flex flex-col gap-3">
            <ConvertIpAddress />
            <CidrToRange />
            <RangeToCidrs />
          </div>
        </TabPanel>
        <TabPanel value="2">
          <AzureServicesTable />
        </TabPanel>
      </TabPanels>

    </Tabs>
  </div>
</template>

<style scoped></style>

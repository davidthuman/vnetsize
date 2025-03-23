<script setup>

const regionIpAddressRange = "";

const numberVirtualNetworks = 0;

const numberSubnets = 0;

const subnetIpSize = 0;

</script>

<template>
  <div class="flex flex-col gap-5">
    <AppHeader />
    <Tabs value="1">
      <TabList>
        <Tab value="0">Plan</Tab>
        <Tab value="1">IP Tools</Tab>
        <Tab value="2">Azure Services</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          Coming Soon.
        </TabPanel>
        <TabPanel value="1">
          <div class="p-5 flex flex-col gap-3">
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

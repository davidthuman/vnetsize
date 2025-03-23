
export function parseIpV4Address(ipAddress) {

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

export function decimalToDotted(decimal) {

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

export function cidrToRange(ipAddress, cidr) {

  const number = parseIpV4Address(ipAddress);

  const count = Math.pow(2, 32 - cidr.substring(1)) - 1;

  const end = number + count;

  return decimalToDotted(end);

}

export function rangeToCidrs(start, end) {

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
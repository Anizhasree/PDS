/* Transaction Processor */
const { TextDecoder } = require("text-encoding/lib/encoding");
const { TransactionHandler } = require("sawtooth-sdk/processor/handler");
const {
  hash,
  writeToStore,
  getProductAddress
} = require("./lib/transactionTp");
const { TransactionProcessor } = require("sawtooth-sdk/processor");
const {
  InvalidTransaction,
  InternalError
} = require("sawtooth-sdk/processor/exceptions");

const FAMILY_NAME = "pds";
const NAMESPACE = hash(FAMILY_NAME).substring(0, 6);
const URL = "tcp://validator:4004";
var decoder = new TextDecoder("utf8");

/* function to add Product data to chain
parameter :
context - validator context object
sender - The Agency which add the new product
sack - The sack id of the product
product - product type [Rice,Wheat, Kerosine]
dop - date of packing
weight - weigth of the product
state - state of Orgin of the product
*/

function addAgency(context, sender, sack, product, weight, dop, state) {
  let product_Address = getProductAddress(sack, product, weight);
  let product_detail = [sender, sack, product, weight, dop, state];
  context.addEvent("Agency/AddProduct", [
    ["data", JSON.stringify(product_detail)]
  ]);
  var Status = "New Product Added";
  context.addReceiptData(Buffer.from(Status, "utf8"));
  return writeToStore(context, product_Address, product_detail);
}

/* function is to verfy the product by Central Department and add details to the chain
parameters :
context - validator context object
senderC : The one who Add the product here is the Central Department
Key - key that is available to the Agent
sackC - sack id
productC - product type [Rice,Wheat, Kerosine]
weightC - product weight
doa -Date of arrival at Department
dop - date of dispatch from the Department
stateC - state to which the product is allocated
*/

function addCentral(
  context,
  senderC,
  sackC,
  productC,
  weightC,
  doa,
  dod,
  stateC
) {
  console.log("Central adding");
  let address = getProductAddress(sackC, productC, weightC);
  console.log("address", address);
  return context.getState([address]).then(function(data) {
    console.log("data", data[address]);
    if (data[address] == null || data[address] == "" || data[address] == []) {
      throw new InvalidTransaction("Invalid Sack id or Product or weight");
    } else {
      let stateJSON = decoder.decode(data[address]);
      let newData = stateJSON + "," + [senderC, doa, dod, stateC].join(",");
      return writeToStore(context, address, newData);
    }
  });
}

/* function is to verfy the product by State Department and add details to the chain
parameters :
context - validator context object
senderS : The one who Add the product here is the States
key - key that is available to the Agent
sackS - sack id
productS - product type [Rice,Wheat, Kerosine]
weightS - product weight
doaS -Date of arrival at State
dopS - date of dispatch from the state
zone - zone to which the product is allocated
*/

function addState(
  context,
  senderS,
  sackS,
  productS,
  weightS,
  doaS,
  dodS,
  zoneS
) {
  console.log("State adding");
  let address = getProductAddress(sackS, productS, weightS);
  console.log("address", address);
  return context.getState([address]).then(function(data) {
    console.log("data", data[address]);
    if (data[address] == null || data[address] == "" || data[address] == []) {
      throw new InvalidTransaction("Invalid Sack id or Product or weight");
    } else {
      let stateJSON = decoder.decode(data[address]);
      let newData = stateJSON + "," + [senderS, doaS, dodS, zoneS].join(",");
      return writeToStore(context, address, newData);
    }
  });
}

/* function is to verfy the product by Zonal Department and add details to the chain
parameters :
context - validator context object
senderZ : The one who Add the product here is the Zones
sackC - sack id
productZ - product type [Rice,Wheat, Kerosine]
weightZ- product weight
doaZ -Date of arrival at State
dodZ- date of dispatch from the state
retailer - retailer to which the product is allocated
*/

function addZone(
  context,
  senderZ,
  sackZ,
  productZ,
  weightZ,
  doaZ,
  dodZ,
  retailer
) {
  console.log("Zone adding");
  let address = getProductAddress(sackZ, productZ, weightZ);
  console.log("address", address);
  return context.getState([address]).then(function(data) {
    console.log("data", data[address]);
    if (data[address] == null || data[address] == "" || data[address] == []) {
      throw new InvalidTransaction("Invalid Sack id or Product or weight");
    } else {
      let stateJSON = decoder.decode(data[address]);
      let newData = stateJSON + "," + [senderZ, doaZ, dodZ, retailer].join(",");
      return writeToStore(context, address, newData);
    }
  });
}
/* function is to delete  product details
parameters :
context - validator context object
Key - key that is available to the retailer
sackC - sack id
productC - product type [Rice,Wheat, Kerosine]
weightC - product weight
      */

function deletePrt(context, sackD, productD, weightD) {
  console.log("Deleting Product");
  let address = getProductAddress(sackD, productD, weightD);
  console.log("address", address);
  return context.deleteState([address]);
}

//transaction handler class

class Product extends TransactionHandler {
  constructor() {
    super(FAMILY_NAME, ["1.0"], [NAMESPACE]);
  }

  //apply function
  apply(transactionProcessRequest, context) {
    let PayloadBytes = decoder.decode(transactionProcessRequest.payload);
    let Payload = PayloadBytes.toString().split(",");
    let action = Payload[0];

    if (action === "Agency Add") {
      return addAgency(
        context,
        Payload[1],
        Payload[2],
        Payload[3],
        Payload[4],
        Payload[5],
        Payload[6]
      );
    } else if (action === "Central Add") {
      return addCentral(
        context,
        Payload[1],
        Payload[2],
        Payload[3],
        Payload[4],
        Payload[5],
        Payload[6],
        Payload[7]
      );
    } else if (action === "State Add") {
      return addState(
        context,
        Payload[1],
        Payload[2],
        Payload[3],
        Payload[4],
        Payload[5],
        Payload[6],
        Payload[7]
      );
    } else if (action === "Zone Add") {
      return addZone(
        context,
        Payload[1],
        Payload[2],
        Payload[3],
        Payload[4],
        Payload[5],
        Payload[6],
        Payload[7]
      );
    } else if (action === "Delete Product") {
      return deletePrt(context, Payload[1], Payload[2], Payload[3]);
    }
    {
      console.log("error");
    }
  }
}
const transactionProcesssor = new TransactionProcessor(URL);
transactionProcesssor.addHandler(new Product());
transactionProcesssor.start();

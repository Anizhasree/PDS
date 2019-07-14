const {createProduct} = require('./lib/processor')
const {getProductAddress} = require('./lib/transaction')
const fetch = require('node-fetch');


//family name
FAMILY_NAME='pds'

// class for product
class Product{

      /* function is to add product by a Agency to chain
      parameters :
      sender : The one who Add the product here its Agency
      Key - key that is available to the Agent
      sack - sack id
      product - product type [Rice,Wheat, Kerosine]
      weight - weight of the product
      dop - date of packing
      state - state of Orgin of the product
      
      */
      agencyAdd(sender,Key,sack,product,weight,dop,state){
        let address = getProductAddress(sack,product,weight)
        let action = "Agency Add"
        console.log(action)
        let payload = [action,sender,sack,product,weight,dop,state].join(',')
        if (sender == "Agency"){
          console.log("payload",payload)
          createProduct(FAMILY_NAME,[address],[address],Key,payload)
        }
        else{
        	console.log('UnAuthorised Agent')
        }
      }

      /* function is to verfy the product by Central Department and add details to the chain
      parameters :
      senderC : The one who Add the product here is the Central Department
      Key - key that is available to the Agent
      sackC - sack id
      productC - product type [Rice,Wheat, Kerosine]
      weightC - product weight
      doa -Date of arrival at Department
      dop - date of dispatch from the Department
      stateC - state to which the product is allocated
      
      */

      centralDept(senderC,key,sackC,productC,weightC,doa,dod,stateC){
         let address = getProductAddress(sackC,productC,weightC)
         let action = "Central Add"
         console.log(action)
         let payload = [action,senderC,sackC,productC,weightC,doa,dod,stateC].join(',')
         if (senderC == "CentralDept"){
           console.log("payload",payload)
           createProduct(FAMILY_NAME,[address],[address],key,payload)
         }
         else{
         	console.log('UnAuthorised Dept')
         }
        }

      /* function is to verfy the product by State Department and add details to the chain
      parameters :
      senderS : The one who Add the product here is the States
      key - key that is available to the Agent
      sackS - sack id
      productS - product type [Rice,Wheat, Kerosine]
      weightS - product weight
      doaS -Date of arrival at State
      dopS - date of dispatch from the state
      zone - zone to which the product is allocated
      
      */

       stateDept(senderS,key,sackS,productS,weightS,doaS,dodS,zoneS){
         let address = getProductAddress(sackS,productS,weightS)
         let action = "State Add"
         console.log(action)
         let payload = [action,senderS,sackS,productS,weightS,doaS,dodS,zoneS].join(',')
           console.log("payload",payload)
           createProduct(FAMILY_NAME,[address],[address],key,payload)
          }

      /* function is to verfy the product by Zonal Department and add details to the chain
      parameters :
      senderZ : The one who Add the product here is the Zones
      sackC - sack id
      productZ - product type [Rice,Wheat, Kerosine]
      weightZ- product weight
      doaZ -Date of arrival at State
      dodZ- date of dispatch from the state
      retailer - retailer to which the product is allocated
      
      */


       zoneDept(senderZ,key,sackZ,productZ,weightZ,doaZ,dodZ,retailer){
         let address = getProductAddress(sackZ,productZ,weightZ)
         let action = "Zone Add"
         console.log(action)
         let payload = [action,senderZ,sackZ,productZ,weightZ,doaZ,dodZ,retailer].join(',')
           console.log("payload",payload)
           createProduct(FAMILY_NAME,[address],[address],key,payload)
       }
      /* function is to delete  product details
      parameters :
      
      Key - key that is available to the retailer
      sackC - sack id
      productC - product type [Rice,Wheat, Kerosine]
      weightC - product weight
      */

       DeleteProduct(key,sackD,productD,weightD){
         let address = getProductAddress(sackD,productD,weightD)
         let action = "Delete Product"
         console.log(action)
         let payload = [action,sackD,productD,weightD].join(',')
           console.log("payload",payload)
           createProduct(FAMILY_NAME,[address],[address],key,payload)
       }

      
/**
 * Get state from the REST API
 * @param {*} address The state address to get
 * @param {*} isQuery Is this an address space query or full address
 */
async getState (address, isQuery) {
  let stateRequest = 'http://rest-api:8008/state';
  if(address) {
    if(isQuery) {
      stateRequest += ('?address=')
    } else {
      stateRequest += ('/address/');
    }
    stateRequest += address;
  }
  let stateResponse = await fetch(stateRequest);
  let stateJSON = await stateResponse.json();
  return stateJSON;
}

}

module.exports = {
  Product
};
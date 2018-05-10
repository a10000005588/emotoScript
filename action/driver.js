
import web3 from '../test';
import ethTx from 'ethereumjs-tx';
/* action */
import * as transaction from './transaction.js';
/* set the default accounts */
import * as config from '../data/config.js';
/* contract address */
import * as contractAddress from '../data/contract.js';

export function setDriver(_driverAddress, _driverName, _credit) {

  let block = web3.eth.getBlock("latest");

  let data = '0x';
  // 取前2-10位（共8位數、省略0x)

  let method = web3.sha3('setDriver(address,string,uint256)').slice(2,10);

  let driverAddress = _driverAddress;
  let driverName = web3.toHex(_driverName);
  let credit = web3.toHex(_credit);
  
  console.log(credit);
  let params =  transaction.to64Bytes(driverAddress.slice(2,)) +
                transaction.to64Bytes(driverName.slice(2,)) +
                transaction.to64Bytes(credit.slice(2,));

  // 將 data 轉成 heximal格式
  data += method + params;
  
  let gasPrice = web3.eth.gasPrice;
  let gasLimit = 1000000;
  let value_ = 0x0;
  let nonce = web3.eth.getTransactionCount(config.account);

  // if gave the wrong address for to... no error pop on the terminal........
  let txInfo = {
      // from: config.account,
      nonce: web3.toHex(nonce),
      gasPrice: web3.toHex(gasPrice),
      gasLimit: web3.toHex(gasLimit),
      to: contractAddress.Driver,
      value: value_,
      data: data,
      chainId: 1
  }

  console.log(txInfo);

  transaction.sendTransaction(txInfo).then(function(txhash) {
    console.log('====setDriver hash====');
    console.log(txhash);
  }).catch(err => {
    console.log("caught: ", err);
  });
}
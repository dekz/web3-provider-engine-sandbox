import * as Web3 from 'web3';
import Web3ProviderEngine = require('web3-provider-engine');

import {
    ledgerEthereumBrowserClientFactoryAsync,
    LedgerSubprovider,
    InjectedWeb3Subprovider,
    RedundantRPCSubprovider
} from '@0xproject/subproviders';

import {promisify} from '@0xproject/utils';
import {ZeroEx} from '0x.js'
import { Web3Provider } from '0x.js/lib/src/types';

let networkId = 42;

declare var personalSignButton: any;
declare var ledgerProviderButton: any;
declare var injectedProviderButton: any;
declare var defaultProviderButton: any;
declare var signZeroExOrderButton: any;
declare var ethSignButton: any;
declare var web3: any;

async function startApp(): Promise<void> {
  var web3: any;
  var engine: Web3ProviderEngine;
  var zeroEx: ZeroEx;

  const injectedWeb3 = (window as any).web3;
  const cachedProvider = injectedWeb3.currentProvider;
  const redundantRPC = new RedundantRPCSubprovider(['https://kovan.infura.io/t5wsc8cautr4kxyygsrs']);
  const msg = '0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0';

  const loadDefaultProvider = (event: any) => {
      console.log('Loading Default provider');
      web3 = injectedWeb3;
      zeroEx = new ZeroEx(web3.currentProvider, {networkId});
  }
  defaultProviderButton.addEventListener('click', loadDefaultProvider);
  loadDefaultProvider(undefined);

  injectedProviderButton.addEventListener('click', (event: any) => {
      console.log('Loading Injected provider');
      engine = new Web3ProviderEngine();
      engine.addProvider(new InjectedWeb3Subprovider(injectedWeb3));
      engine.addProvider(redundantRPC);
      engine.start();
      web3 = new Web3(engine);
      zeroEx = new ZeroEx(web3.currentProvider, {networkId});
  })

  ledgerProviderButton.addEventListener('click', (event: any) => {
      console.log('Loading ledger provider');
      engine = new Web3ProviderEngine();
      const ledgerSubprovider = new LedgerSubprovider({ networkId, ledgerEthereumClientFactoryAsync: ledgerEthereumBrowserClientFactoryAsync });
      engine.addProvider(ledgerSubprovider);
      engine.addProvider(redundantRPC);
      engine.start();
      web3 = new Web3(engine);
      zeroEx = new ZeroEx(web3.currentProvider, {networkId});
  })

  ethSignButton.addEventListener('click', async (event: any) => {
      event.preventDefault()
      const accounts = await promisify<string>(web3.eth.getAccounts)();
      const signData = await promisify<string>(web3.eth.sign)(accounts[0], msg);
      console.log('SIGNED:', signData)
  })

  personalSignButton.addEventListener('click', async (event: any) => {
      event.preventDefault()
      const accounts = await promisify<string>(web3.eth.getAccounts)();
      const signData = await promisify<string>(web3.personal.sign)(msg, accounts[0]);
      console.log('SIGNED:', signData)
  })

  signZeroExOrderButton.addEventListener('click', async (event: any) => {
      event.preventDefault()
      const accounts = await promisify<string>(web3.eth.getAccounts)();
      const signData = await zeroEx.signOrderHashAsync(msg, accounts[0]);
      console.log('SIGNED:', signData)
  })
}

window.addEventListener('load', () => {
  if (typeof web3 !== 'undefined') {
    (window as any).web3 = new Web3(web3.currentProvider);
  } else {
     console.log('web3 is undefined');
  }
  startApp()
})


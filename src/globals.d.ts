declare module 'web3-provider-engine' {
    class Web3ProviderEngine {
          public on(event: string, handler: () => void): void;
          public send(payload: any): void;
          public sendAsync(payload: any, callback: (error: any, response: any) => void): void;
          public addProvider(provider: any): void;
          public start(): void;
          public stop(): void;
        }
    export = Web3ProviderEngine;
}

//declare module 'web3-provider-engine/subproviders/subprovider';
//declare module 'web3-provider-engine/subproviders/rpc';
//
//// web3-provider-engine declarations
//declare class Subprovider {
//    public emitPayload(payload: any): void;
//}
//declare module 'web3-provider-engine/subproviders/subprovider' {
//    export = Subprovider;
//}
//declare class RpcSubprovider {
//    constructor(options: {rpcUrl: string});
//    public handleRequest(payload: any, next: any, end: (err?: Error, data?: any) =>  void): void;
//}
//declare module 'web3-provider-engine/subproviders/rpc' {
//    export = RpcSubprovider;
//}

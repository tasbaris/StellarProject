import { Address, Contract, Networks, SorobanRpc, xdr } from "@stellar/stellar-sdk";
import { signTransaction } from "@/utils/freighter";

export type SorobanConfig = {
    rpcUrl: string;
    networkPassphrase: string;
    contractId: string; // Fill after deploy
};

// TEMP: you will update these from deployment results
export const sorobanConfig: SorobanConfig = {
    rpcUrl: "https://soroban-testnet.stellar.org",
    networkPassphrase: Networks.TESTNET,
    contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || "", // set later
};

export function getServer() {
    return new SorobanRpc.Server(sorobanConfig.rpcUrl, { allowHttp: true });
}

export async function readTotalActions(): Promise<number> {
    const server = getServer();
    const contract = new Contract(sorobanConfig.contractId);
    const res = await server.getContractData({
        contractId: contract.contractId(),
        key: xdr.ScVal.scvSymbol("tot"),
    });
    if (!res?.val) return 0;
    const val = res.val as xdr.ScVal;
    const u32 = (val as any).value?.()["_value"] ?? 0;
    return Number(u32) || 0;
}

// In practice, for complex types you would invoke a simulation call, but we keep minimal here.


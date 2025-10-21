import freighterApi, {
    getAddress,
    isConnected,
    isAllowed,
    requestAccess,
    setAllowed,
    getNetworkDetails,
    signTransaction,
} from "@stellar/freighter-api";

export type ConnectResult = {
    address: string | null;
    error?: string;
};

const STORAGE_KEY = "goodmint.publicKey";

export function getStoredPublicKey(): string | null {
    if (typeof window === "undefined") return null;
    try {
        return window.localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

export function clearStoredPublicKey(): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.removeItem(STORAGE_KEY);
    } catch { }
}

export async function connectFreighter(): Promise<ConnectResult> {
    try {
        // Ensure extension exists
        const connected = await isConnected();
        if (!connected) {
            return { address: null, error: "Freighter not detected" };
        }

        const allowed = await isAllowed();
        if (!allowed) {
            await setAllowed();
        }

        const { address, error } = await requestAccess();
        if (error || !address) {
            return { address: null, error: error ?? "Access denied" };
        }

        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, address);
        }
        return { address };
    } catch (e: any) {
        return { address: null, error: e?.message ?? "Unknown error" };
    }
}

export async function getActivePublicKey(): Promise<string | null> {
    try {
        const { address } = await getAddress();
        if (address) return address;
    } catch { }
    return getStoredPublicKey();
}

export async function getNetwork(): Promise<{
    networkUrl?: string;
    sorobanRpcUrl?: string;
    networkPassphrase?: string;
}> {
    try {
        const details = await getNetworkDetails();
        return details as any;
    } catch {
        return {};
    }
}

export async function disconnectFreighter(): Promise<void> {
    clearStoredPublicKey();
}

export { signTransaction };



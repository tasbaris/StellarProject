import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { getActivePublicKey, disconnectFreighter } from "@/utils/freighter";

type Action = {
    description: string;
    proofUrl?: string;
};

export default function MainPage() {
    const router = useRouter();
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [action, setAction] = useState<Action>({ description: "" });
    const [totalActions, setTotalActions] = useState<number>(0);
    const [lastContributor, setLastContributor] = useState<string>("-");
    const [userImpact, setUserImpact] = useState<number>(0);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            const pk = await getActivePublicKey();
            if (!pk) {
                router.replace("/");
                return;
            }
            setPublicKey(pk);
        })();
    }, [router]);

    const canSubmit = useMemo(() => !!publicKey && action.description.trim().length > 0, [publicKey, action.description]);

    // Placeholder: Contract calls will be wired in integration step
    const refreshStats = async () => {
        // TODO: Replace with real contract reads
        setTotalActions((v) => v);
        setLastContributor((v) => v);
        setUserImpact((v) => v);
    };

    useEffect(() => {
        refreshStats();
    }, []);

    const logAction = async () => {
        if (!canSubmit) return;
        setSubmitting(true);
        try {
            // TODO: Call Soroban contract: log_action(address, description)
            console.log("Submitting action:", action, "by", publicKey);
            // Simulate optimistic UI
            setTotalActions((v) => v + 1);
            setLastContributor(publicKey!);
            setUserImpact((v) => v + 1);
            setAction({ description: "", proofUrl: "" });
        } catch (e) {
            console.error(e);
            alert("Failed to log action");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDisconnect = async () => {
        await disconnectFreighter();
        router.replace("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">GoodMint</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 font-mono">
                                {publicKey?.slice(0, 8)}...{publicKey?.slice(-8)}
                            </div>
                            <button
                                onClick={handleDisconnect}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Log Your Good Deed
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Share your positive impact and earn Impact Tokens on the blockchain
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Action Description *
                                    </label>
                                    <textarea
                                        className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Describe your good deed... (e.g., Kan bağışı, Ağaç dikimi, Çevre temizliği)"
                                        value={action.description}
                                        onChange={(e) => setAction((a) => ({ ...a, description: e.target.value }))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Proof URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="https://example.com/proof"
                                        value={action.proofUrl ?? ""}
                                        onChange={(e) => setAction((a) => ({ ...a, proofUrl: e.target.value }))}
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Add a link to photo, certificate, or other proof of your action
                                    </p>
                                </div>

                                <button
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
                                    onClick={logAction}
                                    disabled={!canSubmit || submitting}
                                >
                                    {submitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging Action...
                                        </div>
                                    ) : (
                                        "Log Action & Earn Tokens"
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Recent Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Recent Actions
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Action logged successfully!</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">You earned 1 Impact Token</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        {/* Impact Tokens */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Your Impact</h3>
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{userImpact}</div>
                            <p className="text-blue-100 text-sm">Impact Tokens Earned</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Actions</h4>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalActions}</div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Contributor</h4>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="text-sm font-mono text-gray-900 dark:text-white break-all">
                                    {lastContributor === "-" ? "No actions yet" : `${lastContributor.slice(0, 8)}...${lastContributor.slice(-8)}`}
                                </div>
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">💡 Tips</h4>
                            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                                    <span>Be specific about your good deed</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                                    <span>Add proof URLs when possible</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                                    <span>Earn 1 token per logged action</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



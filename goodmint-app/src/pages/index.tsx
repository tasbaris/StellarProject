import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connectFreighter, getActivePublicKey, disconnectFreighter } from "@/utils/freighter";

export default function Home() {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const pk = await getActivePublicKey();
      if (pk) setPublicKey(pk);
    })();
  }, []);

  const onConnect = async () => {
    setLoading(true);
    const { address, error } = await connectFreighter();
    setLoading(false);
    if (address) {
      setPublicKey(address);
      router.push("/main");
    } else if (error) {
      console.error(error);
      alert(error);
    }
  };

  const onDisconnect = async () => {
    await disconnectFreighter();
    setPublicKey(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            GoodMint
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Do Good, Earn Tokens
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Log your good deeds on the blockchain and earn Impact Tokens
          </p>
        </div>

        {/* Connection Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          {publicKey ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Wallet Connected
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                  {publicKey}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                  onClick={() => router.push("/main")}
                >
                  Go to App
                </button>
                <button
                  className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-all duration-200"
                  onClick={onDisconnect}
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Connect Your Wallet
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with Freighter to start earning Impact Tokens
                </p>
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
                onClick={onConnect}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </div>
                ) : (
                  "Connect Freighter"
                )}
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Secure blockchain transactions</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Earn tokens for good deeds</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Built on Stellar Soroban</span>
          </div>
        </div>
      </div>
    </div>
  );
}

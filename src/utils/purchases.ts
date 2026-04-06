// react-native-purchases のスタブ
// Expo Go / 開発時はここを使用。本番ビルド時は実際の SDK に差し替える。
const Purchases = {
  configure: (_config: { apiKey: string }) => {},
  getOfferings: async () => ({ current: null }),
  purchasePackage: async (_pkg: any): Promise<any> => {
    throw Object.assign(new Error('Not available in Expo Go'), { userCancelled: false });
  },
  restorePurchases: async () => ({ entitlements: { active: {} as Record<string, any> } }),
};

export default Purchases;

export interface ForSalePartsPreview {
  partImageUrl: string;
  title: string;
  user: {
    uid: string;
    userName: string;
  };
  price: string;
  partListingId: number | string;
}

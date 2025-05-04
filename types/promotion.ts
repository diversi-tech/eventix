export enum RewardType {
  DISCOUNT = 1,
  // Add more types as needed
}

export interface PromotionItem {
  itemCode: string;
  itemType: number;
  isGiftItem: boolean;
}

export interface AdditionalRestrictions {
  isCoupon: boolean;
  giftCount: number;
  isTotal: boolean;
  isActive: boolean;
}

export interface Promotion {
  id: string;
  description: string;
  isWeightedPromo: boolean;
  minQty: number;
  discountedPrice: number;
  discountedPricePerMida: number;
  minNoOfItemOffered: number;
  items: PromotionItem[];
} 
export enum ItemType {
  PRODUCT = 1,
  SERVICE = 2,
  PACKAGE = 3,
  PROMOTION = 4,
  GIFT_CARD = 5,
  DIGITAL = 6,
  FRESH_PRODUCE = 7,
  FROZEN = 8,
  DAIRY = 9,
  MEAT = 10,
  BAKERY = 11,
  BEVERAGE = 12,
  SNACKS = 13,
  HOUSEHOLD = 14,
  PERSONAL_CARE = 15,
  PET = 16
}

export enum UnitType {
  KILOGRAMS = 'קילוגרמים',
  GRAMS = 'גרמים',
  MILLILITERS = 'מיליליטרים',
  UNITS = 'יח\'',
}

export interface SupermarketBranch {
  id: string;
  bikoretNo: number;
  storeType: number;
  name: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface SupermarketInfo {
  chain: string;
  subChain: {
    id: string;
    name: string;
  };
  branch: SupermarketBranch;
}

export interface Item {
  id: string;
  code: string;
  type: ItemType;
  name: string;
  manufacturer: string;
  price: number;
  unitPrice: number;
  quantity: number;
  unitOfMeasure: string;
  unitType: UnitType;
  isWeighted: boolean;
  quantityInPackage?: string;
  supermarket: SupermarketInfo;
  
  // Additional fields
  category?: string;
  subcategory?: string;
  tags?: string[];
  description?: string;
  imageUrl?: string;
} 
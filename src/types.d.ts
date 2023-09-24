// auth

// category
interface ICategory {
  id?: string;
  name: string;
}
// product
interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockCount: number;
  categoryId?: string;
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  quantity: number;
  Category: ICategory;
}

// ----------wishlist-------//
interface IWishlistState {
  wishlist: IProduct[];
}
//-------------cart------------//

interface ICartState {
  cart: IProduct[];
  shippingOption: string;
  shippingCost: number;
  discountCode: string;
  subtotal: number;
  total: number;
  billingAddress: IBillingAddress;
}

interface IBillingAddress {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  city?: string;
  zip?: number;
}

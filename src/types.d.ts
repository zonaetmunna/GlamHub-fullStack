interface ICategory {
  id?: string;
  name: string;
}

interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockCount: number;
  categoryId?: string;
}

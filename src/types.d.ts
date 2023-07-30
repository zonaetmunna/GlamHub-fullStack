interface ICategory {
  id?: string;
  name: string;
}

interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId?: string;
}

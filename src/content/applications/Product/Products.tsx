import { Card } from '@mui/material';
import { useGetAllProductQuery } from 'src/generated';
// import { Product } from 'src/models/product';
import ProductsTable from './ProductsTable';

export interface Product {
  product_id: number;
  product_name: string;
  product_price?: any;
  status: boolean;
}

interface Props {
  products: Product[];
}

function Products({ products }: Props) {

  return (
    <Card>
        < ProductsTable Products={products} />
    </Card>
  );
}

export default Products;

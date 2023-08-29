import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { ProductList } from './components/ProductList/ProductList'
import { Product } from './types/Product'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addProduct, fetchProducts, removeProduct } from './features/products';


function App() {
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    imageUrl: '',
    name: '',
    count: 0,
    size: {
      width: 0,
      height: 0,
    },
    weight: '',
    comments: null,
  });

  const dispatch = useAppDispatch();
  const newProducts = useAppSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const clearFields = () => {
    setProduct(() => ({
      imageUrl: '',
      name: '',
      count: 0,
      size: {
        width: 0,
        height: 0,
      },
      weight: '',
      comments: null,
    }));
  }

  const createNewProduct = useCallback(async (
    productImage: string,
    productName: string,
    productCount: number,
    productWidth: number,
    productHeight: number,
    productWeight: string,
  ) => {
    const newProduct = {
      imageUrl: productImage,
      name: productName,
      count: +productCount,
      size: {
        width: +productWidth,
        height: +productHeight,
      },
      weight: productWeight,
      comments: null,
    }

    try {
      await dispatch(addProduct(newProduct));
    } catch {
      throw new Error('Unable to add a product');
    } finally {
      // clearFields();
    }
  }, [dispatch]);

  const removeChosenProduct = useCallback(async (productId: number) => {
    try {
      await dispatch(removeProduct(productId)); 
    } catch {
      throw new Error('Unable to delete a product');
    }
  }, [dispatch]);

  return (
    <ProductList
      products={newProducts}
      product={product}
      onAddProduct={createNewProduct}
      onRemoveProduct={removeChosenProduct}
      clearFields={clearFields}
    />
  )
}

export default App
import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { ProductList } from './components/ProductList/ProductList'
import { Product } from './types/Product'
import { createProduct, deleteProduct, getProducts } from './api/products';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCount, setProductCount] = useState('');
  const [productWidth, setProductWidth] = useState('');
  const [productHeight, setProductHeight] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [addProductError, setAddProductError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Alphabetically');

  const changeSortBy = (sortValue: string) => {
    setSortBy(sortValue);
  };

  const handleAddProductError = (bool: boolean) => {
    setAddProductError(bool);
  }
  
  const handleProductNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  }
  const handleProductImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductImage(event.target.value);
  }
  const handleProductCountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductCount(event.target.value);
  }
  const handleProductWidthInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductWidth(event.target.value);
  }
  const handleProductHeightInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductHeight(event.target.value);
  }
  const handleProductWeightInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductWeight(event.target.value);
  }
  
  const clearFields = () => {
    setProductName('');
    setProductImage('');
    setProductCount('');
    setProductWidth('');
    setProductHeight('');
    setProductWeight('');
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setAddProductError(false);
    clearFields();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setAddProductError(false);
    clearFields();
  };

  useEffect(() => {
    getProducts()
      .then(productsFromServer => {
        setProducts(productsFromServer);
      })
      .catch((errorFromServer) => {
        throw new Error(errorFromServer);
      });
  }, []);

  const addProduct = useCallback(async (
    productImage: string,
    productName: string,
    productCount: string,
    productWidth: string,
    productHeight: string,
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
      const createdProduct = await createProduct(newProduct);

      setProducts((currentProducts) => [...currentProducts, createdProduct]);
    } catch {
      throw new Error('Unable to add a product');
    } finally {
      setAddProductError(false)
      clearFields();
    }
  }, []);

  const removeProduct = useCallback(async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProducts((currentProducts) => currentProducts.filter(product => (
        product.id !== productId)));
    } catch {
      throw new Error('Unable to delete a product');
    }
  }, []);

  return (
    <ProductList
      products={products}
      productImage={productImage}
      productName={productName}
      productCount={productCount}
      productWidth={productWidth}
      productHeight={productHeight}
      productWeight={productWeight}
      addProductError={addProductError}
      handleModalToggle={handleModalToggle}
      handleClose={handleClose}
      isModalOpen={isModalOpen}
      handleProductNameInput={handleProductNameInput}
      handleProductImageInput={handleProductImageInput}
      handleProductCountInput={handleProductCountInput}
      handleProductWidthInput={handleProductWidthInput}
      handleProductHeightInput={handleProductHeightInput}
      handleProductWeightInput={handleProductWeightInput}
      onAddProduct={addProduct}
      handleAddProductError={handleAddProductError}
      onRemoveProduct={removeProduct}
      sortBy={sortBy}
      changeSortBy={changeSortBy}
    />
  )
}

export default App

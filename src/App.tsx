import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { ProductList } from './components/ProductList/ProductList'
import { Product } from './types/Product'
import { createProduct, deleteProduct, getProducts } from './api/products';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
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
  })

  const handleFieldChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct((prevProduct) => {
      if (fieldName === 'size.width') {
        const numberValue = event.target.value === '' ? 0 : parseInt(event.target.value, 10);
        const newSize = {
          ...prevProduct.size,
          width: numberValue,
        };
  
        return {
          ...prevProduct,
          size: newSize,
        };
      }
      
      if (fieldName === 'size.height') {
        const numberValue = event.target.value === '' ? 0 : parseInt(event.target.value, 10);
        const newSize = {
          ...prevProduct.size,
          height: numberValue,
        };
  
        return {
          ...prevProduct,
          size: newSize,
        };
      }
  
      return {
        ...prevProduct,
        [fieldName]: event.target.value,
      };
    });
  };  

  const [addProductError, setAddProductError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Alphabetically');

  const changeSortBy = (sortValue: string) => {
    setSortBy(sortValue);
  };

  const handleAddProductError = (bool: boolean) => {
    setAddProductError(bool);
  }

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
      product={product}
      addProductError={addProductError}
      handleModalToggle={handleModalToggle}
      handleClose={handleClose}
      isModalOpen={isModalOpen}
      handleFieldChange={handleFieldChange}
      onAddProduct={addProduct}
      handleAddProductError={handleAddProductError}
      onRemoveProduct={removeProduct}
      sortBy={sortBy}
      changeSortBy={changeSortBy}
    />
  )
}

export default App

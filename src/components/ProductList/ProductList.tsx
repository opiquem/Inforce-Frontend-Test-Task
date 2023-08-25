import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Product } from '../../types/Product';
import styles from './ProductList.module.scss';
import { CreateProductModal } from '../CreateProductModal/CreateProductModal';
import { RemoveProductModal } from '../RemoveProductModal/RemoveProductModal';
import { MenuItem, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ProductTable } from '../ProductTable/ProductTable';
import { getSortedProducts, numberCheck, whiteSpaceCheck } from '../../helpers';
import { addButtonStyles, productListTitleStyles } from '../styles/styles';

type Props = {
  products: Product[],
  product: Omit<Product, 'id'>,
  handleFieldChange: (fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onAddProduct: (productImage: string, productName: string, productCount: number, productWidth: number, productHeight: number, productWeight: string, comments: null) => void,
  onRemoveProduct: (productId: number) => void,
  clearFields: () => void,
}

export const ProductList: React.FC<Props> = ({
  products,
  product,
  handleFieldChange,
  onAddProduct,
  onRemoveProduct,
  clearFields
}) => {
  const [isRemoveModalOpen, setRemoveModalOpen] = React.useState(false);
  const [productToRemove, setProductToRemove] = React.useState<Product | null>(null);
  const [addProductError, setAddProductError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Alphabetically');

  const changeSortBy = (sortValue: string) => {
    setSortBy(sortValue);
  };

  const handleAddProductError = (bool: boolean) => {
    setAddProductError(bool);
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

  const handleRemoveModalOpen = (product: Product) => {
    setProductToRemove(product);
    setRemoveModalOpen(true);
  };

  const handleRemoveModalClose = () => {
    setRemoveModalOpen(false);
    setProductToRemove(null);
  };

  const handleSubmit = () => {
    if (
      !numberCheck(product.count.toString()) ||
      !numberCheck(product.size.width.toString()) ||
      !numberCheck(product.size.height.toString()) ||
      whiteSpaceCheck(product.imageUrl) ||
      whiteSpaceCheck(product.name) ||
      whiteSpaceCheck(product.weight)
    ) {
      handleAddProductError(true);
      return;
    }

    onAddProduct(product.imageUrl, product.name, product.count, product.size.width, product.size.height, product.weight, null);
    clearFields();
  };

  function handleSortByChange(event: SelectChangeEvent) {
    changeSortBy(event.target.value);
  }

  const sortedProducts = getSortedProducts(products, sortBy);

  return (
    <div className={styles.productList}>
      <Typography sx={productListTitleStyles} id="modal-modal-title" variant="h3" component="h2">
        Products List
      </Typography>
      <div className={styles.productList__sort}>
        <Select
          value={sortBy}
          onChange={handleSortByChange}
          sx={{ backgroundColor: '#fff' }}
        >
          <MenuItem value={'Alphabetically'}>Alphabetically</MenuItem>
          <MenuItem value={'DESC'}>DESC</MenuItem>
          <MenuItem value={'ASC'}>ASC</MenuItem>
        </Select>
      </div>

      <CreateProductModal
        product={product}
        addProductError={addProductError}
        handleModalToggle={handleModalToggle}
        handleClose={handleClose}
        isModalOpen={isModalOpen}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        onAddProduct={onAddProduct}
      />

      <ProductTable 
        sortedProducts={sortedProducts} 
        handleRemoveModalOpen={handleRemoveModalOpen} 
      />

      <div className={styles.productList__buttons}>
        <Button
          sx={addButtonStyles}
          onClick={handleModalToggle}
        >
          Add a product
        </Button>
      </div>

      <RemoveProductModal
        isOpen={isRemoveModalOpen}
        productName={productToRemove?.name || ''}
        handleClose={handleRemoveModalClose}
        handleConfirm={() => {
          if (productToRemove) {
            onRemoveProduct(productToRemove.id);
          }
          handleRemoveModalClose();
        }}
      />
    </div>
  );
}
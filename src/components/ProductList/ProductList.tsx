import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { Product } from '../../types/Product';
import styles from './ProductList.module.scss';
// import TextField from '@mui/material/TextField';
import { CreateProductModal } from '../CreateProductModal/CreateProductModal';

type Props = {
  products: Product[],
  productImage: string,
  productName: string,
  productCount: string,
  productWidth: string,
  productHeight: string,
  productWeight: string,
  addProductError: boolean,
  handleModalToggle: () => void,
  handleClose: () => void,
  isModalOpen: boolean,
  handleProductNameInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleProductImageInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleProductCountInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleProductWidthInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleProductHeightInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleProductWeightInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onAddProduct: (productImage: string, productName: string, productCount: string, productWidth: string, productHeight: string, productWeight: string, comments: null) => void,
  handleAddProductError: (bool: boolean) => void,
  onRemoveProduct: (productId: number) => void,
}

export const ProductList: React.FC<Props> = ({
  products,
  productImage,
  productName,
  productCount,
  productWidth,
  productHeight,
  productWeight,
  addProductError,
  handleModalToggle,
  handleClose,
  isModalOpen,
  handleProductNameInput,
  handleProductImageInput,
  handleProductCountInput,
  handleProductWidthInput,
  handleProductHeightInput,
  handleProductWeightInput,
  onAddProduct,
  handleAddProductError,
  onRemoveProduct
}) => {

  const handleSubmit = () => {
    const numberCheck = (value: string) => !isNaN(+value) && value !== '';
    const whiteSpaceCheck = (value: string) => typeof value === 'string' && value.trim().length === 0;
  
    if (
      !numberCheck(productCount) ||
      !numberCheck(productWidth) ||
      !numberCheck(productHeight) ||
      whiteSpaceCheck(productImage) ||
      whiteSpaceCheck(productName) ||
      whiteSpaceCheck(productWeight)
    ) {
      handleAddProductError(true);
      return;
    }
  
    onAddProduct(productImage, productName, productCount, productWidth, productHeight, productWeight, null);
  };

  return (
    <div className={styles.productList}>
      <CreateProductModal 
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
         handleSubmit={handleSubmit}
      />

      <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
        <Table sx={{ minWidth: 650, }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Remove product</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.count}</TableCell>
                <TableCell align="right">{`Height: ${product.size.height} Width: ${product.size.width}`}</TableCell>
                <TableCell align="right">{product.weight}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => onRemoveProduct(product.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button sx={{ backgroundColor: '#fff', color: 'black' }}
        onClick={handleModalToggle}
      >
        Add a product
      </Button>
    </div>
  );
}
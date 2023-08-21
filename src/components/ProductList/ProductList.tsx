import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '../../types/Product';
// import { CreateModal } from '../CreateModal/CreateModal';
import styles from './ProductList.module.scss';
import TextField from '@mui/material/TextField';
import { areNumbers, areWhiteSpaces } from '../../helpers';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

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
    if (!areNumbers(productCount, productWidth, productHeight)
      || !areWhiteSpaces(productImage, productName, productWeight)) {
      handleAddProductError(true);
      return;
    }

    onAddProduct(productImage, productName, productCount, productWidth, productHeight, productWeight, null);
  };

  return (
    <div className={styles.productList}>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} id="modal-modal-title" variant="h6" component="h2">
            Add a product
          </Typography>
          <div className={styles.productList__inputs}>
            <TextField
              id="outlined-password-input"
              label="Name"
              type="text"
              value={productName}
              onChange={handleProductNameInput}
              sx={{ width: 170 }}

            />
            <TextField
              id="outlined-password-input"
              label="Image Url"
              type="text"
              sx={{ width: 170 }}
              value={productImage}
              onChange={handleProductImageInput}
            />
            <TextField
              id="outlined-password-input"
              label="Count"
              type="text"
              sx={{ width: 170 }}
              value={productCount}
              onChange={handleProductCountInput}
            />

            <TextField
              id="outlined-password-input"
              label="Width"
              type="text"
              sx={{ width: 170 }}
              value={productWidth}
              onChange={handleProductWidthInput}
            />

            <TextField
              id="outlined-password-input"
              label="Height"
              type="text"
              sx={{ width: 170 }}
              value={productHeight}
              onChange={handleProductHeightInput}
            />

            <TextField
              id="outlined-password-input"
              label="Weight"
              type="text"
              placeholder='Weight'
              sx={{ width: 170 }}
              value={productWeight}
              onChange={handleProductWeightInput}
            />
            <Button
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': {
                  color: '#000',
                  backgroundColor: '#eee',
                },
              }}
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': {
                color: '#000',
                backgroundColor: '#eee',
              },
            }}
              onClick={handleModalToggle}
            >
              Cancel
            </Button>
          </div>
          {addProductError &&
            <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'red' }} id="modal-modal-title" variant="h6" component="h2">
              Error, check your inputs!
            </Typography>
          }
        </Box>
      </Modal>

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
                // onClick={() => setSelectedProduct(product)}
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

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} id="modal-modal-title" variant="h6" component="h2">
            Add a product
          </Typography>

          <Button
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': {
                color: '#000',
                backgroundColor: '#eee',
              },
            }}
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Button sx={{
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': {
              color: '#000',
              backgroundColor: '#eee',
            },
          }}
            onClick={handleModalToggle}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Product } from '../../types/Product';
import styles from './ProductList.module.scss';
import { CreateProductModal } from '../CreateProductModal/CreateProductModal';
import { RemoveProductModal } from '../RemoveProductModal/RemoveProductModal';
import { MenuItem, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  products: Product[],
  product: Omit<Product, 'id'>,
  addProductError: boolean,
  handleModalToggle: () => void,
  handleClose: () => void,
  isModalOpen: boolean,
  handleFieldChange: (fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onAddProduct: (productImage: string, productName: string, productCount: number, productWidth: number, productHeight: number, productWeight: string, comments: null) => void,
  handleAddProductError: (bool: boolean) => void,
  onRemoveProduct: (productId: number) => void,
  sortBy: string,
  changeSortBy: (sortVal: string) => void,
}

export const ProductList: React.FC<Props> = ({
  products,
  product,
  handleFieldChange,
  addProductError,
  handleModalToggle,
  handleClose,
  isModalOpen,
  onAddProduct,
  handleAddProductError,
  onRemoveProduct,
  changeSortBy,
  sortBy
}) => {
  const [isRemoveModalOpen, setRemoveModalOpen] = React.useState(false);
  const [productToRemove, setProductToRemove] = React.useState<Product | null>(null);

  const handleRemoveModalOpen = (product: Product) => {
    setProductToRemove(product);
    setRemoveModalOpen(true);
  };

  const handleRemoveModalClose = () => {
    setRemoveModalOpen(false);
    setProductToRemove(null);
  };

  const handleSubmit = () => {
    const numberCheck = (value: string) => !isNaN(+value) && value !== '';
    const whiteSpaceCheck = (value: string) => typeof value === 'string' && value.trim().length === 0;

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
  };

  function handleSortByChange(event: SelectChangeEvent) {
    changeSortBy(event.target.value);
  }

  function getSortedProducts(
    products: Product[],
    sortBy: string,
  ) {
    const visibleProducts = [...products];

    visibleProducts.sort((prodA, prodB) => {
      switch (sortBy) {
        case 'Alphabetically':
          return prodA.name.localeCompare(prodB.name);

        case 'DESC':
          return prodB.count - prodA.count;

        case 'ASC':
          return prodA.count - prodB.count;

        default:
          return 0;
      }
    });

    return visibleProducts;
  }
  const sortedProducts = getSortedProducts(products, sortBy);

  return (
    <div className={styles.productList}>
      <Typography sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} id="modal-modal-title" variant="h3" component="h2">
        Products List
      </Typography>
      <div className={styles.productList__sort}>
        <Select
          labelId="demo-simple-select-label"
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
            {sortedProducts.map((product) => (
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
                  <Button onClick={() => handleRemoveModalOpen(product)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.productList__buttons}>
        <Button
          sx={{
            backgroundColor: '#eee',
            color: '#000',
            '&:hover': {
              color: '#fff',
              backgroundColor: '#555',
            },
          }}
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
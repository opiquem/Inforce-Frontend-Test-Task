import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Product } from '../../types/Product';
import {  errorStyles, tableStyle } from '../styles/styles';
import { AddForm } from '../AddForm/AddForm';

type Props = {
  product: Omit<Product, 'id'>,
  addProductError: boolean,
  handleModalToggle: () => void,
  handleClose: () => void,
  isModalOpen: boolean,
  handleSubmit: () => void,
  onAddProduct: (productImage: string, productName: string, productCount: number, productWidth: number, productHeight: number, productWeight: string, comments: null) => void
}

export const CreateProductModal: React.FC<Props> = ({
  addProductError,
  handleModalToggle,
  handleClose,
  isModalOpen,
  onAddProduct,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={tableStyle}>
        <Typography sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} id="modal-modal-title" variant="h6" component="h2">
          Add a product
        </Typography>

        <AddForm
          onAddProduct={onAddProduct}
          handleModalToggle={handleModalToggle}
        />

        {addProductError &&
          <Typography sx={errorStyles} variant="h6" component="h2">
            Error, check your inputs!
          </Typography>
        }
      </Box>
    </Modal>
  )
}
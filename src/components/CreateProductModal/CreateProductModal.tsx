import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './CreateProductModal.module.scss';
import { Product } from '../../types/Product';
import { buttonCreateFormStyles, errorStyles, tableStyle } from '../styles/styles';
import { AddInputs } from '../AddInputs/AddInputs';

type Props = {
  product: Omit<Product, 'id'>,
  addProductError: boolean,
  handleModalToggle: () => void,
  handleClose: () => void,
  isModalOpen: boolean,
  handleFieldChange: (fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleSubmit: () => void,
}

export const CreateProductModal: React.FC<Props> = ({
  product,
  addProductError,
  handleModalToggle,
  handleClose,
  isModalOpen,
  handleFieldChange,
  handleSubmit,
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
        <div className={styles.createProductModal__inputs}>

          <AddInputs
            product={product}
            handleFieldChange={handleFieldChange}
          />

          <Button
            sx={buttonCreateFormStyles}
            onClick={handleSubmit}
          >
            Add
          </Button>

          <Button sx={buttonCreateFormStyles}
            onClick={handleModalToggle}
          >
            Cancel
          </Button>
        </div>
        
        {addProductError &&
          <Typography sx={errorStyles} variant="h6" component="h2">
            Error, check your inputs!
          </Typography>
        }
      </Box>
    </Modal>
  )
}
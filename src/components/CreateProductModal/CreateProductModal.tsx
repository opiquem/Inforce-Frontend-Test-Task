import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './CreateProductModal.module.scss';
import { Product } from '../../types/Product';

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

type Props = {
  product: Omit<Product, 'id'>,
  // productImage: string,
  // productName: string,
  // productCount: string,
  // productWidth: string,
  // productHeight: string,
  // productWeight: string,
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
      <Box sx={style}>
        <Typography sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} id="modal-modal-title" variant="h6" component="h2">
          Add a product
        </Typography>
        <div className={styles.createProductModal__inputs}>
          <TextField
            id="outlined-password-input"
            label="Name"
            type="text"
            value={product.name}
            onChange={(event) => handleFieldChange('name', event)}
            sx={{ width: 170 }}
          />
          <TextField
            id="outlined-password-input"
            label="Image Url"
            type="text"
            sx={{ width: 170 }}
            value={product.imageUrl}
            onChange={(event) => handleFieldChange('imageUrl', event)}
          />
          <TextField
            id="outlined-password-input"
            label="Count"
            type="text"
            sx={{ width: 170 }}
            value={product.count}
            onChange={(event) => handleFieldChange('count', event)}
          />

          <TextField
            id="outlined-password-input"
            label="Width"
            type="text"
            sx={{ width: 170 }}
            value={product.size.width}
            onChange={(event) => handleFieldChange('size.width', event)}
          />

          <TextField
            id="outlined-password-input"
            label="Height"
            type="text"
            sx={{ width: 170 }}
            value={product.size.height}
            onChange={(event) => handleFieldChange('size.height', event)}
          />

          <TextField
            id="outlined-password-input"
            label="Weight"
            type="text"
            placeholder='Weight'
            sx={{ width: 170 }}
            value={product.weight}
            onChange={(event) => handleFieldChange('weight', event)}
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
  )
}
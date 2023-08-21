import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import styles from './RemoveProductModal.module.scss';

type RemoveProductModalProps = {
  isOpen: boolean;
  productName: string;
  handleClose: () => void;
  handleConfirm: () => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

export const RemoveProductModal: React.FC<RemoveProductModalProps> = ({
  isOpen,
  productName,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="remove-product-modal"
      aria-describedby="modal-for-removing-product"
    >
      <Box sx={style}>
        <Typography sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} id="modal-modal-title" variant="h6" component="h2">
          Confirm Removal
        </Typography>
        <p id="modal-for-removing-product">
          Are you sure you want to remove the product <strong>{productName}</strong>?
        </p>
        <div className={styles.removeProductModal__buttons}>
          <Button 
            onClick={handleClose}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': {
                color: '#000',
                backgroundColor: '#eee',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': {
                color: '#000',
                backgroundColor: '#eee',
              },
            }}
          >
            Remove
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
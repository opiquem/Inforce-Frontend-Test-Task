import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { buttonCreateFormStyles } from '../styles/styles';
import styles from './AddForm.module.scss';

const addProductShema = yup.object().shape({
  imageUrl: yup.string()
    .min(2, 'Too Short!')
    .required('Image url required'),
  name: yup.string()
    .min(2, 'Too Short!')
    .required('Name required'),
  count: yup.number()
    .integer()
    .nullable()
    .required('Count required'),
  width: yup.number()
    .integer()
    .nullable()
    .required('Width required'),
  height: yup.number()
    .integer()
    .nullable()
    .required('Height required'),
  weight: yup.string()
    .min(2, 'Too Short!')
    .required('Weight required'),
});

type Props = {
  onAddProduct: (productImage: string, productName: string, productCount: number, productWidth: number, productHeight: number, productWeight: string, comments: null) => void,
  handleModalToggle: () => void,
}

export const AddForm: React.FC<Props> = ({ onAddProduct, handleModalToggle }) => {
  const formik = useFormik({
    initialValues: {
      imageUrl: '',
      name: '',
      count: null,
      width: null,
      height: null,
      weight: '',
    },
    validationSchema: addProductShema,
    onSubmit: (values) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onAddProduct(values.imageUrl, values.name, values.count as any, values.width as any, values.height as any, values.weight, null)
    }
  },
  )
  return (
    <form onSubmit={formik.handleSubmit} className={styles.addForm__inputs}>
      <TextField
        fullWidth
        id="imageUrl"
        name="imageUrl"
        label="ImageUrl"
        value={formik.values.imageUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
        helperText={formik.touched.imageUrl && formik.errors.imageUrl}
        sx={{ width: 170 }}
      />

      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        type="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        sx={{ width: 170 }}
      />

      <TextField
        fullWidth
        id="count"
        name="count"
        label="Count"
        type="count"
        value={formik.values.count}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.count && Boolean(formik.errors.count)}
        helperText={formik.touched.count && formik.errors.count}
        sx={{ width: 170 }}
      />

      <TextField
        fullWidth
        id="width"
        name="width"
        label="Width"
        type="width"
        value={formik.values.width}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.width && Boolean(formik.errors.width)}
        helperText={formik.touched.width && formik.errors.width}
        sx={{ width: 170 }}
      />

      <TextField
        fullWidth
        id="height"
        name="height"
        label="Height"
        type="height"
        value={formik.values.height}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.height && Boolean(formik.errors.height)}
        helperText={formik.touched.height && formik.errors.height}
        sx={{ width: 170 }}
      />

      <TextField
        fullWidth
        id="weight"
        name="weight"
        label="Weight"
        type="weight"
        value={formik.values.weight}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.weight && Boolean(formik.errors.weight)}
        helperText={formik.touched.weight && formik.errors.weight}
        sx={{ width: 170 }}
      />

      <Button
        sx={buttonCreateFormStyles}
        type="submit"
      >
        Add
      </Button>

      <Button sx={buttonCreateFormStyles}
        onClick={handleModalToggle}
      >
        Cancel
      </Button>
    </form>
  );
}
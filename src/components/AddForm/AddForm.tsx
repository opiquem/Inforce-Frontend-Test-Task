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
      count: 0,
      width: 0,
      height: 0,
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
      {Object.keys(formik.values).map((property: string) => (
        <TextField
        fullWidth
        id={property}
        name={property}
        label={property}
        value={formik.values[property as keyof typeof formik.values]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[property as keyof typeof formik.touched] && Boolean(formik.errors[property as keyof typeof formik.errors])}
        helperText={formik.touched[property as keyof typeof formik.touched] && formik.errors[property as keyof typeof formik.errors]}
        sx={{ width: 170 }}
      />
      ))}

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

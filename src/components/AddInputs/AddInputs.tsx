import { TextField } from "@mui/material";
import { Input } from "../../types/Inputs";
import { Product } from "../../types/Product";

const inputs: Input[] = [
  {
    id: 1,
    name: 'Name',
    value: 'name',
  },
  {
    id: 2,
    name: 'ImageUrl',
    value: 'imageUrl',
  },
  {
    id: 3,
    name: 'Count',
    value: 'count',
  },
  {
    id: 4,
    name: 'Width',
    value: 'size.width',
  },
  {
    id: 5,
    name: 'Height',
    value: 'size.height',
  },
  {
    id: 6,
    name: 'Weight',
    value: 'weight',
  },
];

type Props = {
  product: Omit<Product, 'id'>,
  handleFieldChange: (fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export const AddInputs: React.FC<Props> = ({ product, handleFieldChange }) => {
  return (
    <>
      {inputs.map(input => (
        <TextField
          key={input.id}
          label={input.name}
          type="text"
          value={product[input.value as keyof Omit<Product, "id">]}
          onChange={(event) => handleFieldChange(input.value, event)}
          sx={{ width: 170 }}
        />
      ))}
    </>
  );
}
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Product } from "../../types/Product";

type Props = {
  sortedProducts: Product[],
  handleRemoveModalOpen: (product: Product) => void,
}

export const ProductTable: React.FC<Props> = ({ 
  sortedProducts, 
  handleRemoveModalOpen,
}) => {
  return (
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
                  <Button onClick={() => handleRemoveModalOpen(product)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}
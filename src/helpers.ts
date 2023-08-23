import { Product } from "./types/Product";

export function getSortedProducts(
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

export const numberCheck = (value: string) => !isNaN(+value) && value !== '';
export const whiteSpaceCheck = (value: string) => typeof value === 'string' && value.trim().length === 0;
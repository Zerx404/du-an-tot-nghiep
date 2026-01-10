import { products } from "../../../mock/products.mock";

export default function ProductsAdmin() {
  return (
    <>
      <h1>Admin Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </>
  );
}

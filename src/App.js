import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

const API_RESPONSE = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

/*
FilterableProductTable
SearchBar
ProductTable
ProductCategoryRow
ProductRow
*/

const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search ..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          value={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        {"  "}
        Only show products in stock
      </label>
    </form>
  );
};
const ProductCategoryRow = ({ category }) => {
  return (
    <tr style={{ fontWeight: "bold" }}>
      <td colSpan={2}>{category}</td>{" "}
    </tr>
  );
};

const ProductRow = ({ product }) => {
  return (
    <tr style={{ color: product.stocked ? "" : "red" }}>
      <td>{product.name}</td> <td>{product.price}</td>
    </tr>
  );
};

const ProductTable = ({ products, filterText, inStockOnly }) => {
  const rows = products
    .filter((product) => {
      if (
        filterText &&
        !product.name.toLowerCase().includes(filterText.toLowerCase())
      ) {
        return false;
      }
      if (inStockOnly && !product.stocked) {
        return false;
      }
      return true;
    })
    .reduce((acc, product, index, originalProducts) => {
      const categoryRow = (
        <ProductCategoryRow
          key={product.category}
          category={product.category}
        />
      );
      const row = <ProductRow key={product.name} product={product} />;
      const newCategory =
        index === 0 ||
        product.category !== originalProducts[index - 1].category;

      if (newCategory) {
        return [...acc, categoryRow, row];
      }
      return [...acc, row];
    }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const FilterableProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
};

function App() {
  return (
    <div>
      <FilterableProductTable products={API_RESPONSE} />
    </div>
  );
}

export default App;

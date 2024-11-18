import React, { useState } from "react";
import './App.css';


const PRODUCTS = [
  {
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Apple",
  },
  {
    category: "Fruits",
    price: "$1",
    stocked: false,
    name: "Pine-apple",
  },
  {
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Garlic",
  },
  {
    category: "Fruits",
    price: "$1",
    stocked: false,
    name: "jack-fruit",
  },
  {
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Dragonfruit",
  },
  {
    category: "Fruits",
    price: "$2",
    stocked: true,
    name: "Passionfruit",
  },
  {
    category: "Vegetables",
    price: "$2",
    stocked: true,
    name: "Spinach",
  },
  {
    category: "Vegetables",
    price: "$2",
    stocked: true,
    name: "Ladies Finger",
  },
  {
    category: "Vegetables",
    price: "$2",
    stocked: false,
    name: "Onion",
  },
  {
    category: "Vegetables",
    price: "$2",
    stocked: true,
    name: "Egg Plant",
  },
  {
    category: "Vegetables",
    price: "$4",
    stocked: false,
    name: "Pumpkin",
  },
  {
    category: "Vegetables",
    price: "$1",
    stocked: true,
    name: "Peas",
  },
];

const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};

const ProductRow = ({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>
      {product.name}
    </span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ProductTable = ({ products, filterText, inStockOnly }) => {
  const rows = [];
  let lastCategory = null;
  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
   if(product.category !== lastCategory){
    rows.push(
    <ProductCategoryRow 
     category={product.category}
     key={product.category}
    />)
   }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );
    lastCategory = product.category;
  });

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

const Search = ({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) => {
  return (
    <form>
      <input
        type='search'
        value={filterText}
        placeholder='search...'
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <div>
      <label>
        <input 
        type='checkbox' 
        checked={inStockOnly}
        onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
      </div>
    </form>
  );
};

const FilterableProductTable = ({ products }) => {
const [filterText, setFilterText] = useState('')
const [inStockOnly, setInStockOnly] = useState(false)

return (
  <div>
      <Search 
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
  )
};

const App = () => {
  return (
    <div>
    
      <FilterableProductTable
        products={PRODUCTS}
        className="container"
      />
    </div>
  );
};

export default App;

import React, { Component } from "react";
import PRODUCTS from "./data/products";

class ProductCategoryRow extends Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends Component {
  render() {
    const rows = [];
    let lastCategory = null;
    const userInput = this.props.userInput;
    const isStockOnly = this.props.isStockOnly;

    this.props.products.forEach(function(product) {
      // Check if product name contains user input
      if (product.name.indexOf(userInput) === -1) {
        return;
      }

      // Check if isStockOnly is true and if product is in stock.
      if (isStockOnly && !product.stocked) {
        return;
      }

      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
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
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.props.handleUserInput(e.target.value);
  }

  onClick(e) {
    this.props.handleCheckBox(e.target.checked);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." onChange={this.onChange} />
        <p>
          <input type="checkbox" onClick={this.onClick} /> Only show products in
          stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = { filterText: "", isStockOnly: false };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.changeIsStock = this.changeIsStock.bind(this);
  }

  handleUserInput(input) {
    this.setState({ filterText: input });
  }

  changeIsStock(isInStock) {
    this.setState({ isStockOnly: isInStock });
  }

  render() {
    return (
      <div>
        <SearchBar
          handleUserInput={this.handleUserInput}
          handleCheckBox={this.changeIsStock}
        />
        <ProductTable
          products={this.props.products}
          userInput={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
        />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return <FilterableProductTable products={PRODUCTS} />;
  }
}

export default App;

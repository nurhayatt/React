import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };
  componentDidMount() {
    this.getProducts(); //yerleşen componentleri kategoriye doldur
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url) //çalıştırıyor
      .then((response) => response.json()) //çalışan yer response jsona dönüştürüyor
      .then((data) => this.setState({ products: data })); //jsona dönen data buraya geliyor
  };
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      alertify.error('Sepetinizde zaten bu ürün var.');
    } else {
      newCart.push({ product: product, quantity: 1 });
      this.setState({ cart: newCart });
      alertify.success(product.productName + ' sepetinize eklendi!', 3);
    }
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(
      (c) => c.product.id !== product.id
    ); /* arraydaki elemanları şarta göre filtreliyor*/
    this.setState({ cart: newCart });
    alertify.error(product.productName + " sepetinizden silindi!", 3);
    
  };
  render() {
    let productInfo = { title: "Ürün Listesi" };
    let categoryInfo = { title: "Kategori" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />{" "}
          {/* sepet naviye gönderiliyor*/}
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props}
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}
                />
                <Route exact path="/cart"  render={(props) => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                     
                    />
                  )}/>
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

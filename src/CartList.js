import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class CartList extends Component {
  renderCart() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>

            <th>Menü</th>
            {/*  <th>Icerik</th>*/}
            <th>Fiyat</th>
            <th>Porsiyon</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td>{cartItem.product.categoryId}</td>
              <td>{cartItem.product.productName}</td>
              {/* <td>{cartItem.product.subMenus}</td>*/}

              <td>{cartItem.product.Price}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <img
                  alt="food"
                  width="128"
                  height="128"
                  src={cartItem.product.image}
                />
              </td>
              <td>
                {" "}
                <Button
                  color="danger"
                  onClick={() => this.props.removeFromCart(cartItem.product)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  render() {
    return <div>{this.renderCart()}</div>;
  }
}

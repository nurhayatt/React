import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class extends Component {
  render() {
    return (
      <div>
        <h4>
          {this.props.info.title}-{this.props.currentCategory}
        </h4>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Menü</th>
              {/* <th>İçerik</th>*/}
              <th>Fiyat</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.productName}</td>
                  {/* <td>{product.subMenus}</td>*/}
                  <td>{product.Price}</td>
                  <td>
                    <img
                      alt="food"
                      width="128"
                      height="128"
                      src={product.image}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => this.props.addToCart(product)}
                      color="info"
                    >
                      Sepete Ekle
                    </Button>
                  </td>
                </tr>
              )) 
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

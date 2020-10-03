import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";


export default class CategoryList extends Component {

state={categories:[],};
componentDidMount()
{
  this.getCategories(); //yerleşen componentleri kategoriye doldur
}
getCategories=()=>{
  fetch("http://localhost:3000/categories")//çalıştırıyor
  .then(response=>response.json())//çalışan yer response jsona dönüştürüyor
  .then(data=>this.setState({categories:data}));;//jsona dönen data buraya geliyor
}

  render() {
    return (
      <div>
        <h4>{this.props.info.title}</h4>
        
        <ListGroup>
            { this.state.categories.map(category=>(
                <ListGroupItem active={category.categoryName===this.props.currentCategory?true:false}
                onClick={()=>this.props.changeCategory(category)}
                key={category.id}>
                    {category.categoryName}</ListGroupItem>
                )) //listenin eleman sayısını döndürüyor döngü gi
                
            }          
        </ListGroup>
       {/* <h4>{this.props.currentCategory}</h4>*/} 
      </div>
    )
          }}
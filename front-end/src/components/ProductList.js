import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:6800/product-list",{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);

    };

    const deleteproduct = async (id) => {
        let result = await fetch(`http://localhost:6800/product/${id}`, {
            method: "Delete"
        });
        result = result.json();
        if (result) {
            getProducts();
            // alert("record is deleted");
        }
    }

    const searchHandle=async(event)=>{
        // console.warn(event.target.value);
        let key=event.target.value;
        let result=await fetch(`http://localhost:6800/search/${key}`);
        result=await result.json();
        if(result)
        {
            setProducts(result);
        }
        else{
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h3>product list is here</h3>
            <input className="search-box" type="text" placeholder='Search'
            onChange={searchHandle} />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>price</li>
                <li>category</li>
                <li>Operation</li>
            </ul>

            {
                products.length>0?products.map((item, index) =>
                    <ul>
                        <li>{index}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={() => deleteproduct(item._id)}>Delete</button> 
                        <Link to={"/update/"+item._id}>update</Link> </li>
                        
                    </ul>
                )
                :
            <h1>no product found</h1>
            }
            
        </div>
    )
}
export default ProductList;
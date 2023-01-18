import React, { useState, useEffect } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:6800/product-list");
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

    return (
        <div className="product-list">
            <h3>product list is here</h3>
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>price</li>
                <li>category</li>
                <li>Operation</li>
            </ul>

            {
                products.map((item, index) =>
                    <ul>
                        <li>{index}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={() => deleteproduct(item._id)}>Delete</button></li>
                    </ul>
                )
            }

        </div>
    )
}
export default ProductList;
import React from "react";

const Addproduct=()=>{
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [category, setCategory] = React.useState("");

     const addProduct= async()=>{
        
            console.warn(name,price,category,company);
            const userId=JSON.parse(localStorage.getItem('user'))._id;
            let result = await fetch("http://localhost:6800/add-product", {
                method: 'post',
                body: JSON.stringify({ name, price, category, company,userId }),
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            console.warn(result);
     }

    return (
        <div className="addproduct">
            <h1>add new products here</h1>
            <input type="text" placeholder="Enter product name" className="inputBox" 
            onChange={(e) => setName(e.target.value)} value={name} />
            <input type="text" placeholder="Enter product price" className="inputBox"
            onChange={(e) => setPrice(e.target.value)} value={price} />
            <input type="text" placeholder="Enter product category" className="inputBox"
            onChange={(e) => setCategory(e.target.value)} value={category} />
            <input type="text" placeholder="Enter product company" className="inputBox"
            onChange={(e) => setCompany(e.target.value)} value={company} />

            <button onClick={addProduct} className="appButton" type="button">Addproduct</button>
        </div>
    )
}

export default Addproduct;
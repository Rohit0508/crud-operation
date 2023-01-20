import React from "react";

const Addproduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [error, setError] = React.useState(false);

    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:6800/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer${JSON.parse(localStorage.getItem('token'))}`
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
            {error && !name && < span className="invalid-input">Enter valid name</span>}
            <input type="text" placeholder="Enter product price" className="inputBox"
                onChange={(e) => setPrice(e.target.value)} value={price} />
            {error && !price && < span className="invalid-input">Enter valid price</span>}
            <input type="text" placeholder="Enter product category" className="inputBox"
                onChange={(e) => setCategory(e.target.value)} value={category} />
            {error && !category && < span className="invalid-input">Enter valid category</span>}
            <input type="text" placeholder="Enter product company" className="inputBox"
                onChange={(e) => setCompany(e.target.value)} value={company} />
            {error && !company && < span className="invalid-input">Enter valid company</span>}

            <button onClick={addProduct} className="appButton" type="button">Addproduct</button>
        </div>
    )
}

export default Addproduct;
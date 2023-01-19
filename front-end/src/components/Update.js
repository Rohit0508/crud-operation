import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Updateproduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [category, setCategory] = React.useState("");
    const params = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        getproductdetails();
    }, [])

    const getproductdetails = async () => {
        // console.warn(params);
        let result = await fetch(`http://localhost:6800/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setCategory(result.category);
        setCompany(result.company);
        setPrice(result.price);
    }

    const updateproduct = async () => {
        console.warn(name, price, category, company);
        let result =await fetch(`http://localhost:6800/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, company, category }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result=await result.json();
        console.warn(result);
        navigate('/');
    }

    return (
        <div className="addproduct">
            <h1>Update product here</h1>
            <input type="text" placeholder="Enter product name" className="inputBox"
                onChange={(e) => setName(e.target.value)} value={name} />

            <input type="text" placeholder="Enter product price" className="inputBox"
                onChange={(e) => setPrice(e.target.value)} value={price} />

            <input type="text" placeholder="Enter product category" className="inputBox"
                onChange={(e) => setCategory(e.target.value)} value={category} />

            <input type="text" placeholder="Enter product company" className="inputBox"
                onChange={(e) => setCompany(e.target.value)} value={company} />


            <button onClick={updateproduct} className="appButton" type="button">Updateproduct</button>
        </div>
    )
}

export default Updateproduct;
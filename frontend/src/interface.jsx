import React, { useState, useEffect } from "react";

const ProductPage = () => {
  const [salesList, setSalesList] = useState([]);
  const [productionList, setProductionList] = useState([]);
  const [inProductionList, setInProductionList] = useState([]);

  useEffect(() => {
    fetch("/api/sales")
      .then((res) => res.json())
      .then((data) => setSalesList(data))
      .catch((error) => console.error(error));
  }, []);

  const handleEditClick = () => {
    // logic to move items from salesList to productionList
    const itemsToMove = salesList.filter((sale) => sale.selected);
    setProductionList([...productionList, ...itemsToMove]);
    setSalesList(salesList.filter((sale) => !sale.selected));

    // API call to save changes
    fetch("/api/production", {
      method: "POST",
      body: JSON.stringify(productionList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => console.error(error));
  };

  const handleSaveClick = () => {
    // logic to save productionList
    const updatedProductionList = productionList.map(product => {
      // Perform logic to update product information based on user input
      return { ...product, updatedAttribute: "new value" };
    });
  
    setProductionList(updatedProductionList);
  
    // API call to save changes
    fetch("/api/production", {
      method: "PUT",
      body: JSON.stringify(updatedProductionList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => console.error(error));
  };
  

  const handleSendClick = () => {
    // logic to move items from productionList to inProductionList
    const itemsToMove = productionList.filter((prod) => prod.selected);
    setInProductionList([...inProductionList, ...itemsToMove]);
    setProductionList(productionList.filter((prod) => !prod.selected));

    // API call to save changes
    fetch("/api/production", {
      method: "DELETE",
      body: JSON.stringify(inProductionList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Sales List</h1>
      <ul>
        {salesList.map((sale) => (
          <li key={sale.id}>
            {sale.productName} - {sale.quantity}
          </li>
        ))}
      </ul>

      <button onClick={handleEditClick}>Edit</button>
      <h1>Production List</h1>
      <ul>
        {productionList.map((product) => (
          <li key={product.id}>
            {product.productName} - {product.quantity}
          </li>
        ))}
      </ul>

      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleSendClick}>Send to In-Production</button>
      <h1>In-Production List</h1>
      <ul>
        {inProductionList.map((inProduction) => (
          <li key={inProduction.id}>
            {inProduction.productName} - {inProduction.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
     

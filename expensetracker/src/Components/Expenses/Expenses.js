import { useEffect, useRef, useState } from "react";
let uniqueIds = [];
const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputref = useRef();

  useEffect(() => {
    async function fetchData() {
      let t = String(localStorage.getItem("email"));
      try {
        const response = await fetch(
          `https://expense-tracker-sharpner-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${t}.json`
        );
        if (response.ok) {
          const data = await response.json();
          for (let key in data) {
            if (!uniqueIds.includes(key)) {
              uniqueIds.push(key);
              let cpy = {
                id: key,
                category: data[key].category,
                description: data[key].description,
                price: data[key].price,
              };
              setExpenses((prev) => [...prev, cpy]);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  async function expenseSubmitHandler(e) {
    e.preventDefault();
    const data = {
      price: priceInputRef.current.value,
      description: descriptionInputRef.current.value,
      category: categoryInputref.current.value,
    };
    try {
      let t = String(localStorage.getItem("email"));
      const response = await fetch(
        `https://expense-tracker-sharpner-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${t}.json`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        alert("Expense Added.");
      }
    } catch (error) {
      console.log(error);
    }

    setExpenses([...expenses, data]);
    priceInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputref.current.value = "";
  }

  return (
    <>
      <section
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          marginLeft: "25%",
          marginTop: "3%",
          height: "250px",
          marginBottom: "3%",
        }}
      >
        <fieldset>
          <legend style={{ fontSize: "2rem", fontWeight: "revert-layer" }}>
            Expense Details
          </legend>
          <form onSubmit={expenseSubmitHandler}>
            <label style={{ marginRight: "10px" }}>Expense Price:</label>
            <input type="number" ref={priceInputRef} />
            <br />
            <br />
            <label>Expense Description:</label>
            <input type="text" ref={descriptionInputRef} />
            <br />
            <br />
            <label>Expense Category:</label>
            <input type="text" ref={categoryInputref} />
            <br />
            <br />
            <button
              type="submit"
              style={{
                color: "white",
                backgroundColor: "black",
                height: "25px",
                marginTop: "3%",
                borderRadius: "10px",
                width: "35%",
                marginLeft: "30%",
              }}
            >
              Add Expense
            </button>
          </form>
        </fieldset>
      </section>
      <section
        style={{
          marginTop: "3%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <table
          style={{
            width: "80%",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>Expense Price</th>
              <th>Expense Description</th>
              <th>Expense Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((ex) => {
              return (
                <tr key={Math.random()}>
                  <td style={{ justifyContent: "center" }}>Rs.{ex.price}</td>
                  <td style={{ justifyContent: "center" }}>{ex.description}</td>
                  <td style={{ justifyContent: "center" }}>{ex.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default Expenses;

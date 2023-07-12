import { useRef, useState } from "react";

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    {
      price: 20,
      description: "study",
      category: "books",
    },
    {
      price: 15,
      description: "Pani Puri",
      category: "food",
    },
  ]);
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputref = useRef();
  function expenseSubmitHandler(e) {
    e.preventDefault();
    const data = {
      price: priceInputRef.current.value,
      description: descriptionInputRef.current.value,
      category: categoryInputref.current.value,
    };
    setExpenses([...expenses, data]);
    priceInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputref.current.value = "";
  }

  return (
    <>
      <section>
        <form onSubmit={expenseSubmitHandler}>
          <label>Expense Price</label>
          <input type="number" ref={priceInputRef} />
          <label>Expense Description</label>
          <input type="text" ref={descriptionInputRef} />
          <label>Expense Category</label>
          <input type="text" ref={categoryInputref} />
          <button type="submit">Add Expense</button>
        </form>
      </section>
      <section>
        <table>
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
                  <td>{ex.price}</td>
                  <td>{ex.description}</td>
                  <td>{ex.category}</td>
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

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../Store/EcpensesSlice";
import { useSelector } from "react-redux";
import DownloadCsv from "../Download/DownloadCsv";
let editRef = "";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputref = useRef();
  const editPrice = useRef();
  const editDescription = useRef();
  const editCategory = useRef();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.themeShow);
  async function fetchData() {
    setExpenses([]);
    let t = String(localStorage.getItem("email"));
    try {
      const response = await fetch(
        `https://expense-tracker-sharpner-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${t}.json`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(expenseActions.emptyExpense());
        for (let key in data) {
          let cpy = {
            id: key,
            category: data[key].category,
            description: data[key].description,
            price: data[key].price,
          };
          setExpenses((prev) => [...prev, cpy]);
          dispatch(expenseActions.addExpense(cpy));
          dispatch(expenseActions.countExpense(cpy.price));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        let d = await response.json();

        const data1 = {
          id: d.name,
          price: priceInputRef.current.value,
          description: descriptionInputRef.current.value,
          category: categoryInputref.current.value,
        };
        setExpenses([...expenses, data1]);

        alert("Expense Added.");
      }
    } catch (error) {
      console.log(error);
    }

    priceInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputref.current.value = "";
  }
  const expenseDeleteHandler = async (e) => {
    try {
      let em = String(localStorage.getItem("email"));
      let id = String(e.target.id);
      console.log(String(e.target.id));
      const response = await fetch(
        `https://expense-tracker-sharpner-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${em}/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("deleted");
        setExpenses([]);
        fetchData();
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const expenseEditHandler = (e) => {
    editRef = String(e.target.value);
    let val = expenses.filter((item) => item.id === e.target.id);

    editRef = String(e.target.id);
    editDescription.current.value = val[0].description;
    editPrice.current.value = val[0].price;
    editCategory.current.value = val[0].category;
  };
  const editSubmitHandler = async (e) => {
    e.preventDefault();
    const dataToUpdate = {
      price: editPrice.current.value,
      description: editDescription.current.value,
      category: editCategory.current.value,
    };
    const response = await fetch(
      `https://expense-tracker-sharpner-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${String(
        localStorage.getItem("email")
      )}/${editRef}.json`,
      {
        method: "PUT",
        body: JSON.stringify(dataToUpdate),
      }
    );
    if (response.ok) {
      fetchData();
      console.log("Edit Successful");
    }
    editPrice.current.value = "";
    editDescription.current.value = "";
    editCategory.current.value = "";
  };
  return (
    <>
      <div
        style={{ backgroundColor: theme ? "grey" : "white", height: "750px" }}
      >
        <section
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            marginLeft: "25%",
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
            width: "90%",
            display: "flex",
            justifyContent: "center",
            marginTop: "3%",
            height: "120px",
            marginLeft: "6.5%",
            marginBottom: "3%",
          }}
        >
          <fieldset>
            <legend
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Edit Here
            </legend>
            <form onSubmit={editSubmitHandler}>
              <label>Expense Price:</label>
              <input
                type="number"
                ref={editPrice}
                style={{ width: "50px", marginRight: "5px" }}
              />
              <label>Expense Description:</label>
              <input
                type="text"
                ref={editDescription}
                style={{ width: "160px", marginRight: "5px" }}
              />
              <label>Expense Category:</label>
              <input
                type="text"
                ref={editCategory}
                style={{ width: "150px" }}
              />
              <br />
              <button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  height: "25px",
                  marginTop: "1.5%",
                  borderRadius: "10px",
                  width: "65px",
                  marginLeft: "45%",
                }}
              >
                Submit
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((ex) => {
                return (
                  <tr key={Math.random()}>
                    <td style={{ justifyContent: "center" }}>Rs.{ex.price}</td>
                    <td style={{ justifyContent: "center" }}>
                      {ex.description}
                    </td>
                    <td style={{ justifyContent: "center" }}>{ex.category}</td>
                    <td>
                      <button
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          height: "25px",
                          borderRadius: "10px",
                          width: "65px",
                        }}
                        id={ex.id}
                        onClick={expenseEditHandler}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          height: "25px",
                          borderRadius: "10px",
                          width: "65px",
                        }}
                        id={ex.id}
                        onClick={expenseDeleteHandler}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <div>
          <DownloadCsv />
        </div>
      </div>
    </>
  );
};
export default Expenses;

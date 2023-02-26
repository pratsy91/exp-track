import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Container,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  getExpense,
  postExpense,
  updateExpense,
} from "../store/Requests";

const Expenses = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeReducer.theme);
  const premium = useSelector((state) => state.premiumReducer.isPremium);
  const categoryRef = useRef();
  const descRef = useRef();
  const moneyRef = useRef();
  const loadedExpenses = useSelector((state) => state.expenseReducer.expenses);
  const [entries, setEntries] = useState([]);
  const [id, setId] = useState("");

  const [update, setUpdate] = useState(false);

  function makeCsv() {
    const headers = ["Category", "Description", "Expenses"];
    const data = [];
    data.push(headers);
    for (let i = 0; i < loadedExpenses.length; i++) {
      data.push([
        loadedExpenses[i].category,
        loadedExpenses[i].description,
        loadedExpenses[i].expense,
      ]);
    }

    return data.map((row) => row.join(",")).join("\n");
  }
  const blob = new Blob([makeCsv()]);
  const link = URL.createObjectURL(blob);

  const updateHandler = () => {
    const inputCategory = categoryRef.current.value;
    const inputdesc = descRef.current.value;
    const inputmoney = moneyRef.current.value;
    console.log(id);
    dispatch(updateExpense(inputCategory, inputdesc, inputmoney, id));
    setEntries(loadedExpenses);
    setUpdate(false);
  };

  const editHandler = (entry) => {
    setUpdate(true);
    setId(entry.id);
    categoryRef.current.value = entry.category;
    moneyRef.current.value = entry.expense;
    descRef.current.value = entry.description;
  };
  const total = loadedExpenses.reduce((total, curr) => {
    return total + parseInt(curr.expense);
  }, 0);

  const deleteHandler = (id) => {
    dispatch(deleteExpense(id));
    setEntries(loadedExpenses);
  };

  useEffect(() => {
    dispatch(getExpense());
    setEntries(loadedExpenses);
  }, [dispatch, loadedExpenses]);

  const submitHandler = (event) => {
    event.preventDefault();
    const inputCategory = categoryRef.current.value;
    const inputdesc = descRef.current.value;
    const inputmoney = moneyRef.current.value;

    dispatch(postExpense(inputCategory, inputdesc, inputmoney));
    setEntries(loadedExpenses);
  };

  return (
    <React.Fragment>
      <Container className="mt-3 justify-content-center">
        <Container className="text-center mt-5">
          <h5
            className={
              theme
                ? "text-center  text-white d-inline"
                : "text-center  text-dark d-inline"
            }
          >
            User Subscription:
          </h5>
          <h5 className={premium ? "text-warning" : "text-info"}>
            {premium ? "Premium" : "Normal"}
          </h5>
        </Container>
        <Card className="w-100" bg={theme ? "dark" : "light"}>
          <h2
            className={
              theme ? "text-center mt-3 text-white" : "text-center mt-3"
            }
          >
            Add Expense
          </h2>
          <Form className="p-5" onSubmit={submitHandler}>
            <Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="number"
                  placeholder="Add Money"
                  ref={moneyRef}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  ref={descRef}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Select ref={categoryRef}>
                  <option>Select Category</option>
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="health">Health</option>
                </Form.Select>
              </Form.Group>
              <Col>
                {update && (
                  <Button
                    variant={theme ? "info" : "dark"}
                    className="offset-1"
                    type="button"
                    onClick={updateHandler}
                  >
                    Update
                  </Button>
                )}

                <Button
                  variant={theme ? "info" : "dark"}
                  className="offset-2"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>

      <Container>
        <Card bg={theme ? "secondary" : "light"} className="mt-5">
          <Card.Header className={theme ? "text-white" : ""}>
            <h3 className="d-inline">Expenses</h3>
            <h3 className="d-inline offset-2">Description</h3>
            <h3 className="d-inline offset-2 ">Category</h3>
          </Card.Header>

          <ListGroup variant="flush">
            {entries.map((entry) => (
              <ListGroup.Item
                key={entry.id}
                className={theme ? "p-0 bg-dark text-white" : "p-0  text-dark"}
              >
                <div className="d-flex justify-content-between mt-2 ">
                  <span>
                    <h4 className="ms-3">&#x20B9;{entry.expense}</h4>
                  </span>
                  <span>
                    <h4>{entry.description}</h4>
                  </span>
                  <span>
                    <h4> {entry.category}</h4>
                  </span>
                  <div>
                    <span>
                      <Button
                        className="m-3"
                        size="lg"
                        onClick={editHandler.bind(null, entry)}
                        variant={theme ? "info" : "dark"}
                      >
                        Edit
                      </Button>
                    </span>
                    <span>
                      <Button
                        type="button"
                        variant="danger"
                        className="m-3"
                        size="lg"
                        onClick={deleteHandler.bind(null, entry.id)}
                      >
                        Delete
                      </Button>
                    </span>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Footer
            className={
              theme
                ? "text-white d-flex justify-content-between"
                : "d-flex justify-content-between"
            }
          >
            <h3 className="d-inline">Total: {total}</h3>
            {premium && (
              <h3 className="d-inline">
                Download:
                <a
                  className="ms-1 me-3 text-decoration-none"
                  href={link}
                  download="expenses.csv"
                >
                  expenses
                </a>
              </h3>
            )}
          </Card.Footer>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Expenses;

import { expenseActions } from "./expenseSlice";
import { premiumActions } from "./premiumslices";
import { userActions } from "./userDetailsilce";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export const postExpense = (cat, desc, money) => {
  return async (dispatch) => {
    const email = localStorage.getItem("email");
    const emailNode = email.replaceAll(".", "");
    console.log("🚀 ~ file: Requests.js:5 ~ return ~ emailNode:", emailNode);
    const sendRequest = async () => {
      const response = await fetch(
        `https://expense-tracker-60426-default-rtdb.firebaseio.com/${emailNode}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expense: money,
            description: desc,
            category: cat,
          }),
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      if (response.ok) {
        dispatch(getExpense());
      }
    } catch (error) {}
  };
};

export const getExpense = () => {
  return async (dispatch) => {
    const email = localStorage.getItem("email");
    const emailNode = email.replaceAll(".", "");
    const sendRequest = async () => {
      const response = await fetch(
        `https://expense-tracker-60426-default-rtdb.firebaseio.com/${emailNode}.json`
      );
      return response;
    };
    try {
      const response = await sendRequest();
      const data = await response.json();

      const loadaedExpenses = [];
      for (const key in data) {
        loadaedExpenses.push({
          id: key,
          expense: data[key].expense,
          description: data[key].description,
          category: data[key].category,
        });
      }
      const total = loadaedExpenses.reduce((total, curr) => {
        return total + parseInt(curr.expense);
      }, 0);
      dispatch(premiumActions.setPremium({ total: total }));
      dispatch(expenseActions.setExpenses({ expenses: loadaedExpenses }));
    } catch (error) {}
  };
};

export const deleteExpense = (id) => {
  return async (dispatch) => {
    const email = localStorage.getItem("email");
    const emailNode = email.replaceAll(".", "");
    const sendRequest = async () => {
      const response = await fetch(
        `https://expense-tracker-60426-default-rtdb.firebaseio.com/${emailNode}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      if (response.ok) {
        dispatch(getExpense());
      }
    } catch (error) {}
  };
};

export const updateExpense = (cat, desc, money, id) => {
  return async (dispatch) => {
    const email = localStorage.getItem("email");
    const emailNode = email.replaceAll(".", "");
    const sendRequest = async () => {
      const response = await fetch(
        `https://expense-tracker-60426-default-rtdb.firebaseio.com/${emailNode}/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expense: money,
            description: desc,
            category: cat,
          }),
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      if (response.ok) {
        dispatch(getExpense());
      }
    } catch (error) {}
  };
};

export const getUserDetails = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const token = getAuthToken();
      console.log("🚀 ~ file: Requests.js:125 ~ sendRequest ~ token:", token);
      const response = fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      const data = await response.json();
      const user = data.users[0];
      dispatch(userActions.setUser({ user: user }));
    } catch (error) {}
  };
};

export const updateUserDetails = (name, url, token) => {
  console.log("🚀 ~ file: Requests.js:154 ~ sendRequest ~ token:", token);
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: url,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      const data = await response.json();
      console.log("🚀 ~ file: Requests.js:174 ~ return ~ data:", data);
      dispatch(getUserDetails());
    } catch (error) {}
  };
};

export const verificationRequest = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      if (response.ok) {
        alert("done");
      }
    } catch (error) {}
  };
};

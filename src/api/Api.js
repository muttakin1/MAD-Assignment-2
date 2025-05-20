import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout } from "../store/authSlice";
const URL = "http://192.168.0.166:3000";

const signUp = async (body) => {
  
  try {
    const response = await fetch(`${URL}/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: "Network or server error." };
  }
};

const signin = async (email, password, dispatch) => {
  const response = await fetch(`${URL}/users/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (result.token) {
    await AsyncStorage.setItem("user", JSON.stringify(result));
    dispatch(login(result));
  }

  return result;
};

const signout = async (dispatch) => {
  try {
    await AsyncStorage.removeItem("user");
    dispatch(logout());
  } catch (e) {
    console.error("Error signing out", e);
  }
};

const updateUser = async (token, order) => {
  try {
    const response = await fetch(`${URL}/users/update`, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const checkAuthStatus = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error fetching user from storage", e);
    return null;
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const getOrderByUser = async (token) => {
  try {
    const response = await fetch(`${URL}/orders/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const newOrder = async (token, order) => {
  try {
    const response = await fetch(`${URL}/orders/neworder`, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (token, order) => {
  console.log(order);
  
  try {
    const response = await fetch(`${URL}/orders/updateorder`, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getCartItems = async (token, product) => {
  try {
    const response = await fetch(`${URL}/cart`, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const syncCartItem = async (token, product) => {
  try {
    const response = await fetch(`${URL}/cart`, {
      method: "Put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  signin,
  checkAuthStatus,
  updateUser,
  getData,
  signout,
  getOrderByUser,
  newOrder,
  updateOrder,
  getCartItems,
  syncCartItem,
  signUp
};

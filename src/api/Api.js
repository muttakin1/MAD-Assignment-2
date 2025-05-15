import AsyncStorage from "@react-native-async-storage/async-storage";
import { login,logout } from "../store/authSlice";
const URL = "http://192.168.0.166:3000";

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
}

const signout = async (dispatch) => {
  try {
    await AsyncStorage.removeItem("user");
    dispatch(logout());
  } catch (e) {
    console.error("Error signing out", e);
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

export { signin, checkAuthStatus ,getData, signout };

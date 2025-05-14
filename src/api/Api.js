import AsyncStorage from "@react-native-async-storage/async-storage";
const URL = "http://192.168.0.166:3000";

const signin = async (email, password) => {
  const response = await fetch(`${URL}/users/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
};

const checkAuthStatus = async () => {
    const user = await getData("user");
    if (user) {
      return user
      
      // User is authenticated
      // Proceed to app content
    } else {
      // User is not authenticated
      // Redirect to login screen
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

export { signin, checkAuthStatus ,getData };

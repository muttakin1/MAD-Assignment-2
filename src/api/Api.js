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
  
  return await response.json(); // ✅ Parse JSON body
};

export { signin };

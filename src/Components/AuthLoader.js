
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setLoaded } from "../store/authSlice";
import { checkAuthStatus } from "../api/Api";

export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const user = await checkAuthStatus();
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(setLoaded());
      }
    };
    loadUser();
  }, []);

  return null;
}

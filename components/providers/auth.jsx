import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // URLからクエリパラメータを解析してトークンを取得
    const query = new URLSearchParams(window.location.search);
    const tokenFromUrl = query.get("token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      localStorage.setItem("authToken", tokenFromUrl); // トークンをlocalStorageに保存
    } else {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("token", token);
      console.log("fecthしよう");

    }
  }, [token]);

  const logout = () => {
    setCurrentUser(null); // ユーザー情報をクリア
    setToken(""); // トークンをクリア
    localStorage.removeItem("authToken"); // localStorageからトークンを削除
  };

  return (
    <AuthContext.Provider
      value={{ token, logout, setToken, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};


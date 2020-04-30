import React, { useRef, useState } from "react";
import fetch from "isomorphic-unfetch";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      //fetch
      const resp = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>login page</h1>
      <input type="text" placeholder="email" ref={emailRef} />
      <hr />
      <input type="text" placeholder="password" ref={passwordRef} />
      <hr />
      <button onClick={handleLogin}>Login</button>
      <hr />
      {message}
    </div>
  );
};

export default Login;

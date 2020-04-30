import React, { useRef, useState } from "react";
import fetch from "isomorphic-unfetch";

const Signup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  const handleSignup = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      //fetch
      const resp = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await resp.json();
      setMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Signup page</h1>
      <input type="text" placeholder="name" ref={nameRef} />
      <hr />
      <input type="text" placeholder="email" ref={emailRef} />
      <hr />
      <input type="text" placeholder="password" ref={passwordRef} />
      <hr />
      <button onClick={handleSignup}>Signup</button>
      <hr />
      {JSON.stringify(message, null, 4)}
    </div>
  );
};

export default Signup;

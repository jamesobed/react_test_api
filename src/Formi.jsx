import { useState, useEffect } from "react";
import axios from "axios";

function Formi() {
  const [data, setData] = useState([]);
  const [posted, setPosted] = useState("");

  const urll = `https://qkf7sxed23.execute-api.us-east-2.amazonaws.com/dev/user`;

  const getData = async () => {
    const response = await axios.get(`${urll}/payment`);
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    setPosted(JSON.stringify(data));

    fetch(`${urll}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Enter your password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      <br />
      <br />
      <br />
      <h1>Comments</h1>
      posted: {posted}
    </>
  );
}

export default Formi;

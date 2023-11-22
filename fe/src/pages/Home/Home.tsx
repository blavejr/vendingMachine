import React, { useEffect } from "react";
import userAPI from "../../api/user";
import { read } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = React.useState<any>(read("user") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div>Home</div>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}

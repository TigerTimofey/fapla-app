import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Welcome from "./components/success/Welcome";

const supabase = createClient(
  "https://ejptakqzjdjnyservufe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcHRha3F6amRqbnlzZXJ2dWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0Njk5MDksImV4cCI6MjAyMjA0NTkwOX0.8THRHyVvP1aDBqa_l5et6cHoPz9VTRK5ZtN1uu7fhds"
);

function Success() {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
          console.log("USER: ", value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    console.log("error", error);
    navigate("/");
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Info-user">
          <h5>{user?.role} user</h5>
          <h6>{user?.email} </h6>
        </div>

        {Object.keys(user).length >= 0 ? (
          <>
            <h1>Success</h1>

            <Welcome user={user} />

            <div className="SignOut-button">
              <Button
                variant="contained"
                color="error"
                onClick={() => signOutUser()}
              >
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1>User is not logged in</h1>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Go to login
            </button>
          </>
        )}
      </header>
    </div>
  );
}
export default Success;

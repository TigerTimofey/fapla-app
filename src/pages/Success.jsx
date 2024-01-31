import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import UserStatus from "./components/userStatusSnackbar/UserStatus";
import SignOut from "./components/userStatusSnackbar/SignOut";
import AddNewLastname from "./components/addFamily/AddNewLastname";

const supabase = createClient(
  "https://ejptakqzjdjnyservufe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcHRha3F6amRqbnlzZXJ2dWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0Njk5MDksImV4cCI6MjAyMjA0NTkwOX0.8THRHyVvP1aDBqa_l5et6cHoPz9VTRK5ZtN1uu7fhds"
);

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  color: "green",
  textAlign: "center",
}));

function Success() {
  const [user, setUser] = React.useState({});
  const [isUserAdmin, setIsUserAdmin] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [familyLastname, setFamilyLastname] = React.useState(null);
  console.log("familyLastname", familyLastname);
  const [familyMember, setFamilyMember] = React.useState(null);
  const [tasks, setTasks] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (user.email === "timofey.babisashvili@gmail.com") {
          setIsUserAdmin(true);
        }
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

  //familyMember

  React.useEffect(() => {
    async function getFamilyLastname() {
      const response = await fetch("/api/lastname");
      const familyLastname = await response.json();

      if (response.ok) {
        setFamilyLastname(familyLastname);
        console.log("familyLastname", familyLastname);
      }
    }
    getFamilyLastname();
  }, []);

  //familyMmember
  React.useEffect(() => {
    async function getFamilyMember() {
      const response = await fetch("/api/families");
      const familyMember = await response.json();

      if (response.ok) {
        setFamilyMember(familyMember);
        console.log("familyMember", familyMember);
      }
    }
    getFamilyMember();
  }, []);

  //task
  React.useEffect(() => {
    async function getTasks() {
      const response = await fetch("/api/tasks");
      const tasks = await response.json();

      if (response.ok) {
        setTasks(tasks);
        console.log("tasks", tasks);
      }
    }
    getTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Div className="Info-user">
          <h6 className="SairaFont">{user?.email} </h6>

          <UserStatus
            user={user}
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            isUserAdmin={isUserAdmin}
          />
        </Div>

        {Object.keys(user).length >= 0 ? (
          <>
            <h1>Family Plan</h1>
            {familyLastname?.length > 0 ? (
              familyLastname.map((fam) => (
                <h6 key={fam._id}> {fam.lastname}</h6>
              ))
            ) : (
              <AddNewLastname />
            )}

            <SignOut signOutUser={signOutUser} />
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

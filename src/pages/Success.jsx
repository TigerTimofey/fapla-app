import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import UserStatus from "./components/userStatusSnackbar/UserStatus";
import SignOut from "./components/userStatusSnackbar/SignOut";
import AddNewLastname from "./components/addFamily/AddNewLastname";

import Paper from "@mui/material/Paper";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

import Swal from "sweetalert2";
import AddFamilyMember from "./components/addFamily/AddMembers/AddFamilyMember";

const supabase = createClient(
  "https://ejptakqzjdjnyservufe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcHRha3F6amRqbnlzZXJ2dWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0Njk5MDksImV4cCI6MjAyMjA0NTkwOX0.8THRHyVvP1aDBqa_l5et6cHoPz9VTRK5ZtN1uu7fhds"
);

const ButtonStyle = styled("div")(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

function Success() {
  const [user, setUser] = React.useState({});
  const [isUserAdmin, setIsUserAdmin] = React.useState(false);

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const [familyLastname, setFamilyLastname] = React.useState({});
  const [idRemoveLastname, setIdRemoveLastname] = React.useState("HUI");

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
  //fam name

  //familyMember

  React.useEffect(() => {
    async function fetchFamilyLastname() {
      const response = await fetch("/api/lastnames");
      const data = await response.json();
      console.log("familyLastname DATA", data);
      if (response.ok) {
        const modifiedData = data.map((item) => ({
          id: item._id,
          famname: item.famname,
          __v: item.__v,
        }));
        setFamilyLastname(modifiedData);
        if (modifiedData.length > 0) {
          const id = modifiedData[0].id;
          console.log("ID:", id);
          setIdRemoveLastname(id);
        }
      }
    }
    fetchFamilyLastname();
  }, []);

  //familyMmember
  // React.useEffect(() => {
  //   async function getFamilyMember() {
  //     const response = await fetch("/api/families");
  //     const familyMember = await response.json();

  //     if (response.ok) {
  //       setFamilyMember(familyMember);
  //       console.log("familyMember", familyMember);
  //     }
  //   }
  //   getFamilyMember();
  // }, []);

  //task
  // React.useEffect(() => {
  //   async function getTasks() {
  //     const response = await fetch("/api/tasks");
  //     const tasks = await response.json();

  //     if (response.ok) {
  //       setTasks(tasks);
  //       console.log("tasks", tasks);
  //     }
  //   }
  //   getTasks();
  //   console.log(tasks);
  // }, []);

  //remove Family
  const handleDeleteFamily = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/lastnames/${idRemoveLastname}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("idRemoveLastname", typeof idRemoveLastname);
        throw new Error("Failed to delete");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error handling deletion:", error);
      Swal.fire("Error", "Failed to delete family", "error");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Paper elevation={8} className="Info-user">
          <UserStatus
            user={user}
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            isUserAdmin={isUserAdmin}
          />
        </Paper>

        {Object.keys(user).length >= 0 ? (
          <>
            {Object.keys(familyLastname).length > 0 ? (
              <>
                <h1 className="Family-name">
                  {" "}
                  <ButtonStyle onClick={handleDeleteFamily}>
                    <HighlightOffRoundedIcon
                      color="warning"
                      sx={{ fontSize: 40 }}
                    />
                  </ButtonStyle>
                  {familyLastname[0]?.famname
                    ? familyLastname[0]?.famname
                    : familyLastname}
                  <AddFamilyMember />
                </h1>
              </>
            ) : (
              <AddNewLastname
                familyLastname={familyLastname}
                setFamilyLastname={setFamilyLastname}
                idRemoveLastname={idRemoveLastname}
                setIdRemoveLastname={setIdRemoveLastname}
              />
            )}

            <SignOut signOutUser={signOutUser} />
          </>
        ) : (
          <>
            <h1>User is not logged in</h1>
            <ButtonStyle
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Go to login
            </ButtonStyle>
          </>
        )}
      </header>
    </div>
  );
}
export default Success;

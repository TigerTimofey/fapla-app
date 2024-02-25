import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import UserStatus from "./components/userStatusSnackbar/UserStatus";
import SignOut from "./components/userStatusSnackbar/SignOut";
import AddNewLastname from "./components/addFamily/AddNewLastname";
import AddFamilyMember from "./components/addFamily/AddMembers/AddFamilyMember";

import Swal from "sweetalert2";

const supaWeb = process.env.REACT_APP_SUPA_WEB;
const supaWebKey = process.env.REACT_APP_SUPA_WEB_KEY;

const supabase = createClient(supaWeb, supaWebKey);

const StyledHeader = styled("header")(({ theme }) => ({
  position: "fixed",
  width: "100%",
  backgroundColor: "#693ca9",
  zIndex: 1000,
}));

const ButtonStyle = styled("div")(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

function Success() {
  const [user, setUser] = React.useState({});
  const [isUserAdmin, setIsUserAdmin] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [familyLastname, setFamilyLastname] = React.useState({});
  const [idRemoveLastname, setIdRemoveLastname] = React.useState("");
  const [familyMembers, setFamilyMembers] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (user?.email === "timofey.babisashvili@gmail.com") {
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
  const fetchFamilyLastname = async () => {
    const response = await fetch("/api/lastnames");
    const data = await response.json();
    if (response.ok) {
      const modifiedData = data.map((item) => ({
        id: item._id,
        famname: item.famname,
        __v: item.__v,
      }));
      setFamilyLastname(modifiedData);
      if (modifiedData.length > 0) {
        const id = modifiedData[0].id;
        setIdRemoveLastname(id);
      }
    }
  };
  React.useEffect(() => {
    fetchFamilyLastname();
  }, []);

  const handleChangeFamily = async (id) => {
    try {
      const { value: newFamname } = await Swal.fire({
        title: "Enter New Name",
        input: "text",
        inputPlaceholder: "Enter new name",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter a new name";
          }
        },
      });

      if (newFamname) {
        const response = await fetch(
          `http://localhost:4000/api/lastnames/${idRemoveLastname}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ famname: newFamname }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update");
        }

        const updatedFamilyLastname = familyLastname.map((item) =>
          item.id === id ? { ...item, famname: newFamname } : item
        );

        setFamilyLastname(updatedFamilyLastname);
        fetchFamilyLastname();
      }
    } catch (error) {
      console.error("Error handling update:", error);
      Swal.fire("Error", "Failed to update family member", "error");
    }
  };

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
        {Object.keys(user).length >= 0 ? (
          <>
            {Object.keys(familyLastname).length > 0 ? (
              <>
                <StyledHeader
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  className="Family-name"
                >
                  {familyLastname[0]?.famname
                    ? familyLastname[0]?.famname
                    : familyLastname}
                  <StyledSpeedDial
                    ariaLabel="SpeedDial playground example"
                    hidden={false}
                    icon={<SpeedDialIcon />}
                    direction="right"
                    FabProps={{
                      sx: {
                        bgcolor: "secondary.main",
                        "&:hover": {
                          bgcolor: "error.main",
                        },
                        width: "34px",
                        height: "24px",
                      },
                    }}
                  >
                    {" "}
                    <SpeedDialAction
                      icon={<ChangeCircleIcon />}
                      tooltipTitle="Change Name"
                      onClick={handleChangeFamily}
                    />{" "}
                    <SpeedDialAction
                      icon={<DeleteForeverIcon />}
                      tooltipTitle="Remove Member"
                      onClick={handleDeleteFamily}
                    />
                  </StyledSpeedDial>
                  <div className="SignOut-button">
                    <Paper elevation={8}>
                      <UserStatus
                        user={user}
                        openSnackBar={openSnackBar}
                        setOpenSnackBar={setOpenSnackBar}
                        isUserAdmin={isUserAdmin}
                      />
                    </Paper>
                    <SignOut signOutUser={signOutUser} />
                  </div>{" "}
                </StyledHeader>

                <AddFamilyMember
                  familyMembers={familyMembers}
                  setFamilyMembers={setFamilyMembers}
                />
              </>
            ) : (
              <>
                <AddNewLastname
                  familyLastname={familyLastname}
                  setFamilyLastname={setFamilyLastname}
                  idRemoveLastname={idRemoveLastname}
                  setIdRemoveLastname={setIdRemoveLastname}
                />
                <div className="SignOut-button">
                  <Paper elevation={8}>
                    <UserStatus
                      user={user}
                      openSnackBar={openSnackBar}
                      setOpenSnackBar={setOpenSnackBar}
                      isUserAdmin={isUserAdmin}
                    />
                  </Paper>
                  <SignOut signOutUser={signOutUser} />
                </div>
              </>
            )}
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

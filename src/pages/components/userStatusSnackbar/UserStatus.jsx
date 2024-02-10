import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Fingerprint from "@mui/icons-material/Fingerprint";

export default function UserStatus({
  openSnackBar,
  setOpenSnackBar,
  user,
  isUserAdmin,
}) {
  const dateObject = new Date(user?.created_at);
  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const year = dateObject.getUTCFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <div>
      <Button
        color="secondary"
        size="large"
        onClick={() => {
          setOpenSnackBar(true);
        }}
      >
        <Fingerprint />
      </Button>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", textAlign: "center" }}
        >
          {user?.role} user
          <br /> <br />
          {user?.email}
          <br />
          Created {formattedDate}
          <br />
          Role: {isUserAdmin ? `Admin` : `User`}
        </Alert>
      </Snackbar>
    </div>
  );
}

import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

function SignOut({ signOutUser }) {
  return (
    <Button
      sx={{ marginLeft: "10px" }}
      variant="contained"
      color="error"
      onClick={() => signOutUser()}
    >
      <LogoutIcon />
    </Button>
  );
}
export default SignOut;

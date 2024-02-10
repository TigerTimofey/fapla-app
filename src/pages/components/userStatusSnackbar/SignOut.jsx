import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

function SignOut({ signOutUser }) {
  return (
    <div className="SignOut-button">
      <Button variant="contained" color="error" onClick={() => signOutUser()}>
        <LogoutIcon />
      </Button>
    </div>
  );
}
export default SignOut;

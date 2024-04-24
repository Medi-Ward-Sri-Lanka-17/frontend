import { Avatar, Badge, Box, Grid, IconButton } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = (props) => {
  const navigate = useNavigate();
  //   //for set the number of notifications
  //   // const [numberOfNotifications, setNumberOfNotifications] = useState(0)

  //   //get auth context and get details from authContext

  const [imgUrl,setImgUrl]=useState(null)

  function dpLoad(data){
    if(data==null){
      setImgUrl("default-avatar.jpg")
    }else{
      setImgUrl(props.proImgUrl)
    }
    console.log(imgUrl)
  }

  useEffect(()=>{
    console.log(props.proImgUrl)
    dpLoad(props.proImgUrl);
  })



  const handleOnClick = (event) => {
    navigate("/profile");
  };

  return (
    <div>
      <Box
        component="div"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          "& .MuiButton-root": { m: 1 },
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "10px",
        }}
        noValidate
        autoComplete="off"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h3 style={{ color: "#243E4F" }}>{props.title}</h3>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton aria-label="notifications" sx={{ marginRight: "40px" }}>
              <Badge badgeContent={4} color="error">
                <NotificationsActiveIcon
                  style={{ color: "#243E4F", fontSize: 35 }}
                />
              </Badge>
            </IconButton>

            {/* Updated Avatar to display the profile picture */}
            <Avatar
              alt={props.title} // Use the title as alt text
              src={imgUrl} // Set the src attribute to the profile picture
              sx={{ bgcolor: deepOrange[500], cursor: "pointer" }}
              //navigate to the profile page
              onClick={handleOnClick}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Header;

// import { faPlane } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./header.css";

// const Home = () => {
//   return (
//     <div>
//       <div className="header">
//         <div className="headerList">
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faPlane} />
//             <span>FlightItem 1</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faPlane} />
//             <span>FlightItem 2</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faPlane} />
//             <span>FlightItem 3</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import "./header.css";

const Header = () => {
  // You can manage the active state with React state hooks if necessary
  const [activeItem, setActiveItem] = React.useState("FlightItem 1");

  // Style for the icons and text
  const iconStyle = (isActive) => ({
    marginRight: "8px", // Adjust the space between the icon and text if needed
    fontSize: "1.25rem", // Adjust icon size as needed
    color: isActive ? "white" : "gray",
  });

  const textStyle = (isActive) => ({
    fontSize: "1rem", // Adjust text size as needed
    color: isActive ? "white" : "gray",
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0f0f0f" }}>
      <Toolbar variant="dense">
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {[1, 2, 3].map((item) => {
            const itemName = `FlightItem ${item}`;
            const isActive = activeItem === itemName;
            return (
              <IconButton
                key={itemName}
                onClick={() => setActiveItem(itemName)}
                sx={{
                  padding: "10px",
                  color: isActive ? "white" : "gray",
                }}
              >
                <FontAwesomeIcon icon={faPlane} style={iconStyle(isActive)} />
                <span style={textStyle(isActive)}>{itemName}</span>
              </IconButton>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

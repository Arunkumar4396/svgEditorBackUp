import React from "react";
import classes from "./Header.module.css";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.headerBox}>
        <div className={classes.Icon}>
          <FormatColorFillIcon />
        </div>
        <div className={classes.title}>SVG Color Editor BACKUP</div>
      </div>
    </div>
  );
};

export default Header;

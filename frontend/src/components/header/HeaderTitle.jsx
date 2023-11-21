import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

/**
 * HeaderTitle component displays a title and subtitle in a styled box.
 *
 * @param {Object} props
 * @param {string} props.title - The main title text.
 * @param {string} props.subtitle - The subtitle text.
 */
const HeaderTitle = React.memo(({ title, subtitle }) => {
  // Define the styles for the container and text elements.
  const styles = {
    container: {
      textAlign: "left",
      padding: "25px",
      backgroundColor: "#0f0f0f",
    },
    title: {
      color: "#ffffff",
    },
    subtitle: {
      color: "#cccccc",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h5" component="div" sx={styles.title}>
        {title}
      </Typography>
      <Typography variant="subtitle1" component="div" sx={styles.subtitle}>
        {subtitle}
      </Typography>
    </Box>
  );
});

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default HeaderTitle;

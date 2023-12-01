import React from "react";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

/**
 * FlightIconButton component for displaying an icon button with custom styling.
 *
 * @param {Object} props
 * @param {string} props.icon - The icon to display.
 * @param {string} props.label - The text label for the button.
 * @param {boolean} props.isActive - Flag indicating if the button is active.
 * @param {boolean} props.isHovered - Flag indicating if the button is being hovered.
 * @param {Function} props.onClick - Click handler for the button.
 * @param {Function} props.onMouseEnter - Mouse enter handler for the button.
 * @param {Function} props.onMouseLeave - Mouse leave handler for the button.
 */
const FlightIconButton = React.memo(({ icon, label, isActive, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  // Define the style for the icon.
  const iconStyle = {
    marginRight: "8px",
    fontSize: "1.25rem",
    color: isActive ? "white" : isHovered ? "white" : "gray",
  };

  // Define the style for the text.
  const textStyle = {
    fontSize: "1rem",
    color: isActive ? "white" : isHovered ? "white" : "gray",
  };

  return (
    <IconButton
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        padding: "10px",
        color: isActive ? "white" : isHovered ? "white" : "gray",
      }}
    >
      <FontAwesomeIcon icon={icon} style={iconStyle} />
      <span style={textStyle}>{label}</span>
    </IconButton>
  );
});

FlightIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default FlightIconButton;
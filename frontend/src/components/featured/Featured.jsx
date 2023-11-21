import React from "react";
import "./featured.css";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

// Importing images
import yycImage from "../../assets/featured_images/yyc.jpg";
import yvrImage from "../../assets/featured_images/yvr.jpg";
import yyzImage from "../../assets/featured_images/yyz.jpg";
import yegImage from "../../assets/featured_images/yeg.jpg";

// Array of featured items
const featuredItems = [
  {
    id: 1,
    title: "Calgary",
    properties: "Alberta",
    image: yycImage,
    altText: "Calgary",
  },
  {
    id: 2,
    title: "Toronto",
    properties: "Ontario",
    image: yvrImage,
    altText: "Toronto",
  },
  {
    id: 3,
    title: "Vancouver",
    properties: "BC",
    image: yyzImage,
    altText: "Vancouver",
  },
  {
    id: 4,
    title: "Edmonton",
    properties: "AB",
    image: yegImage,
    altText: "Alberta",
  },
];

const Featured = () => {
  return (
    <Grid container spacing={2} className="featured">
      {featuredItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <div className="featuredItem">
            <CardMedia
              component="img"
              image={item.image}
              alt={item.altText}
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{item.title}</h1>
              <h2>{item.properties}</h2>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Featured;

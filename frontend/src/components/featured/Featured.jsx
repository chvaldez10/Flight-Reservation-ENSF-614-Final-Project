import React from "react";
import "./featured.css";
// import CardMedia from "@mui/material/CardMedia";
// import Grid from "@mui/material/Grid";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

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
    id: 4,
    title: "Edmonton",
    properties: "Alberta",
    image: yegImage,
    altText: "Alberta",
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
    properties: "British Columbia",
    image: yyzImage,
    altText: "Vancouver",
  },
];

const Featured = () => {
  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        className="featuredHeading"
        gutterBottom
      >
        Featured Cities
      </Typography>

      <Grid container spacing={2} justifyContent="center" className="featured">
        {featuredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card className="featuredItem">
              <CardMedia
                component="img"
                image={item.image}
                alt={item.altText}
                className="featuredImg"
                sx={{ height: "140px", objectFit: "cover", marginTop: "16px" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="featuredTitle"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="featuredProperties"
                >
                  {item.properties}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Featured;

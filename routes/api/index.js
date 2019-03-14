const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./google");

// Book Routes
router.use("/books", bookRoutes);

//  Google Routes
router.use("/google", googleRoutes);

// For anything else, render the html page
router.use((res, req) =>
  res.sendFile(path.join(_dirname, "../../client/build/index.html"))
);

module.exports = router;

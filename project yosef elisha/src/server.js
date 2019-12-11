const express = require("express");
const app = express()
const PORT = 8080
const routeHelper = require("./incomes_outcomes");
const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));
// --- used for json in body
app.use(express.json());


//read incomes
app.post("/incomes", (req, res) => {
  routeHelper.handleCreate(req, res);
});

//outcomes
app.get("/outcomes", (req, res) => {
  res.json(routeHelper.handleGetOutcomes());
});

// --- read
app.get("/incomes", (req, res) => {
  res.json(routeHelper.handleGetIncomes());
});

app.get("/balance", (req, res) => {
  res.json(routeHelper.getBalance());
});



// delete incomes
app.delete("/dell/:id", (req, res) => {
  res.json(routeHelper.handleDelete(req, res));
});



//Page not found 
app.get("/*", (req, res) => {
  res.send(`<html lang=en>

  <title>Error 404 (Not Found)!!1</title>
  <style>
    *{margin:0;padding:0}html,code{font:15px/22px arial,sans-serif}html{background:#fff;color:#222;padding:15px}body{margin:7% auto 0;max-width:390px;min-height:180px;padding:30px 0 15px}* > body{background:url(//www.google.com/images/errors/robot.png) 100% 5px no-repeat;padding-right:205px}p{margin:11px 0 22px;overflow:hidden}ins{color:#777;text-decoration:none}a img{border:0}@media screen and (max-width:772px){body{background:none;margin-top:0;max-width:none;padding-right:0}}#logo{background:url(//www.google.com/images/branding/googlelogo/1x/googlelogo_color_150x54dp.png) no-repeat;margin-left:-5px}@media only screen and (min-resolution:192dpi){#logo{background:url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) no-repeat 0% 0%/100% 100%;-moz-border-image:url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) 0}}@media only screen and (-webkit-min-device-pixel-ratio:2){#logo{background:url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) no-repeat;-webkit-background-size:100% 100%}}#logo{display:inline-block;height:54px;width:150px}
  
  </style>
  <a style="color:green;" href=//localhost:8080/><span>חזור לדף הקודם</span></a>
  <h1 style="color:Tomato;">שגיאה דף אינטרנט לא נמצא </h1>
  <h2> <mark> 404</mark></h2>
`);
});



app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});












async function displayHomePage(req, res) {
  console.log("Home page displayed console message!");
  res.send("Home page displayed!");
}

module.exports = displayHomePage;
const express = require("express")
const app = express()
const axios = require('axios')

const PORT = process.env.PORT || 8080;
app.use(express.json())
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "*")
	next()
})

app.use("/", (express.static("../Public")))

const headers = {
  "Content-Type": "application/json",
  "apikey": "7dc99410f8d445c680b9f9d17b67024c",
  // "workspace": "YOUR_WORKSPACE_ID"
}

async function shorten(url){
  let endpoint = "https://api.rebrandly.com/v1/links";
  let linkRequest = {
    destination: url,
    domain: { fullName: "rebrand.ly" }
    //, slashtag: "A_NEW_SLASHTAG"
    //, title: "Rebrandly YouTube channel"
	}
  const apiCall = {
    method: 'post',
    url: endpoint,
    data: linkRequest,
    headers: headers
  }
  let apiResponse = await axios(apiCall);
  let link = apiResponse.data;
  return link;
}

// let shortUrl = await shorten("https://www.youtube.com/channel/UCHK4HD0ltu1-I212icLPt3g");
// console.log(shortUrl);


app.get("/bitly", (req, res) => {
	console.log("Request received")
	let URL = req.headers["url"]
	shorten(URL).then((data) => {
		res.send(data)
	}).catch((error) => {
		res.send({"error": "Invalid url"})
	})
})


app.listen(PORT, () => {
	console.log(`App Listening on port ${PORT}`)
})
const fetch = require("node-fetch")
const url = require("url")

module.exports = {
 getBreweries: async (req, res, next) => {
  try {
   const parsedUrl = url.parse(req.url, true)

   const query = parsedUrl.query.query

   var response;

   if (query === undefined) {
    response = await fetch("https://api.openbrewerydb.org/breweries")
   } else {
    response = await fetch(
     `https://api.openbrewerydb.org/breweries/search?query=${query}`
    )
   }

   const breweries = await response.json()

   res.status(200).json({ status: "success", data: breweries })
  } catch (error) {
   res.status(500).json({ status: "error", data: error })
   next(error)
  }
 },
}

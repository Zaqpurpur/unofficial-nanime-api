const express = require("express")
const axios = require("axios")
const jsdom = require("jsdom")

const { JSDOM } = jsdom

const router = express.Router()

const parseApi = async (url) => {
  const nanime = await axios.get(url)
  
  let breakpoint = []
  
  const dom = new JSDOM(nanime.data)
  
  dom.window.document.querySelectorAll(".col-sm-3").forEach((dt, id) => {
    
    //breakdown
    const url = dt.querySelector("a").getAttribute("href")
    const title = dt.querySelector("h3.post-title").getAttribute("title")
    const episode = dt.querySelector("div.episode").querySelector("div.label.btn-danger").textContent
    const year = dt.querySelector("div.status").querySelectorAll("a.label.btn-primary")[0].getAttribute("href")
    const yearDisplay = dt.querySelector("div.status").querySelectorAll("a.label.btn-primary")[0].getAttribute("href").slice(25)
    const status = dt.querySelector("div.status").querySelectorAll("a.label.btn-primary")[1].getAttribute("href")
    const statusDisplay = dt.querySelector("div.status").querySelectorAll("a.label.btn-primary")[1].getAttribute("href").slice(23)
    const poster = dt.querySelector("a").querySelector("div.poster").querySelector("img").getAttribute("data-lazy-src")
    
    //push to empty array
    breakpoint.push({ 
      id, title, url, episode, year, yearDisplay, status, statusDisplay, poster
    })
  })
  return breakpoint
}

router.get("/:id", (req, res) => {
  const url = "https://nanime.biz/page/" + req.params.id
  try{
  parseApi(url)
    .then(nanime => {
      res.send({ api: nanime })
    })
  }
  catch(err){
    console.error(err)
    res.status(400).json({ error: "something went wrong"})
  }
})

module.exports = router
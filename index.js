'user strict'
let debug   = require('debug')('http'),
    express = require('express'),
    fs      = require('fs'),
    app     = express()

app.use(express.static(__dirname + '/public'))
app.get('/', (_, res) => {
    let out = ""

    out += `<html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><meta content="ie=edge"http-equiv=X-UA-Compatible><title>MineVN Museum</title><style>*{font-family:Helvetica,Arial,sans-serif}body{background-color:#eee}.hello{opacity:1!important}.full{position:fixed;left:0;top:0;width:100%;height:100%;z-index:1}.full .content{background-color:rgba(0,0,0,.75)!important;height:100%;width:100%;display:grid}.full .content img{left:50%;transform:translate3d(0,0,0);animation:zoomin 1s ease;max-width:100%;max-height:100%;margin:auto}.byebye{opacity:0}.byebye:hover{transform:scale(.2)!important}.gallery{display:grid;grid-column-gap:8px;grid-row-gap:8px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));grid-auto-rows:8px}.gallery img{max-width:100%;border-radius:8px;box-shadow:0 0 16px #333;transition:all 1.5s ease}.gallery img:hover{box-shadow:0 0 32px #333}.gallery .content{padding:4px}.gallery .gallery-item{transition:grid-row-start .3s linear;transition:transform .3s ease;transition:all .5s ease;cursor:pointer}.gallery .gallery-item:hover{transform:scale(1.025)}@media (max-width:600px){.gallery{grid-template-columns:repeat(auto-fill,minmax(30%,1fr))}}@media (max-width:400px){.gallery{grid-template-columns:repeat(auto-fill,minmax(50%,1fr))}}</style><h1>MineVN Museum</h1><div class="gallery" id="gallery">`
    for (const f of fs.readdirSync(`${__dirname}/public/images`))
        out += `<div class="gallery-item"><div class="content"><img src="./images/${f}" alt=""></div></div>`
    out += `<script>var gallery=document.querySelector("#gallery"),getVal=function(e,l){return parseInt(window.getComputedStyle(e).getPropertyValue(l))},getHeight=function(e){return e.querySelector(".content").getBoundingClientRect().height},resizeAll=function(){var l=getVal(gallery,"grid-auto-rows"),t=getVal(gallery,"grid-row-gap");gallery.querySelectorAll(".gallery-item").forEach(function(e){e.style.gridRowEnd="span "+Math.ceil((getHeight(e)+t)/(l+t))})};gallery.querySelectorAll("img").forEach(function(r){r.classList.add("byebye"),r.complete?console.log(r.src):r.addEventListener("load",function(){var e=getVal(gallery,"grid-auto-rows"),l=getVal(gallery,"grid-row-gap"),t=r.parentElement.parentElement;t.style.gridRowEnd="span "+Math.ceil((getHeight(t)+l)/(e+l)),r.classList.remove("byebye")})}),window.addEventListener("resize",resizeAll),gallery.querySelectorAll(".gallery-item").forEach(function(e){e.addEventListener("click",function(){e.classList.toggle("full")})})</script>`

    res.send(out)
    debug(`${_.ip} >> ${_.url}`)
})

app.listen(process.env.PORT || 3000)

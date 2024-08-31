const express = require('express')
const app = express()
const fs = require('fs')
const commands = fs.readdirSync('./commands/')
const port = process.env.PORT || 3000
let data = []
app.get('/market', (req, res) => {
  output = {};
  no = 0
  commands.forEach(file => {
    no += 1;
    module = JSON.parse(fs.readFileSync("./commands/" + file, 'utf8'))
    data.push(module)
    output[no.toString()] = {
      name: module.name,
      link: module.data,
      usage: module.usage,
      description: module.description
    }
  })
  res.send({status: true, data: output})
})
app.post('/add', (req, res) => {
  const { name, usage, link, description } = req.query
  if (!name || !usage || !link || !description) return res.send({status:false, message:"Missing Parameter."})
  module.push({name: name,
      data: link,
      usage: usage,
      description: description})
  fs.writeFileSync('./commands/' + name +'.json', JSON.stringify(module, null, 2))
})
app.listen(port)
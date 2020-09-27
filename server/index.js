const express = require('express')
const app = express()
const mqtt = require('mqtt') 
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

let trams = [] 
const client = mqtt.connect('wss://mqtt.hsl.fi:443/')

client.on('connect', function () {
  client.subscribe('/hfp/v2/journey/ongoing/vp/tram/#', function (err) {
    if (err) {
      console.log('error: ', err)
    }
  })
})

client.on('message', function (topic, message) {  
  let VP = JSON.parse(message.toString()).VP  
  if (!trams.map(tram => tram.VP.veh).includes(VP.veh)) {
    trams.push({ topic, VP, updateTime: new Date() })
  } else {
    trams = trams.map(tram =>
      tram.VP.veh === VP.veh ? { topic, VP, updateTime: new Date() } : tram
    )
  } 
  trams = trams.filter(tram => new Date() - tram.updateTime < 50000)   
})
  

app.get('/trams', async (req, res) => {
  console.log(new Date()) 
  try {
    //res.json(trams.filter(tram => tram.VP.desi === '10'))
    res.json(trams)
    console.log(trams.length, 'RATIKKAA')
  } catch (error) {
    console.log('error: ', error)
  }
}) 
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log('Server running in port: ' + PORT))

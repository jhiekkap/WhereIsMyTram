const express = require("express");
const app = express();
const port = 3001;   
const mqtt = require('mqtt')
const client = mqtt.connect('wss://mqtt.hsl.fi:443/')
let trams = []
const cors = require('cors')

app.use(cors())

client.on('connect', function () {
    client.subscribe('/hfp/v2/journey/ongoing/vp/tram/#', function (err) {
        if (err) {
            console.log('error: ', err)
        }
    })
}) 

client.on('message', function (topic, message) {
    // message is Buffer

    let VP = JSON.parse(message.toString()).VP

    if (!trams.map(tram => tram.VP.veh).includes(VP.veh)) {
        trams.push({ topic, VP }) 
    } else { 
        trams = trams.map(tram => tram.VP.veh === VP.veh ? { topic, VP } : tram)
    }
    //console.log(topic, VP)
    //console.log(trams)
    //client.end()
}) 
   
app.get("/trams", async (req, res) => { 
     console.log(new Date())
      try { 
      res.json(trams.filter(tram => tram.VP.desi === '10')) 
    } catch (error) {
      console.log('error: ',error) 
    }  
  });
  


app.listen(port, () => console.log("Server running in port: " + port));







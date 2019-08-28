import React from 'react' 
 

const SelectTram = ({ trams, setShowTram }) => {
 

  const handleChooseTram = e => {
    console.log('TRAM CHOSEN: ', e.target.value)
    console.log('TRAMS: ', trams)
    let chosenTram = trams.find(tram => tram.veh === e.target.value)
    console.log('chosen Tram:', chosenTram)
    setShowTram(chosenTram)
  }
 
   

  return (
    <div>
      <p>valitse ratikka:</p>
      <select onChange={handleChooseTram}>
        {trams.map((tram, i) => (
          <option key={i} value={tram.veh}>
            linja: {tram.linja} veh: {tram.veh}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectTram 

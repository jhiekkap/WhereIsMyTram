import React from 'react' 
 

const SelectTram = ({ trams, showTrams, setShowTrams }) => {
 

  const handleChooseTram = e => {
    console.log('TRAM CHOSEN: ', e.target.value) 
    //console.log('TRAMS:', trams.find(tram => tram.VP.veh.toString() === e.target.value))
    let chosenTram = trams.find(tram => tram.VP.veh.toString() === e.target.value)
    console.log('chosen Tram:', chosenTram)
    setShowTrams(showTrams.concat(chosenTram))
  }
 
 
  /// COMPARE FUNCTION FOR ARRAY SORT()
  const sortByLineNumbers = (a, b) => {
    return a.VP.desi < b.VP.desi ? -1 : a.VP.desi > b.VP.desi  ? 1 : 0
  }
  let tramsInOrder = [...trams].filter(tram => !showTrams.map(tram => tram.VP.veh).includes(tram.VP.veh))
  tramsInOrder.sort(sortByLineNumbers)

  return ( 
    <div>
      <span> 
      <select onChange={handleChooseTram}>
        <option>{trams.length !== showTrams.length ? 'lisää ratikka:' : 'kaikki ratikat on kartalla'}</option>
        {tramsInOrder.map((tram, i) => (
          <option key={i} value={tram.VP.veh}>
            linja: {tram.VP.desi} veh: {tram.VP.veh}
          </option>
        ))}
      </select>
      </span>
      <span>
        <button onClick={()=>setShowTrams(trams)}>näytä kaikki ratikat}</button>
      </span>
      {showTrams.length !== 0 && <span>
        <button onClick={()=>setShowTrams([])}>piilota kaikki ratikat}</button>
      </span>} 
    </div>
  )
}

export default SelectTram 

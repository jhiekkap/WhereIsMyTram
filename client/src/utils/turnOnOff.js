export const turnOn = () => { 
    fetch('/on')
    .then(response => response.json())
    .then(body => {
      console.log(body)
    })
    .catch(error => {
      console.log(error)
    })

}  

export const turnOff = () => { 
    fetch('/off')
    .then(response => response.json())
    .then(body => {
      console.log(body)
    })
    .catch(error => {
      console.log(error)
    })

}  
import { Audio } from 'expo-av'


const soundObject = new Audio.Sound()
const play = async () => {
    try {
      await soundObject.loadAsync(require('./../assets/sounds/foghorn-daniel_simon.mp3'))
      await soundObject.playAsync()
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }


  export default play
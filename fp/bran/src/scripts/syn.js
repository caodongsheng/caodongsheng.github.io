
import axios from 'axios'
export const postjson = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res.data)
    }).catch(res => {
      reject(res)
    })
  })
}

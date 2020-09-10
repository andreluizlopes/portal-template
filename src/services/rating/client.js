import axios from 'axios'
import { endpoint } from './config'

export default function (data) {
  return axios({
    url: endpoint,
    method: 'post',
    data
  }).then((result) => {
    return result.data
  }).catch((err) => console.log(err))
}

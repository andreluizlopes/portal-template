import axios from 'axios'

import { endpoint } from './config'

export const sendLead = (form) => {
  const data = ({
    fields: [
      {
        name: 'email',
        value: form.email
      },
      {
        name: 'cep',
        value: form.zipCode
      },
      {
        name: 'mobilephone',
        value: form.phone
      },
      {
        name: 'url',
        value: form.url
      },
      {
        name: 'cobertura',
        value: form.coverage || ''
      }
    ]
  })

  return axios({
    url: endpoint,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }).then(res => res.status)
    .catch(err => console.log(err))
}

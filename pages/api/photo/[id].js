import axios from 'axios';

export default function handler(req, res) {
  axios.get(req.query.url, {
    responseType: 'arraybuffer'
  }).then(response => {
    res.status(200).json({ url: Buffer.from(response.data, 'binary').toString('base64') })
  });
}

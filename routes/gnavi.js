var request = require('request')
var gnavi_conf = require('./gnavi.json')

var API_URL = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/'
var KEY_ID = gnavi_conf.key
var URL = API_URL + '?keyid=' + KEY_ID + '&format=json'

exports.search = (freeword, lat, lng, range) => {
  return new Promise((resolve, reject) => {
    var word = new Buffer(freeword, 'base64')
    console.log(word)
    var options = {
      url: URL + '&freeword=' + word + '&latitude=' + lat + '&longitude=' + lng + '&range=' + range,
      method: 'GET',
      json: true,
    }
    request(options, (err, res, body) => {
      if (err) {
        console.log(err)
        reject(err)
        return
        }
      if (body.error) {
        reject(body.error)
        return
      }
      resolve(body)
    })
  })
}

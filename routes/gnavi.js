var request = require('request')
var gnavi_conf = require('./gnavi.json')

var API_URL = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/'
var G_API_URL = 'http://api.gnavi.co.jp/ForeignRestSearchAPI/20150630/';
var KEY_ID = gnavi_conf.key

exports.search = (freeword, lat, lng, range) => {
  var URL = API_URL + '?keyid=' + KEY_ID + '&format=json'
  return new Promise((resolve, reject) => {
    var word = new Buffer(freeword, 'base64')
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

exports.g_search = (id) => {
  var URL = G_API_URL + '?keyid=' + KEY_ID + '&format=json&lang=en&id=' + id;
  console.log(id)
  return new Promise((resolve, reject) => {
    var options = {
      url: URL,
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

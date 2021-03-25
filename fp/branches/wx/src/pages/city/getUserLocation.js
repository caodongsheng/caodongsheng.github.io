let getCurrentCityName = function () {
  return new Promise((resolve, reject) => {
    let geolocation = new BMap.Geolocation()
    let myGeo = new BMap.Geocoder()
    geolocation.getCurrentPosition(r => {
      let pt = r.point
      myGeo.getLocation(pt, res => {
        if (res) {
          let addComp = res.addressComponents
          resolve(addComp)
        }
      })
    })
  })
};


export default getCurrentCityName



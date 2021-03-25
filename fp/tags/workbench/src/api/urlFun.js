let  urlFunction = function (obj) {
  return new Promise((resolve, reject) => {
    let ret = []
    let msg = obj
    for(let i in obj){
      if(obj[i] === ""){
        delete obj[i]//去掉空属性
       
      }
      if(obj[i] == null){
        delete obj[i]//去掉空属性
      }
    }
    delete obj.pageSize
    delete obj.page
    msg = obj
    for(let i in msg){
      let k = JSON.stringify(msg[i])
      let name = `${i}=${k}`
      ret.push(name)
    }
    if(ret){
      resolve(ret)
    }else{
      reject()
    }
  })
}
export default urlFunction

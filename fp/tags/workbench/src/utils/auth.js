import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
	let domainStr = document.domain;
  if(domainStr.indexOf('www.')!=-1){
      domainStr = domainStr.split('www.')[0]+domainStr.split('www.')[1]
  }
  return Cookies.set(TokenKey, token,{domain:domainStr,path:"/"})
}

export function removeToken() {
  let domainStr = document.domain;
  if(domainStr.indexOf('www.')!=-1){
      domainStr = domainStr.split('www.')[0]+domainStr.split('www.')[1]
  }
  localStorage.clear(); 
  return Cookies.remove(TokenKey,{domain:domainStr,path:"/"})
}
export function clearAll(){
   
}

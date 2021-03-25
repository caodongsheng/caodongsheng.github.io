let open = function (url,data,otherway=null) {
  if(window.api){
  return new Promise((resolve, reject) => {
    if(url){
        api.openWin({
          name: 'webview_win',
          url: 'webview_win.html',
          reload: true,
          pageParam: {
            title:data,
            url:url
          }
        })
    }
  })
}
else{
 // alert(url)
 if(otherway==null)
 {
  location.href = url;
 }
 else{
 otherway.call();
 }
}
}
export default open

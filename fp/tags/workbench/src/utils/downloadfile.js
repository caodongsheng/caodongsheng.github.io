
import Cookies from 'js-cookie'
let downloadfile = {
    //
    //$.fileDownload('/path/to/url/', options)
    //  see directly below for possible 'options'
    fileDownload: function (fileUrl, options) {
        console.log('=',fileUrl,options)
        //provide some reasonable defaults to any unspecified options below
        let settings = Object.assign({},
{


            prepareCallback: function (url) { },


            successCallback: function (url) { },


            failCallback: function (responseHtml, url) { },



            checkInterval: 100,

            //
            //the cookie name to indicate if a file download has occured
            //
            cookieName: "fileDownload",

            //
            //the cookie value for the above name to indicate that a file download has occured
            //
            cookieValue: "true",


        }, options);

        let deferred =new Promise(function(resolve,reject){

        //Setup mobile browser detection: Partial credit: http://detectmobilebrowser.com/
        let userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();

        let isIos;                  //has full support of features in iOS 4.0+, uses a new window to accomplish this.
        let isAndroid;              //has full support of GET features in 4.0+ by using a new window. Non-GET is completely unsupported by the browser. See above for specifying a message.
        let isOtherMobileBrowser;   //there is no way to reliably guess here so all other mobile devices will GET and POST to the current window.

        if (/ip(ad|hone|od)/.test(userAgent)) {

            isIos = true;

        } else if (userAgent.indexOf('android') !== -1) {

            isAndroid = true;

        } else {

            isOtherMobileBrowser = /avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));

        }





        let internalCallbacks = {

            onPrepare: function (url) {
            if (settings.prepareCallback) {

                    settings.prepareCallback(url);

                }

            },

            onSuccess: function (url) {


                settings.successCallback(url);

                resolve(url);
            },

            onFail: function (responseHtml, url) {

                settings.failCallback(responseHtml, url);
                reject()

            }
        };

        internalCallbacks.onPrepare(fileUrl);

        let $iframe;

         if (isOtherMobileBrowser) {
                console.log('123456789location',)
                window.location(fileUrl);

            } else {

                //create a temporary iframe that is used to request the fileUrl as a GET request
                    $iframe =  document.createElement("iframe");

					 $iframe.style.display = "none";
					 $iframe.src = fileUrl;
                     console.log('iframe',fileUrl)
					 document.body.appendChild($iframe);

            }




        //check if the file download has completed every checkInterval ms
        setTimeout(checkFileDownloadComplete, settings.checkInterval);


        function checkFileDownloadComplete() {
            console.log('-cookies-',settings.cookieName + "=" + settings.cookieValue, '==',document.cookie.indexOf(settings.cookieName + "=" + settings.cookieValue),'--',document.cookie)
            if (document.cookie.indexOf(settings.cookieName + "=" + settings.cookieValue) != -1) {
                console.log('trueasdasds','-cookies-',settings.cookieName + "=" + settings.cookieValue)
                internalCallbacks.onSuccess(fileUrl);

                removeToken()
                 clearUp()

                return;
            }

            //has an error occured?
            //if neither containers exist below then the file download is occuring on the current window
            if ($iframe) {

                //has an error occured?
                try {

                    let formDoc =  getiframeDocument($iframe);

                    if (formDoc && formDoc.body != null&& formDoc.body.innerHTML.length) {


                            internalCallbacks.onFail(formDoc.body.innerHTML, fileUrl);

                            clearUp()

                            return;

                    }
                }
                catch (err) {

                    //500 error less than IE9
                    internalCallbacks.onFail('', fileUrl);

                    clearUp()

                    return;
                }
            }


            //keep checking...
            setTimeout(checkFileDownloadComplete, settings.checkInterval);
        }
        function clearUp(){
             if ($iframe) {
                   $iframe.remove();
                }
        }
        //gets an iframes document in a cross browser compatible manner
        function getiframeDocument($iframe) {

            let iframeDoc = $iframe.contentWindow || $iframe.contentDocument;

            if (iframeDoc.document) {

                iframeDoc = iframeDoc.document;
            }
            return iframeDoc;
        }
    })
    return deferred

}

}
function setToken(token) {
	let domainStr = document.domain;
  if(domainStr.indexOf('www.')!=-1){
      domainStr = domainStr.split('www.')[0]+domainStr.split('www.')[1]
  }
  return Cookies.set("fileDownload", token,{domain:domainStr,path:"/"})
}

function removeToken() {
  let domainStr = document.domain;
  if(domainStr.indexOf('www.')!=-1){
      domainStr = domainStr.split('www.')[0]+domainStr.split('www.')[1]
  }
  return Cookies.remove("fileDownload",{domain:domainStr,path:"/"})
}

export default downloadfile;

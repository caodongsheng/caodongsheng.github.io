export default function ModuleNative(types,keys){
    var u = navigator.userAgent
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
    if(isiOS){
        switch (types) {
            case 'pushPage':
                window.navigation.pushPage(keys)
                break
            case 'PopVCApp':
                window.webkit.messageHandlers.PopVCApp.postMessage(keys)
                break
            case 'selectedIndex':
                window.nativeTabbar.selectedIndex(keys)
                break
            case 'share':
                window.share.getShareDetailView(keys)
                break
            case 'scan':
                window.webkit.messageHandlers.ScanQRCode.postMessage(keys)
                break
            case 'location':
                window.webkit.messageHandlers.locateAction.postMessage(keys)
                break
            case 'phone':
                window.webkit.messageHandlers.callPhone.postMessage(keys)
                break
            case 'close':
                // window.webkit.messageHandlers.PopToApp.postMessage(keys)
                window.webkit.messageHandlers.PopVCApp.postMessage(keys)
                break
            case 'liveFace':
                window.webkit.messageHandlers.LiveFace.postMessage(keys)
                break
            case 'AppRegulePhoto':
                window.webkit.messageHandlers.AppRegulePhoto.postMessage({body:keys})
                break
            case 'miniProgram':
                window.webkit.messageHandlers.AppPushToMiniProgram.postMessage(keys)
                break
            case 'AppReturnToLoginPage':
                window.webkit.messageHandlers.AppReturnToLoginPage.postMessage('callNative')
                break
            case 'openNewWebview':
                window.webkit.messageHandlers.openNewWebview.postMessage(keys)
                break
            case 'jumpList':
                window.webkit.messageHandlers.CallAppFunction.postMessage(keys)
                break
            case 'FpCollectionChange':
                window.webkit.messageHandlers.FpCollectionChange.postMessage(keys)
                break
            case 'QueryKeyCipher':
                window.webkit.messageHandlers.QueryKeyCipher.postMessage(keys)
                break
            case 'QueryUser':
                window.webkit.messageHandlers.QueryUser.postMessage(keys)
                break
            default:
                break
        }
    }else{
        switch (types) {
            case 'pushPage':
                javascript: android.pushPage(keys)
                break
            case 'popToRootPage':
                javascript: android.popToRootPage(keys)
                break
            case 'selectedIndex':
                javascript: android.selectedIndex(keys)
                break
            case 'share':
                javascript: android.getShareDetailView(keys)
                break
            case 'scan':
                javascript: android.ScanQRCode(keys)
                break
            case 'location':
                javascript: android.locateAction(keys)
                break
            case 'phone':
                javascript: android.callPhone(keys)
                break
            case 'close':
                javascript: android.PopToApp(keys)
                break
            case 'liveFace':
                javascript: android.LiveFace(keys.isIdcard)
                break
            case 'AppRegulePhoto':
                javascript: android.AppRegulePhoto(keys)
                break
            case 'miniProgram':
                javascript: android.AppPushToMiniProgram(keys.path, keys.miniProgramType, keys.userName)
                break
            case 'androidDownloadPDF':
                javascript: android.LookPDF(keys)
                break
            case 'AppReturnToLoginPage':
                javascript: android.AppReturnToLoginPage('callNative')
                break
            case 'openNewWebview':
                javascript: android.openNewWebview(keys.url)
                break
                // keys: '供应商列表'、'产品列表'
            case 'jumpList':
                javascript: android.CallAppFunction(keys)
                break
            case 'FpCollectionChange':
                javascript: android.FpCollectionChange(keys)
                break
            case 'QueryKeyCipher':
                javascript: android.QueryKeyCipher(keys)
                break
            case 'QueryUser':
                javascript: android.QueryUser(keys)
                break
            default:
                break
        }
    }
	return 
}
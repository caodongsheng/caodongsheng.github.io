export function checkNameStr(value, min, max, prestr) {
    if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < min) {
        return { valid: false, msg: prestr + "长度不能小于" + min }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length > max) {
        return { valid: false, msg: prestr + "长度不能大于" + max }
    }
    if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,15}$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {

        return { valid: false, msg: prestr + "输入有误" }
    }
    else {

        return { valid: true }
    }
}
export function checkpasswordStr(value,min,max,prestr){
	if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < min) {
        return { valid: false, msg: prestr + "长度不能小于"+min  }
    }
	if (value.replace(/(^\s*)|(\s*$)/g, "").length >max) {
        return { valid: false, msg: prestr + "长度不能大于"+max  }
    }
    
    if (!/^\w{8,20}$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {

        return { valid: false, msg: prestr + "输入格式有误" }
    }
    else {

        return { valid: true }
    }
}
export function checkPostcardStr(value,min,max,prestr){
	if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < 3) {
        return { valid: false, msg: prestr + "长度不能小于3"  }
    }
	if (value.replace(/(^\s*)|(\s*$)/g, "").length >12) {
        return { valid: false, msg: prestr + "长度不能大于12" }
    }
    
    if (!/^[a-zA-Z0-9 ]{3,12}$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {

        return { valid: false, msg: prestr + "输入格式有误" }
    }
    else {

        return { valid: true }
    }
	
}
export function checkNickStr(value,min,max,prestr){
	if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < min) {
        return { valid: false, msg: prestr + "长度不能小于"+min  }
    }
	if (value.replace(/(^\s*)|(\s*$)/g, "").length >max) {
        return { valid: false, msg: prestr + "长度不能大于"+max  }
    }
    
  
 

        return { valid: true }
   
}
export function checkIDCardStr(value,prestr){
	 if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < 15) {
        return { valid: false, msg: prestr + "长度不能小于15位"  }
    }
	if (value.replace(/(^\s*)|(\s*$)/g, "").length >18) {
        return { valid: false, msg: prestr + "长度不能大于18位"  }
    }
    
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {

        return { valid: false, msg: prestr + "输入有误" }
    }
    else {

        return { valid: true }
    }
}
export function checkAccountStr(value,prestr){
	 if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
   
    else {

        return { valid: true }
    }
}
export function checkProveStr(value, min,  prestr) {
    if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < min) {
        return { valid: false, msg: prestr + "长度不能小于" + min }
    }
    
    if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{10,}$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {

        return { valid: false, msg: prestr + "输入有误" }
    }
    else {

        return { valid: true }
    }
}
export function checkAddress(value, min, max, prestr) {
    if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < min) {
        return { valid: false, msg: prestr + "长度不能小于" + min }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length > max) {
        return { valid: false, msg: prestr + "长度不能大于" + max }
    }
    if (!/[^\x00-\xff]{4,50}$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {

        return { valid: false, msg: prestr + "输入有误" }
    }
    else {

        return { valid: true }
    }
}

export function checkTitle(value, min, max, prestr) {
    if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < min) {
        return { valid: false, msg: prestr + "长度不能小于" + min }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length > max) {
        return { valid: false, msg: prestr + "长度不能大于" + max }
    }
    if (!/[^\x00-\xff]{4,20}$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {

        return { valid: false, msg: prestr + "输入有误，必须是中文字符" }
    }
    else {

        return { valid: true }
    }
}

export function checkDesc(value, min, max, prestr) {
    if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < min) {
        return { valid: false, msg: prestr + "长度不能小于" + min }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length > max) {
        return { valid: false, msg: prestr + "长度不能大于" + max }
    }
  /*   if (!/[^\x00-\xff]{10,5000}$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {

        return { valid: false, msg: prestr + "输入有误，必须是中文字符" }
    }
    else {
 */
        return { valid: true }
   // }
}
export function checkPhoneStr(value, prestr) {
    if (value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return { valid: false, msg: prestr + "不能为空" }

    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length < 11) {
        return { valid: false, msg: prestr + "长度不能小于11" }
    }
    if (value.replace(/(^\s*)|(\s*$)/g, "").length > 11) {
        return { valid: false, msg: prestr + "长度不能大于11" }
    }
    let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
    let flag = reg.test(value.replace(/(^\s*)|(\s*$)/g, ""));
    // if(this.relPhone == ''|| this.relPhone.length < 11 || this.relPhone.length > 11){
    //     this.showToast('','text','手机号码不能为空且必须为11位','20em','','middle');
    //     this.phonefail = true;
    // }
    if (!flag) {
        return { valid: false, msg: "请检查" + prestr + "输入是否正确！" }
    }
    else {
        return { valid: true }
    }
}
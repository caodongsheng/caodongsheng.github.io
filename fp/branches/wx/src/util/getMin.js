export function getMinPic(imgurl){
	let path = imgurl.lastIndexOf('-');
	let firstname = imgurl.substr(0,path+1);
	let lastname =  imgurl.substring(path+1);
	let pictype = imgurl.substring(path+4);
	let newname = lastname.replace(lastname, 'min'+ pictype);
	return firstname+newname;
}

	 
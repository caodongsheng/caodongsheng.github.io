export function getMidPic(imgurl){
	let path = imgurl.lastIndexOf('-');
	let firstname = imgurl.substr(0,path+1);
	let lastname =  imgurl.substring(path+1);
	let pictype = imgurl.substring(path+4);
	let newname = lastname.replace(lastname, 'mid'+ pictype);
	return firstname+newname;
}

	 
import dayjs from 'dayjs';
import CryptoJS from "crypto-js";

export const po = console.debug;


export const  random=(min, max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


export const download=(fileName="file", src)=>{
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([src]));
    link.setAttribute("download", fileName);
    link.click();
}

export const args=function(){
    return (value)=>{
        const result=[arguments[0][0]]
        arguments[0].reduce((aco,string,index)=>{
            result.push(arguments[index](value))
            result.push(string)
            return result
        })
        return result.join("");
    }
}

export const createTable=(sql)=>{
        
    let result;

    // The regex for each component:
    let rg_tb = /(create\s+table\s+if\s+not\s+exists|create\s+table)\s(?<tb>.*)\s\(/gim;
    let rg_fld = /(\w+\s+text.*|\w+\s+varchar.*|\w+\s+char.*|\w+\s+real.*|\w+\s+float.*|\w+\s+integer.*|\w+\s+int.*|\w+\s+datetime.*|\w+\s+date.*)/gim;
    let rg_fld2 = /(?<fname>\w+)\s+(?<ftype>\w+)(?<fattr>.*)/gi;
    let rg_not_null = /not\s+null/i
    let rg_pk = /primary\s+key/i
    let rg_fld_def = /default\s(.+)/gi
    let rg_length = /^\((?<length>\d+)\)/g     ///^\(([^)]+)\)/

    // look for table name
    result = rg_tb.exec(sql) ||{};
    const tableName=result.groups.tb
    console.log('TABLE NAME:', result.groups.tb);

    let fld_list = [];

    while ((result = rg_fld.exec(sql)) != null) {
        let f = result[0];

        //reset
        rg_fld2.lastIndex = 0;
        let fld_def = rg_fld2.exec(f);

        // remove the field definition terminator.
        let attr = fld_def.groups.fattr.replace(',', '').trim();

        // look for NOT NULL.
        let nullable = !rg_not_null.test(attr);

        // remove NOT NULL.
        let attr2 = attr.replace(rg_not_null, '');

        // look for PRIMARY KEY
        let is_pk = rg_pk.test(attr2);

        // look for DEFAULT
        let def = rg_fld_def.exec(attr2);
        if (def && def.length > 0) {
            def = def[1].trim();
        }
        else {
            def = null;
        }

        let length= rg_length.exec(attr)?.groups.length
        console.debug(length)

        // append to the arr
        fld_list.push({
            name: fld_def.groups.fname.trim(),
            type: fld_def.groups.ftype.trim(),
            length:length !=null ?parseInt(length):null,
            nullable: nullable,
            pk: is_pk,
            def: def,
            attr0: attr
        });
    }

    console.table(fld_list);

    return {
        name:tableName,
        columns:fld_list
    };




}


///testing jwt///////////////////////////////////////////////////////////////////////////////////////////
	function base64url(input) {
		var base64String = btoa(input).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
		return base64String//urlConvertBase64(base64String);
	}
  
	function urlConvertBase64(input) {
		var output = input.replace(/=+$/, '');
		output = output.replace(/\+/g, '-');
		output = output.replace(/\//g, '_');
		return output;
	}

	function genTokenSign(token, secret) {
		var hash = CryptoJS.HmacSHA256(token.join("."), secret);
		var base64Hash = CryptoJS.enc.Base64.stringify(hash);
		return urlConvertBase64(base64Hash);
	}  

	function generateJWT(body, key, secret) {
		var token = [
			base64url(JSON.stringify({
				alg: 'HS256'
			}))
			,base64url(JSON.stringify({
				...body,
				exp: parseInt(dayjs().add(10000,'m').format('X')),
				iat: parseInt( dayjs().format('X'))
			}))
		]
		token[2] = genTokenSign(token, secret)
		return token.join(".");
	}
///testing jwt//////////////////////////////////
export const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

export const Jwt=(body)=>{
	var token = generateJWT(body,"5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437", "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437")
	return token
}
import * as dotenv from 'dotenv' 
import {login} from './login.js';
dotenv.config();

//{nome: "test", prefisso: "*6662", numero: "001122336655", taglio: 5, trunk: 2}
async function outBoundRules (numero){
    const http = await login(`http://${process.env.HOST}:5001`, {Username: process.env.USER, Password: process.env.PASSWORD})
    const regola = await (await http.post("/api/OutboundRuleList/new", {"Param": {}})).data;
    await http.post("api/edit/update", {"Path": {"ObjectId": `${regola.Id}`,"PropertyPath": [{"Name": "Name"}]},"PropertyValue": numero.nome});
    await http.post("api/edit/update", {"Path": {"ObjectId": `${regola.Id}`,"PropertyPath": [{"Name": "Prefix"}]},"PropertyValue": numero.prefisso});
    await http.post("api/edit/update", {"Path": {"ObjectId": `${regola.Id}`,"PropertyPath": [{"Name": "Route1Destination"}]},"PropertyValue": numero.trunk});
    await http.post("api/edit/update", {"Path": {"ObjectId": `${regola.Id}`,"PropertyPath": [{"Name": "Route1StripDigits"}]},"PropertyValue": numero.taglio});
    await http.post("api/edit/update", {"Path": {"ObjectId": `${regola.Id}`,"PropertyPath": [{"Name": "Route1Prepends"}]},"PropertyValue": numero.numero});
    await http({method: 'post',url: 'api/edit/save',data: regola.Id,headers: {"content-type": "application/json;charset=UTF-8"}})
}

//{marca: "", modello: "", mac: "", collegamento: "", nome: "",interni: [""]} //da finire
async function importDect(dect){
    const http = await login(`http://${process.env.HOST}:5001`, {Username: process.env.USER, Password: process.env.PASSWORD})
    const base = await (await http.post("api/FxsList/createFxs",{Brand: dect.marca, Model: dect.modello, LineCount: 1, MacAddress: dect.mac})).data;
    await http.post("api/edit/update", {Path: {ObjectId: "2", PropertyPath: [{Name: "Name"}]}, PropertyValue: "TEST"});

}

export {outBoundRules, importDect};
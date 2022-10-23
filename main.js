import * as dotenv from 'dotenv' 
import {login} from './library.js';
dotenv.config();

async function main (){
    const http = await login(`http://${process.env.HOST}:5000`, {Username: process.env.USER, Password: process.env.PASSWORD})
    setInterval(async ()=> {
        const data = ((await http.get("/api/activeCalls")).data);
        if(data.list.length > 0){
            data.list.forEach(obj => {
                console.log(`${obj.Caller} sta chiamanto ${obj.Callee}`)
            });
        }
        else{
            console.log("Non ci sono nuove chiamate");
        }
    }, 1000);
}
main();

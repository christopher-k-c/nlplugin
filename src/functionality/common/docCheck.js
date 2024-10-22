



import {app} from 'photoshop';

async function docCheck(){

    try{

        let doc = app.activeDocument; 

        // Check document is open 
        if(!doc){ 

            return false;
        
        }

        return true 

    }
    catch(e){

        console.log(e);

    }




}

export default docCheck;

async function resizeDocument(doc){

     
    try{    



        if(doc.width > doc.height){
    

            // Call Multi Pack Template Function 
        
        }   
        else{


            await doc.resizeImage(undefined, 2608)
            await doc.resizeCanvas(2300, 2608)
            
        
        }
    


    }
    catch(e){

        console.log(e)
    
    }


}

export default resizeDocument;
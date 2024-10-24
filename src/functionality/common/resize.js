async function resizeDocument(doc){

     
    try{    



        if(doc.width > doc.height){
    

            // Call Multi Pack Template Function 
            console.log("// Call Multi Pack Template Function")
        
            await doc.resizeImage(2608, undefined)
            await doc.resizeCanvas(2608, 2300)

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
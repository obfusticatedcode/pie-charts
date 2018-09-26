//Actions creators type & payload key
//Handling data simplifications and organise proper payload
export const FilesSelect=(evt,key,allowedTypes,limit)=>{
    var Files=evt.target.files
    var filesSaved=[];
    var count=0;
    if(Files) {
        for (let i = 0, f; (f = Files[i])&&count<limit; i++) {
            console.log('ftype:',f.type)
            if(allowedTypes){
                if(allowedTypes.map((t)=>f.type===t).reduce((a,b)=>a+b)>0){
                    filesSaved.push(f)
                    count++
                }
            }else{
                filesSaved.push(f)
                count++  
            }
        }
    }
    return {
        type:'FILES_SELECT',
        key:key,
        files:filesSaved
    }
}

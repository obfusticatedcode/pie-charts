//Actions creators type & payload key
//Handling data simplifications and organise proper payload
export const MenuClick=(pick)=>{
    return {
        type:'MENU_CLICK',
        pick:pick
    }
}

export const TrainingLog=(log)=>{
    return {
        type:'TRAINING_LOG',
        log:log
    }
}

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

export const FileDrops=(evt,key,allowedTypes,limit)=>{
    var Files=evt.dataTransfer.files
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

export const ModelUploadFailed=(evt,key)=>{
    return {
        type:'MODEL_UPLOAD_FAILED'
    }
}
export const ModelUploading=(evt)=>{
    return {
        type:'MODEL_UPLOAD_S1'
        
    }
}

export const ModelUploaded=(model)=>{
    return {
        type:'MODEL_UPLOAD_S2',
        model:model
    }
}

export const ReadingFiles=()=>{
    return {
        type:'READING_FILES'
    }
}

export const FilesRead=()=>{
    return {
        type:'FILES_READ'
    }
}

export const ModelFitting=()=>{
    return {
        type:'MODEL_FITTING'
    }
}

export const ModelFitted=()=>{
    return {
        type:'MODEL_FITTED'
    }
}


export const UploadPred=(predictions)=>{
    return {
        type:'UPLOAD_PRED',
        predictions:predictions
    }
}




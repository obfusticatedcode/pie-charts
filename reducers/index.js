//Handling change of state with payload

const initial_state={
    Feedback:undefined,
    links:undefined,
    nodes:[],
    links:[],
    ready:false
};

export default (state=initial_state,action)=>{
    switch(action.type){ 
        case 'FILES_SELECT':
            let updates={};
            updates[action.key]=action.files;
            return Object.assign({},state,updates)
        case 'RENDER_READYs':
            return {...initial_state,ready:true}
        default:
            return state
    }
}
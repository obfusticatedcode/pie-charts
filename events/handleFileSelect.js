import * as actions from "./actions/index"
//Handling of dispatches
function handleFileSelect(evt,key,allowedTypes,limit) {
  console.log('i see you made your selections!!!!!!!!!')
  this.store.dispatch(actions.FilesSelect(evt,key,allowedTypes,limit));
};
export default handleFileSelect;
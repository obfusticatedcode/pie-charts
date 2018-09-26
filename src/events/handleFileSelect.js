import * as actions from "./actions/index"
//Handling of dispatches
function handleFileSelect(evt,key,allowedTypes,limit) {
  this.store.dispatch(actions.FilesSelect(evt,key,allowedTypes,limit));
};
export default handleFileSelect;
import {connect} from "./conectActions";
import {endSimpleChat, startSimpleChat} from "./simpleActions";
import {endSecureChat, saveFriendKey, startSecureChat} from "./secureActions";

const actions = {connect, endSecureChat, saveFriendKey, endSimpleChat, startSimpleChat, startSecureChat};
export default actions;
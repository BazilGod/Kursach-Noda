import { observer } from 'mobx-react';
import { observable, action } from "mobx";
import axios from 'axios';

class ChatHeaderDataState{
    user = observable({});
    values = observable.map({
        isHide: false,
        isLoaded: false,
    });

    constructor(){
        this.onFetchUserInfo = ::this.onFetchUserInfoHandler;
    }

    fetchUserInfo(userLogin){
        axios.get(`http://localhost:3000/api/v1/users/${userLogin}`)
            .then(this.onFetchUserInfo);
    }

    onFetchUserInfoHandler(result){
        this.setUser(result.data);
        this.setIsLoaded(true)
    }

    onAddUserToChat(newUserLogin, userId, chatId){
        axios.post(`http://localhost:3000/api/v1/users/${userId}/chats/${chatId}/adding/${newUserLogin}`)
            .then(() => alert('user added to chat'))
            .catch(() => alert('error'));
    }

    setUser(value){
        this.user = value;
    }

    get isLoaded() {
        return this.values.get('isLoaded');
    }

    setIsLoaded(value){
        this.values.set('isLoaded', value);
    }

    get isHide() {
        return this.values.get('isHide');
    }

    setIsHide(value){
        this.values.set('isHide', value);
    }
}

export default ChatHeaderDataState;
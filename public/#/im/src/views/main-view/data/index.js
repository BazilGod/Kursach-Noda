import { observable, action } from "mobx";
import axios from 'axios';

class DataStore {
    name;
    userId;
    messages = observable([]);
    values = observable.map({
        isChoosed: false,
        isLoaded: false,
        chat: {}
    });

    constructor(){
        this.setName(null);

        this.getName();
        this.onCompleteFetchMessages = ::this.onCompleteFetchMessagesHandler;
    }

    onCompleteFetchMessagesHandler(result){
        this.setMessages(result.data);
        this.setIsLoaded(true);
    }

    fetchMessages(){
        axios.get(`http://localhost:3000/api/v1/users/${this.userId}/chats/${this.chat.id}/messages`)
            .then(this.onCompleteFetchMessages);
    }

    getName(){
        let result = null;
        let id = null;
        let tmp = [];
        location.search.substr(1)
            .split('&')
                .forEach(item => {
                    tmp = item.split('=');
                    if(tmp[0] === 'login')
                        result = decodeURIComponent(tmp[1]);
                    if(tmp[0] === 'id')
                        id = decodeURIComponent(tmp[1]);
                });
        this.setName(result);
        this.setUserId(id);
    }

    get isChoosed() {
        return this.values.get('isChoosed');
    }

    get chat() {
        return this.values.get('chat');
    }

    get isLoaded() {
        return this.values.get('isLoaded');
    }

    setChat(value){
        this.values.set('chat', value);
    }

    setIsChoosed(value){
        this.values.set('isChoosed', value);
    }

    setIsLoaded(value){
        this.values.set('isLoaded', value);
    }

    setName(val){
        this.name = val;
    }

    setUserId(val){
        this.userId = val;
    }

    setMessages(val){
        this.messages = val.reverse();
    }
}

export default DataStore;
import { observable, computed, action } from "mobx";
import axios from 'axios';

class DataStore {
    chats = observable([]);
    values = observable.map({
        isLoaded: false
    });

    constructor(userId){
        this.userId = userId;

        this.onCompleteFetch = ::this.onCompleteFetchHandler;
        this.onCompleteAdd = ::this.onCompleteAddHandler;
    }

    onCompleteFetchHandler(result){
        this.setChats(result.data);
        this.setIsLoaded(true);
    }

    onCompleteAddHandler(result){
        this.fetchChats();
    }

    fetchChats(){
        this.setIsLoaded(false);
        axios.get(`http://localhost:3000/api/v1/users/${this.userId}/chats`)
            .then(this.onCompleteFetch)
    }

    addChat(chatName){
        axios.post(`http://localhost:3000/api/v1/users/${this.userId}/chats`, {name: chatName })
            .then(this.onCompleteAdd)
    }

    get isLoaded() {
        return this.values.get('isLoaded');
    }

    setChats(value){
        this.chats = value;
    }

    setIsLoaded(value){
        this.values.set('isLoaded', value);
    }
}

export default DataStore;
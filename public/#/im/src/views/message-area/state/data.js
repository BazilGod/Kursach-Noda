import { observable, action } from "mobx";
import axios from 'axios';

class DataStore {
    messages = observable([]);
    /*values = observable.map({
        isLoaded: false,
    });*/

    constructor() {
    }

    get isLoaded() {
        return this.values.get('isLoaded');
    }

    setMessages(value){
        this.messages = value;
    }

    setIsLoaded(value) {
        this.values.set('isLoaded', value);
    }
}
export default DataStore;
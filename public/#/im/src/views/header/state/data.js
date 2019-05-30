import { observable, action } from "mobx";
import axios from 'axios';

class DataStore {
    values = observable.map({
        isHide: false,
    });

    constructor(){

    }

    get isHide() {
        return this.values.get('isHide');
    }

    setIsHide(value){
        this.values.set('isHide', value);
    }
}

export default DataStore;
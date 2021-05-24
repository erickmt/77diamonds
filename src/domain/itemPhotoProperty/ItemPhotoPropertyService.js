export default class ItemPhotoPropertyService {
    constructor(resource) {

        this._resource = resource('api/ItemPhotoPropertySets{/?nameProperty=}');
    }

    searchMetals(){
        return this.search('Metal')            
    }

    searchShapes(){
        return this.search('Shape')            
    }

    search(nameProperty){
        return this._resource.get({nameProperty})
                .then(res=>res.json());
            
    }
}
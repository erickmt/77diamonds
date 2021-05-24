export default class ItemService {
    constructor(resource) {

        this._resource = resource('api/items{/id}');
    }

    create(item) {
        if(item.Id){
            return this._resource
                    .update({id: item.Id}, item)
        }
        else
            return this._resource.save(item);
    }

    search() {

        return this._resource.query()
          .then(res => res.json(), 
                err => 
                {
                    console.log(err);
                    throw new Error("Couldn't find items");
                });
    }

    delete(id){
        return this._resource.delete({id})
            .then(null, err => { console.log(err); throw new Error("Couldn't delete item") });
    }

    search(id){
        return this._resource.get({id})
                .then(res=>res.json());
            
    }
}
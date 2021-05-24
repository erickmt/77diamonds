export default class TypeService {
    constructor(resource) {

        this._resource = resource('api/Types');
    }


    search() {

        return this._resource.query()
          .then(res => res.json(), 
                err => 
                {
                    console.log(err);
                    throw new Error("Couldn't find types");
                });
    }
}
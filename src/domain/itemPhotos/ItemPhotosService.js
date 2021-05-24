export default class ItemPhotoService {
    constructor(resource) {

        this._resource = resource('api/itemPhotos{/?itemId=}{/&metal=}{/&shape=}');
    }

    create(itemPhotos, file) {

       return  this.toBase64(file)
            .then(file64 => 
                {
                    itemPhotos.File = file64;
                    return this._resource.save(itemPhotos)
                });   
    }


    search() {

        return this._resource.query()
          .then(res => res.json(), 
                err => 
                {
                    console.log(err);
                    throw new Error("Couldn't find item's photos");
                });
    }

    delete(id){
        return this._resource.delete({id})
            .then(null, err => { console.log(err); throw new Error("Couldn't delete photo") });
    }

    search(itemId, metal, shape){
        return this._resource.get({itemId, metal, shape})
                .then(res=>res.json());
            
    }

    toBase64(file){
        return  new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        })
    }
}
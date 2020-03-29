const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return response.json({ id });
    },

    async delete(request, response){
        const {ongId} = request.params;

        await connection('ongs').where('id', ongId).delete();

        //await connection('ongs').delete();

        return response.status(204).send();

    }
}
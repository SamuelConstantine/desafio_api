import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Veiculo from 'App/Models/Veiculo';
import axios from 'axios';


export default class VeiculosController {

    public async create({request}:HttpContextContract) {
        let {placa, descricao, cor, modelo, id_user, endereco } = request.all();

        const { data } = await axios({
            url: `https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${endereco}`
        });

        const user = await Veiculo.create({
            placa,
            descricao,
            cor, 
            modelo, 
            id_user,
            endereco,
            latitude: data[0].lat,
            longitude: data[0].lon
        });

        return user;
    };

    public filtrado(context: HttpContextContract) {
        let veiculo = new Veiculo();
        let campo = context.params.campo;
        return veiculo.filtro(campo);
    };

    public veiculos(context: HttpContextContract) {
        let veiculo = new Veiculo();
        return veiculo.veiculos();
    };

    public editadarVeiculos(context:HttpContextContract){
        let veiculo = new Veiculo();
        let campos = context.request.all();
        let id = context.params.id;  
        return veiculo.editVeiculos(campos,id);
    };

    public veiculosUser(context: HttpContextContract) {
        let veiculo = new Veiculo();
        let user = context.params.user;
        return veiculo.veiculosUsers(user);
    };

    public editQuantidade(context:HttpContextContract) {
        let veiculo = new Veiculo();
        let user = context.params.user;
        let id = context.params.id;
        return veiculo.editQuantidade(user,id);

    };

    public coordenada(context:HttpContextContract) {
        let veiculo = new Veiculo();
        let lat = context.params.lat;
        let lon = context.params.lon;
        return veiculo.latLon(lat, lon);

    };

    
}

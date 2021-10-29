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
            endereco
        });

        return user;
    }

    public filtrado(context: HttpContextContract) {
        let veiculo = new Veiculo();
        let campo = context.params.campo;
        return veiculo.filtro(campo);
    }

    public veiculos(context: HttpContextContract) {
        let veiculo = new Veiculo();
        return veiculo.veiculos();
    }

    public editadoAviso(context:HttpContextContract){
        let veiculo = new Veiculo();
        let campos = context.request.all();  
        return veiculo.editAviso(campos)
    }

    public veiculosUser(context: HttpContextContract) {
        let veiculo = new Veiculo();
        let user = context.params.user;
        return veiculo.veiculosUsers(user);
    }

    
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Veiculo extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public placa: string

    @column()
    public descricao: string

    @column()
    public cor: string

    @column()
    public modelo: string

    @column()
    public endereco: string

    @column()
    public id_user: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime


    // Filtrar Veículos (ID, PLACA, DESCRIÇÃO, COR, MODELO E ENDEREÇO DO VEÍCULO.)
    public async filtro(campos) {

        let filtrado;

        filtrado = await Database.from('veiculos')
            .select("*")
            .orderBy(campos)

        return filtrado
    };


    // Lista de Veículos
    public async veiculos() {

        let veiculos;

        veiculos = await Database.from('veiculos')
            .select("*")

        return veiculos
    }


    // Editar Veículos
    public async editVeiculos(edit, id) {
        let editado;

        editado = await Database.from('veiculos')
                                .update(edit)
                                .where('id', id)

        return editado;
    }

    //Todos os veículos associados a um usuário
    public async veiculosUsers(user){
        let dados;

        dados = await Database.from('veiculos')
                              .select('*')
                              .join('users AS u', 'id_user', 'u.id')
                              .where('id_user', user)


        return dados
    }

    public async editQuantidade(user,veiculo) {
        let editado;

        editado = await Database.from('veiculos')
                                .update('id_user', user)
                                .where('id', veiculo)

        return editado;
    }
}

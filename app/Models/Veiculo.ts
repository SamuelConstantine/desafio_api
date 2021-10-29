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


    // Filtrar Veiculos (ID, PLACA, DESCRIÇÃO, COR, MODELO E ENDEREÇO DO VEÍCULO.)
    public async filtro(campos) {

        let filtrado;

        filtrado = await Database.from('veiculos')
            .select("*")
            .orderBy(campos)

        return filtrado
    };


    // Lista de Veiculos
    public async veiculos() {

        let veiculos;

        veiculos = await Database.from('veiculos')
            .select("*")

        return veiculos
    }


    // Editar Veiculos
    public async editAviso(edit) {
        let editado;
        console.log('CAMPOS', edit)

        editado = await Database.from('veiculos')
                                .update(edit)
                                .where('id', 10)

        console.log('Ediatado', editado)
        return editado;
    }

    //Todos os veículos associados a um usuário
    public async veiculosUsers(user){
        let dados;

        dados = await Database.from('veiculos')
                              .select('*')
                              .join('users AS u', 'id_user', 'u.id')
                              .where('id_user', user)

        console.log(dados)

        return dados
    }

    // public async editQuantidade(use,veiculo) {
    //     let editado;
    //     console.log('CAMPOS',use)

    //     editado = await Database.from('veiculos')
    //                             .update('id_user', use)
    //                             .where('id', veiculo)

    //     console.log('Ediatado',editado)
    // }
}

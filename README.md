# desafio_api

   Para iniciar minha API rodei o comando (npm init adonis-ts-app@latest desafio).

    Por uma questão de organização separei minhas funções nos meus Models (User.ts e Veiculo.ts) e criei Controllers(AuthController.ts, VeiculosController.ts e UsersController.ts) para referência minha funções para as rotas e no meu arquivo de rotas routes.ts criei 2 grupos (user e veiculos) para ficar mais fácil de entender.
        Ex:

        Route.group(() => {
            Route.post('create', 'UsersController.create')

            Route.post('login', 'AuthController.store');

            Route.get('all','UsersController.full')
        }).prefix('/user');

        Route.group(() => {

            Route.post('create', 'VeiculosController.create')

            Route.post('coordenada/:lat/:lon', 'VeiculosController.coordenada')

            Route.post('/filtro/:campo', 'VeiculosController.filtrado')

            Route.get('/full', 'VeiculosController.veiculos')

            Route.post('/user/:user', 'VeiculosController.veiculosUser')

            Route.post('/edit/:id', 'VeiculosController.editadarVeiculos')

            Route.post('/quantidade/:user/:id', 'VeiculosController.editQuantidade')
            
        }).prefix('/veiculos');

    Para utilizar o MySQL usei o comando npm i (@adonisjs/lucid) e configurei ele para o tipo de banco de dado que irei utilizar, MySQL.

    Utilizei o WampServer para hospedar meu banco de dados. 

    Quando fui criar meu bando de dados usei MySQL Workbench para ter uma visualização mais agradável.

    Para criar minhas colunas usei o Schema migrations com comando node ace make:migration ('nome da coluna').

    Para cadastrar meus usuários fiz uma função chamada 'public async create' que recebe email e password e cadastra no banco de dados, com o @adonisjs/auth a senha ja vai criptografada para o banco.

    A fim de fazer a autenticação do usuário utilizei o AdonisJS Auth, criei um Controller so para isso (AuthController) e fiz uma função que valida o user e criar um token de acesso para ele:

        public async store({ auth, request, response }: HttpContextContract) {
                let {email, password} = request.all();
                
                try {
                    const token = await auth.use('api').attempt(email, password);
                    return token
                } catch (e){
                    return response.badRequest('Invalid credentials');
                }
        }

    Criei uma Migration para criar a tabela veículos com os campos requisitados e criei 2 campos para a latitude e longitude:

        public async up () {
                this.schema.createTable(this.tableName, (table) => {
                table.increments('id')
                table.string('placa', 255)
                table.string('descricao', 255)
                table.string('cor', 255)
                table.string('modelo', 255)
                table.string('endereco', 255)
                table.string('longitude')  
                table.string('latitude')
                table.integer('id_user')
                    .unsigned()
                    .nullable()
                    .references('id')
                    .inTable('users')
                    .onUpdate('CASCADE')
                    .onDelete('CASCADE')

                table.timestamps(true,true)
                })
            }
                
    No momento de cadastrar o veículo usei o serviço de terceiro para adicionar as coordenadas (Latitude e Longitude):

        public async create({request}:HttpConttContract) {
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
            }

    Em minha constante {data} ele recebe as informações de acordo com o endereço enviado. : 
    [
        { 
            "place_id":138005811,
            "licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"way",
            "osm_id":158238425,
            "boundingbox":["-3.8123424","-3.8120594","-38.5201248","-38.5192673"],
            "lat":"-3.8123424",
            "lon":"-38.5192673",
            "display_name":"Rua Coelho Garcia, Passaré, Fortaleza, Região Geográfica Imediata de Fortaleza, Região Geográfica Intermediária de Fortaleza, Ceará, Região Nordeste, 60861-810, Brasil",
            "class":"highway",
            "type":"residential",
            "importance":0.5,
            "address":{
                "road":"Rua Coelho Garcia",
                "suburb":"Passaré",
                "city":"Fortaleza",
                "municipality":"Região Geográfica Imediata de Fortaleza",
                "state_district":"Região Geográfica Intermediária de Fortaleza",
                "state":"Ceará","region":"Região Nordeste",
                "postcode":"60861-810",
                "country":"Brasil",
                "country_code":"br"
                }
            }
    ]

    Para Filtrar os veículos na posição de acordo com qualquer um dos filtros passados (ID, PLACA, DESCRIÇÃO, COR, MODELO E ENDEREÇO DO VEÍCULO), fiz uma função que recebe o campo que deseja ser filtrado. : http://localhost:3333/veiculos/filtro/id <- Rota

        Resultado:
        [
                {
                    "id": 2,
                    "placa": "CMG3164",
                    "descricao": "Carro Gol",
                    "cor": "Branco",
                    "modelo": "Gol, da Volkswagen",
                    "endereco": "rua tai",
                    "id_user": 1,
                    "created_at": "2021-11-01T13:04:38.000Z",
                    "updated_at": "2021-11-01T13:04:38.000Z",
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 3,
                    "placa": "RIO2A18",
                    "descricao": "UNO",
                    "cor": "Preto",
                    "modelo": "Uno, da Fiat",
                    "endereco": "rua Fiat",
                    "id_user": 2,
                    "created_at": "2021-11-01T13:05:22.000Z",
                    "updated_at": "2021-11-01T13:05:22.000Z",
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 4,
                    "placa": "BRA2A87",
                    "descricao": "Celtya",
                    "cor": "Roxo",
                    "modelo": "Celta, da General Motors",
                    "endereco": "rua Celta",
                    "id_user": 3,
                    "created_at": "2021-11-01T13:06:25.000Z",
                    "updated_at": "2021-11-01T13:06:25.000Z",
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 5,
                    "placa": "ABC2A20",
                    "descricao": "HB20",
                    "cor": "Vermelho",
                    "modelo": "HB20, da Hyundai",
                    "endereco": "rua HB20",
                    "id_user": 3,
                    "created_at": "2021-11-01T13:07:29.000Z",
                    "updated_at": "2021-11-01T13:07:29.000Z",
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 6,
                    "placa": "AAA2B11",
                    "descricao": "Corsa",
                    "cor": "Amarelo",
                    "modelo": "Corsa Sedan, da General Motors",
                    "endereco": "rua Corsa",
                    "id_user": 1,
                    "created_at": "2021-11-01T13:08:14.000Z",
                    "updated_at": "2021-11-01T13:08:14.000Z",
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 7,
                    "placa": "BB2C175",
                    "descricao": "Onix",
                    "cor": "Vinho",
                    "modelo": "Onix, da General Motors",
                    "endereco": "rua Onix",
                    "id_user": 2,
                    "created_at": "2021-11-01T13:09:07.000Z",
                    "updated_at": "2021-11-01T13:09:07.000Z",
                    "longitude": null,
                    "latitude": null
                },
                {
                    "id": 10,
                    "placa": "BB2C175",
                    "descricao": "Onix",
                    "cor": "Vinho",
                    "modelo": "Onix, da General Motors",
                    "endereco": "rua coelho garcia, 81",
                    "id_user": 2,
                    "created_at": "2021-11-01T13:34:28.000Z",
                    "updated_at": "2021-11-01T13:34:28.000Z",
                    "longitude": "-38.5192673",
                    "latitude": "-3.8123424"
                }
        ]

    Com intuito de retorna os valores de acordo com a coordenada passada, fiz uma função que recebe 2 parâmetros (lat  e lon):

        public async latLon(lat, lon) {
            let result;

            result = await Database.from('veiculos')
                                .select('*')
                                .where('latitude', lat)
                                .where('longitude', lon)
                                
            return result;

        }

    Ex: http://localhost:3333/veiculos/coordenada/-3.8123424/-38.5192673 <- Rota

        Resultado:
        [
            {
                "id": 10,
                "placa": "BB2C175",
                "descricao": "Onix",
                "cor": "Vinho",
                "modelo": "Onix, da General Motors",
                "endereco": "rua coelho garcia, 81",
                "id_user": 2,
                "created_at": "2021-11-01T13:34:28.000Z",
                "updated_at": "2021-11-01T13:34:28.000Z",
                "longitude": "-38.5192673",
                "latitude": "-3.8123424"
            }
        ]

    Para listar todas as informações de veículos, criei uma função com rota GET que não recebe nenhum parâmetro e traz todos os veículos cadastrados.
 :

        public async veiculos() {

            let veiculos;

            veiculos = await Database.from('veiculos')
                                    .select("*")

            return veiculos;
        };

    Quando fui criar um serviço para editar as informações de um veículo, fiz uma função que recebe 2 parâmetros (edit e id), edit  é qual ou quais campos vão ser editado e id é para saber qual carro vai ser alterado:
    
        public async editVeiculos(edit, id) {
            let editado;

            editado = await Database.from('veiculos')
                                    .update(edit)
                                    .where('id', id)

            return editado;
        };

    Ex: http://localhost:3333/veiculos/edit/7 <- Pela rota informamos qual veículo vai ser editado 

    Pelo Body no formato JSON mandamos o campo que vai ser editado: 

        {
            "placa":"1542AB",
            "descricao": "editando",
            "cor": "Azul",
            "modelo":"Onix 02"
        }

    No momento de criação da tabela de veículos fiz uma Foreign Key (Chave estrangeira) para relaciona a tabela de veiculos com a de user:

        table.integer('id_user')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE') 

    O 'id_user' recebe o id do usuário, assim sabemos qual carro é desse usuario.

    Para retorna todos os veículos associados a um usuário fiz uma função que recebe o id do usuário como parâmetro:

        public async veiculosUsers(user){
            let dados;

            dados = await Database.from('veiculos')
                                .select('*')
                                .join('users AS u', 'id_user', 'u.id')
                                .where('id_user', user)

            return dados;
        };
    
    Com o INNER JOIN que relaciona uma ou mais tabelas.

    Ex: http://localhost:3333/veiculos/user/1 <- Rota com id do usuário

        Resultado:

        [
            {
                "id": 1,
                "placa": "CMG3164",
                "descricao": "Carro Gol",
                "cor": "Branco",
                "modelo": "Gol, da Volkswagen",
                "endereco": "rua tai",
                "id_user": 1,
                "created_at": "2021-11-01T13:01:24.000Z",
                "updated_at": "2021-11-01T13:01:24.000Z",
                "longitude": null,
                "latitude": null,
                "email": "Samuel@123",
                "password": "$argon2id$v=19$t=3,m=4096,p=1$5Y0xLDg7VDSuywdFYqav7A$/rKF9gn7BBG1/DUbCnizr+u9zSPJgCZGGSQwZw4KAII",
                "token": null,
                "expires_at": null
            },
            {
                "id": 1,
                "placa": "AAA2B11",
                "descricao": "Corsa",
                "cor": "Amarelo",
                "modelo": "Corsa Sedan, da General Motors",
                "endereco": "rua Corsa",
                "id_user": 1,
                "created_at": "2021-11-01T13:01:24.000Z",
                "updated_at": "2021-11-01T13:01:24.000Z",
                "longitude": null,
                "latitude": null,
                "email": "Samuel@123",
                "password": "$argon2id$v=19$t=3,m=4096,p=1$5Y0xLDg7VDSuywdFYqav7A$/rKF9gn7BBG1/DUbCnizr+u9zSPJgCZGGSQwZw4KAII",
                "token": null,
                "expires_at": null
            }
        ]

    Um serviço para editar a quantidade e relação de veículos associado a um usuário fiz uma função que recebe 2 parâmetros (user, veiculo):

        public async editQuantidade(user,veiculo) {
            let editado;

            editado = await Database.from('veiculos')
                                    .update('id_user', user)
                                    .where('id', veiculo)

            return editado;
        };

    Ex: http://localhost:3333/veiculos/quantidade/6/2 <- Primeiro parâmetro é o id do usuário e o segundo é o id do veículo.


    Em quase todas as minha funções usei a própria linguagem do MYSQL como por exemplo (SELECT, UPDATE,WHERE,INNER JOIN E ORDER BY) mas com a ajuda do Adonis/Lucid/Database  
}


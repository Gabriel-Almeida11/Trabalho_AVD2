const express = require('express')
const app= express()
app.use(express.json())
const uuid= require('uuid')


let funcionarios=[
    {id: uuid.v4(), nome: 'josé', funçao: 'chefe', departamento: 'informatica', email:'exemplo@gmail.com', telefone:'0000-0000' }
]

const CheckInArray = (request, response, next) =>{
    const {id} = request.params
    const funcid= funcionarios.find(func => func.id === id)
    console.log(funcid)

    if(!funcid){
        return response
            .status(400)
            .json({Error: 'Id inexistente.'})
    }
    return next()
}

const validafunc = (request, response, next) =>{
    const {nome, funçao, departamento, email, telefone} = request.body
    if(!nome || !funçao || !departamento || !email || !telefone){
        return response
        .status(400)
        .json({Error:'Um dos campos está incompleto, favor preencher todos.'})
    }
    return next()
}


app.get('/funcionarios', (request, response) =>{
    return response
        .status(200)
        .json(funcionarios)
})

app.get('/funcionarios/:id', CheckInArray, (request, response) =>{
    const {id} = request.params
    const funcid= funcionarios.find(func => func.id === id)
    return response
        .status(200)
        .json(funcid)
})



app.post('/funcionarios', validafunc, (request, response) =>{
    const {nome, funçao, departamento, email, telefone} = request.body
    const dadosfunc={
        id: uuid.v4(),
        nome,
        funçao,
        departamento,
        email,
        telefone
    }
    funcionarios=[...funcionarios, dadosfunc]
    return response
        .status(200)
        .json(dadosfunc)

})

app.delete('/funcionarios/:id', CheckInArray, (request, response) =>{
    const {id} = request.params
    const indice = funcionarios.findIndex(funcionario => funcionario.id === id)
    funcionarios.splice(indice, 1)
    return response
        .status(200)
        .json({message:'Excluido com sucesso.'})
})

app.put('/funcionario/:id', CheckInArray, validafunc, (request, response) =>{
    const {nome, funçao, departamento, email, telefone} = request.body
    const {id} = request.params
    let indice= funcionarios.findIndex(funcionario => funcionario.id === id)
    const dadosfunc={
        id,
        nome,
        funçao,
        departamento,
        email,
        telefone
    }
    funcionarios.splice(indice, 1, dadosfunc)
    return response
        .status(200)
        .json(dadosfunc)
})



app.listen(3333, () =>{
    console.log('Servidor Rodando !!')
})
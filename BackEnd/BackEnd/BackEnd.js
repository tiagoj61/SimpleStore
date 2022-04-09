var express = require('express');
var bodyParser = require('body-parser');
var sql = require("mssql");
var cors = require('cors');

var app = express();

var config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'Atividade'
};

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/listatendimentos', function (req, res) {

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query('select * from Atendimento', function (err, recordset) {

            if (err) console.log(err)

            res.send(recordset);

        });
    });
});

app.get('/get', function (req, res) {
    let insertQuery = "select Lugares.nome_lugar,aux.primeiro_nome,aux.ultimo_nome from Lugares INNER JOIN(select Empregados.primeiro_nome,Empregados.ultimo_nome,Empregados_Lugares.* from Empregados INNER JOIN Empregados_Lugares on Empregados.id_empregado=Empregados_Lugares.id_empregado) aux on Lugares.id_lugar=aux.id_lugar";
 
    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);
       request.query(insertQuery, function (err, recordset) {

            if (err) console.log(err)

            res.send(recordset);

        });
    });
});

app.get('/listempregados', function (req, res) {

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query('select * from Empregados', function (err, recordset) {

            if (err) console.log(err)

            res.send(recordset);

        });
    });
});


app.post('/getempregado', function (req, res) {
    console.log(req.body.id_empregado)
    let param = [req.body.id_empregado];
    let insertQuery = "select * from Empregados where id_empregado="+ param[0];

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query(insertQuery, function (err, recordset) {

            if (err) throw err;

            res.send(recordset.recordset);

        });
    });
});


app.get('/listlugares', function (req, res) {

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query('select * from Lugares', function (err, recordset) {

            if (err) console.log(err)

            res.send(recordset);

        });
    });
});
app.post('/inserirVenda', function (req, res) {
    console.log(req.body.test1)
    console.log('112312')
    console.log(req.body.test2)
    let param = [req.body.test1, req.body.test2];
    let insertQuery = "Insert into Empresas(nome_empresa,cnpj) values ('" + param[0] + "','" + param[1] + "')";

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query(insertQuery, function (err, recordset) {

            if (err) throw err;

            res.send(recordset);

        });
    });
});

app.post('/inserirempregado', function (req, res) {
    console.log('entrou')
    console.log(req.body.primeiro_nome)
    console.log(req.body.ultimo_nome)
    console.log(req.body.salario)
    let param = [req.body.primeiro_nome, req.body.ultimo_nome,req.body.salario];
    let insertQuery = "Insert into Empregados(primeiro_nome,ultimo_nome,salario) values ('" + param[0] + "','" + param[1] + "','" + param[2] + "')";

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query(insertQuery, function (err, recordset) {

            if (err) throw err; 
            console.log(recordset)
            res.send(recordset);

        });
    });
});

app.post('/getIdFromEmpregados', function (req, res) {
    console.log(req.body.primeiro_nome)
    console.log(req.body.ultimo_nome)
    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query("select * from Empregados where primeiro_nome='"+req.body.primeiro_nome+"' and ultimo_nome='"+req.body.ultimo_nome+"'", function (err, recordset) {

            if (err) console.log(err)
            console.log(recordset.recordset)
            res.send(recordset.recordset);

        });
    });
});

app.post('/inserempregadolugar', function (req, res) {
    console.log(req.body.id_empregado)
    console.log(req.body.id_lugar)
    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query("Insert into Empregados_Lugares(id_empregado,id_lugar) values("+req.body.id_empregado+","+req.body.id_lugar+")", function (err, recordset) {

            if (err) console.log(err)
            console.log(recordset.recordset)
            res.send(recordset.recordset);

        });
    });
});

app.post('/procedure1', function (req, res) {
    console.log(req.body.id_atendimento)
    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);
 
        request.query("exec LugarAtendimentoM1 "+req.body.id_atendimento, function (err, recordset) {

            if (err) console.log(err)
            res.send(recordset.recordset);

        });
    });
});

app.post('/procedure2', function (req, res) {
    console.log(req.body.cnpj)
    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);
 
        request.query("exec LugarAtendimentoM2 "+req.body.cnpj, function (err, recordset) {

            if (err) console.log(err)
            res.send(recordset.recordset);

        });
    });
});


app.post('/inseriratendimento', function (req, res) {
    console.log(req.body.cliente)
    console.log(req.body.empregado)
    let param = [req.body.cliente, req.body.empregado];
    let insertQuery = "Insert into Atendimento(nome_cliente,id_empregado) values ('" + param[0] + "','" + param[1] + "')";

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query(insertQuery, function (err, recordset) {

            if (err) throw err;

            res.send(recordset);

        });
    });
});

app.post('/deleteatendimento', function (req, res) {

    let param = [req.body.cliente];
    let queryDelete = "delete from Atendimento where nome_cliente='" + param[0] + "'";

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query(queryDelete, function (err, recordset) {

            if (err) throw err;

            res.send(recordset);

        });
    });
});


app.post('/deleteempregado', function (req, res) {
    console.log(req.body.empregado)
    let param = [req.body.empregado];
    let queryDelete = "delete from Empregados where id_empregado=" + param[0] + "";

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query(queryDelete, function (err, recordset) {

            if (err) throw err;

            res.send(recordset);

        });
    });
});


app.post('/deletelugar', function (req, res) {
    console.log(req.body.lugar)
    let param = [req.body.lugar];
    let queryDelete = "delete from Lugares where id_lugar=" + param[0] + "";

    sql.connect(config, function (err) {

        let request = new sql.Request();

        if (err) console.log(err);

        request.query(queryDelete, function (err, recordset) {

            if (err) throw err;

            res.send(recordset);

        });
    });
});

app.listen(5000, function () {
    console.log('Server is running at door: 5000 ...');
});
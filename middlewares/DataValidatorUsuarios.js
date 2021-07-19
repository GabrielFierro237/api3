const { Schema } = require("joi");
const { nombreUsuario, ValidarUsuario } = require(`../lib/Schema/ValiUsuarios`)

function DataValidatorUsuario(check = "query", Schema){
    return (req, res, next)=>{
        var data = req[check]
        const {error, value} = Schema.validate(data);

        if(error){
            res.status(406).json({
                msg: error.details[0].message,
            })
        }else{
            req[check]=value
            next()
        }
    }    
}

//Primero se pone el nombre de la llave luego la funcion
module.exports.DataValidatorUsuario=DataValidatorUsuario;
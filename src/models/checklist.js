const mongoose = require('mongoose');

const checkListSchema = mongoose.Schema({
  name: {type: String, required: true},
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'  
  }]  
})

module.exports = mongoose.model('Checklist', checkListSchema);

//// nota: para testar no node ....
/// abir o TERMINAL DO VSCODE e digitar os comandos abaixo para testar o model
//  node
// require('./config/database')
//  const Checklist = require('./src/models/checklist');
//  const Task = require('./src/models/task');
//  let checklist = new Checklist({});
//  checklist.save().then( (res) => console.log(res)).catch( (e) => console.log(e));
//  Checklist.create({name: 'Criar um novo codigo'}, (err, checklist) => console.log(err));
//  Checklist.create({ name: 'Criar um novo codigo' }, (err, checklist) => console.log(checklist));
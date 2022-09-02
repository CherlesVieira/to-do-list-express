const express = require('express');
const router = express.Router();

//importar o Model 
const Checklist = require('../models/checklist');

//list all
router.get('/', async (req, res) => {
  try {
    let checklists = await Checklist.find({})
    //res.status(200).json(checklists);
    res.status(200).render('checklists/index', { checklists: checklists });
  } catch (error) {
    //res.status(500).json(error)
    res.status(200).render('pages/error', { error: 'Erro ao exibir as Listas' });
  }
})

router.get('/new', async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render('checklists/new', { checklist: checklist })
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao carregar formulario de novas tarefas' });
  }
})

//list on for Id
router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate('tasks');
    res.status(200).render('checklists/show', { checklist: checklist })
    //res.status(200).json(checklist);
  } catch (error) {
    //res.status(422).json(error)
    console.log(error)
    res.status(200).render('pages/error', { error: 'Erro ao exibir as Listas de tarefas!' });
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/edit', { checklist: checklist })
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir a edicão de Lista de tarefas' });
  }
})

//insert 
router.post('/', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name })
  try {
    await checklist.save();
    res.redirect('/checklists');
  } catch (error) {
    res.status(422).render('checklists/new', { checklist: { ...checklist, error } });
  }
})

//update 
router.put('/:id', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);

  try {
    await checklist.update({ name });
    res.redirect('/checklists')
  } catch (error) {
    let errors = error.erros;
    res.status(422).render('checklists/edit', { checklist: { ...checklist, errors } });
  }
})

//delete 
router.delete('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.redirect('/checklists');
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao remover Lista de tarefas' });
  }
})

module.exports = router;


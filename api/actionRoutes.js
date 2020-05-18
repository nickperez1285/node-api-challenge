const express = require('express');
const actions = require('../data/helpers/actionModel');
const project = require('../data/helpers/projectModel');

const mapper =  require('../data/helpers/mappers.js'); 
const router = express.Router(); 

router.use(logger)

router.get("/", (req, res) => {
  actions
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/:id", (req, res) => {
  actions
    .get(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
    });
});


router.post("/", checker, (req, res) => {
	actions
	.insert(req.body)
	.then(action => { 
		res.status(201).json(action)

	})
	.catch(error => {
      console.log(error);
    });

})


router.put("/:id", checker,  (req,res) => {
	const id = req.params.id

	actions
	.update(id, req.body)
	.then(act => {
		res.status(202).json(act)
	})
	.catch(error => {
      console.log(error);
    });


})


router.delete("/:id", (req,res) => {
	const id = req.params.id
	actions
	.remove(id)
	.then(act => {res.status(204).end()
    })

  .catch(error => {
      res.status(500).json({ error: "The action could not be removed"  });
    });


})

function checker(req, res, next){
	const body = req.body 
	const projID = body.project_id 
	const desc = body.description 
	const notes = body.notes 

	  if(!body || !projID || !desc || !notes){
    res.status(400).json({ message: "missing required action data" })

  }else{
    next()
  }

}

function logger(req, res, next){
	console.log(`method:${req.method}, url: ${req.url}`, new Date())
next()
}



module.exports = router;
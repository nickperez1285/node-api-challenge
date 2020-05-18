const express = require('express');
const project = require('../data/helpers/projectModel');
const action = require('../data/helpers/actionModel');

const mapper =  require('../data/helpers/mappers.js'); 
const router = express.Router(); 
router.use(logger)


// double check 

router.get('/', (req, res) => {

  project.get()
    .then(projects => {
		res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });

});


router.get('/:id', (req, res) => {
	const id = req.params.id 

  project.get(id)
    .then(projects => {
		res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });

});


router.get('/projectAction/:id', (req, res) => {
	const id = req.params.id

  project.getProjectActions(id)
    .then(projects => {
		res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });

});

router.post("/", (req, res) => {
  project.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {

const id = req.params.id 

  project.remove(id)
    .then(project => {
    	if(project){
    		res.status(204).end();
}else{
	res.status(404).json({ message: "The project with the specified ID does not exist." }) 
}
    })
    .catch(error => {
      res.status(500).json({ error: "The project could not be removed"  });
    });

});


router.put('/:id', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
      res
        .status(400)
        .json({ message: "Please provide id and    description to update prject" });
    } else {
      project.update(req.params.id, req.body)
        .then(proj => {
          res.status(201).json(proj);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "There was an error while saving the     post to the database."
          });
        });
    }
})




function logger(req, res, next){
	console.log(`method:${req.method}, url: ${req.url}`, new Date())
next()
}

module.exports = router;
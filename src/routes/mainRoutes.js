const express = require('express');
const path = require('path');
const roleCheck = require('../middleware/roleCheck');
const authenticateToken = require('../middleware/authenticate'); // Import the middleware
const router = express.Router();



router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/admin/home', authenticateToken, (req, res) => {
  // const id = req.user.user_id;
  // const username = req.user.username;
  // const role = req.user.role_name;
  console.log(req.user);
  const user = req.user;

  // console.log(`${user},${id},${username},${role}`)

  //   // if (!id || isNaN(id) || !email || !role || role != "admin") {
  //   //     return res.status(403).send({ error: 'Unauthorized Access' });
  //   // }
  if(user){
    res.sendFile(path.join(__dirname, '../views/admin/index.html'));
  }else{
    res.status(403).send({ error: 'Unauthorized Access' });
  }
  
});


module.exports = router;
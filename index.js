const express = require('express')
const bodyParser = require('body-parser')
// const users = require('./routers/users')
const app = express()
const port = process.env.PORT || 5500
// app.use(users)

const { users } = require('./state')
const usersCount = users.length;


/* BEGIN - create routes here */

///GET /users
app.get('/users', (req, res) => {
  return res.json(users)
});

///GET users/1
app.get('/users/1', (req, res) => {
  return res.json(users[0])
});

///GET users/:userId
app.get('/users/:userId', (req, res) => {
  const id = req.params.userId
  console.log(id)

 const filteredUsers = users.filter(user => user._id === Number(id)); 
 res.json(filteredUsers)
});

/// POST /users
app.post('/users/:userId'), (req, res) => {
  const newUser = {
    _id: usersCount + 1, 
    ...req.body
  }
  users.push(newUser);
  res.json(newUser)
}; 

///PUT /users/1
app.put('/users/1', (req, res) => {
  users.forEach(user => {
    if (user._id == 1) {
      user.name = req.body.name;
      user.occupation = req.body.occupation;
      user.avatar = req.body.avatar;
    }
    res.json(users)
  });
});

//PUT users/:userId
app.put('/users/:userId', (req, res) => {
  const found = users.some(user => user._id === Number(req.params.id));

  if (found) {
    const updatedUser = req.body;
    users.forEach(user => {
      if(user._id === Number(req.params.id)) {
      user.name = updatedUser.name ? updatedUser.name : user.name;
      user.occupation = updatedUser.occupation ? updatedUser.occupation : user.occupation;
      user.avatar = updatedUser.avatar ? updatedUser.avatar : user.avatar;
    };
    });
  };
});

/// DELETE /users/1
app.delete('/users/1', (req, res) => {
  let newUsers = users.slice(1);
  // return res.send({ msg: `Deleted`})
  res.json(newUsers)
})

/// DELETE /users/:userId
app.delete('/users/:userId', (req, res) => {
  const id =req.params.userId;

const filteredUsers = users.filter(user => user._id === Number(id)); 
 if(filteredUsers) {
   filteredUsers.isActive = "false";
  //  res.send({msg: 'Deleted' });
   res.json(filteredUsers)
 }
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))
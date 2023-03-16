const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const {getDATA, getAllUsers, getAllPosts, getUserById, getPostById, getPostsByUserId, getPostsByDateRange } = require('./controller');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: ['http://localhost:4200']
}));
app.use(bodyParser.json());

app.get('/users', (req,res) => {
  const users = getAllUsers();
  if (users) {
    res.json(users);
 } else {
    res.status(404).json({ error: `Users not found` });
  }
});

app.get('/user', (req, res) => {
  const userId = parseInt(req.query.id);
  const user = getUserById(userId);

  if (user) {
    res.json(user);
 } else {
    res.status(404).json({ error: `User with ID ${userId} not found` });
  }
});

app.get('/posts', (req,res) => {
  const posts = getAllPosts();
  if (posts) {
    res.json(posts);
 } else {
    res.status(404).json({ error: `Posts not found` });
  } 
});

app.get('/post', (req, res) => {
  const postId = parseInt(req.query.id);
  const post = getPostById(postId);

  if (post){
    res.json(post);
  } else {
    res.status(404).json({error: `Post with ID ${postId} not found` });
  }
});

app.get('/postByUser', (req, res) => {
  const userId = parseInt(req.query.userId);
  const post = getPostsByUserId(userId);
  if(post){
    res.json(post);
  }
  else {
    res.status(404).json({error: `Posts with ID ${userId} not found` });
  }
});

app.get('/postsDate', (req, res) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const posts = getPostsByDateRange(startDate, endDate);
  res.json(posts);
});

app.post('/userEmail/:userId/email', (req, res) => {
  const data = getDATA();
  const userId = parseInt(req.params.userId);
  const user = data.users.find(user => user.id === userId);
  if (user) {
    user.email = req.body.email;
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.send('User email updated');
  } else {
    res.status(404).send('User not found');
  }
});

app.put('/addUser', (req, res) => {
  const data = getDATA();
  const newUser = {
    id: data.users.length + 1,
    name: req.query.name,
    email: req.query.email
  };
  data.users.push(newUser);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(newUser);
});


app.put('/addPost', (req, res) => {
  const data = getDATA();
  const UID = parseInt(req.body.user_id);
  const userExists = data.users.find(user => user.id === UID);
  if (!userExists) {
    return res.status(404).send('User not found');
  }
  const newPost = {
    id: data.posts.length + 1,
    title: req.body.title,
    body: req.body.body,
    user_id: UID,
    last_update: new Date().toISOString()
  };
  data.posts.push(newPost);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(newPost);
});

app.put('/editUser/:userId', (req, res) => {
  const data = getDATA();
  const userId = parseInt(req.params.userId);
  const user = data.users.find(user => user.id === userId);
  if (user) {
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'User data updated' });
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {getDATA, getUserById, getPostById, getPostsByDateRange } = require('./controller');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: `User with ID ${userId} not found` });
  }
});


app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = getPostById(postId);

  if (post){
    res.json(post);
  } else {
    res.status(404).json({error: `Post with ID ${postId} not found` });
  }
})

app.get('/postsDate/:bothDates', (req, res) => {
  const string = req.params.bothDates;
  var dates = string.split(",")
  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[1]);
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

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
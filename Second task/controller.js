const express = require('express');
const controller = express();
const fs = require('fs');
const bodyParser = require('body-parser');

controller.use(bodyParser.json());

function getDATA() {
    const data = JSON.parse(fs.readFileSync('data.json'));
    return data;
  }
  
function getUserById(userId) {
    const data = getDATA();
    const users = data.users;
    return users.find(user => user.id === userId);
  }
function getPostById(postId) {
    const data = getDATA();
    const posts = data.posts;
    return posts.find(post => post.id === postId);
  }
function getPostsByDateRange(startDate, endDate) {
    const data = getDATA();
    const posts = data.posts;
    return posts.filter(post => {
      const postDate = new Date(post.last_update);
      return postDate >= startDate && postDate <= endDate;
    });
  }

  module.exports = {
    getDATA,
    getUserById,
    getPostById,
    getPostsByDateRange
  };
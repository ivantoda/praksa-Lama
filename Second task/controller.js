const fs = require('fs');

function getDATA() {
    const data = JSON.parse(fs.readFileSync('data.json'));
    return data;
  }

function getAllUsers(){
  const data = getDATA();
  const users = data.users;
  return users;
}

function getAllPosts(){
  const data = getDATA();
  const posts = data.posts;
  return posts;
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
function getPostsByUserId(userId){
  const data = getDATA();
  const posts = data.posts;
  return posts.filter(post => post.user_id === userId);
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
    getAllUsers,
    getAllPosts,
    getUserById,
    getPostById,
    getPostsByUserId,
    getPostsByDateRange
  };
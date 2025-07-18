const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { User } = require('./models/User.jsx');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const multer  = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs')
const Post = require('./models/PostModel.jsx')
const port = 4000

const salt = bcrypt.genSaltSync(10);
const secret = 'asdf097lkh34h13b4l23h4lknrdciou';

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://blog:vU1ucrHVGdl9DrjU@cluster0.ri4a6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  try {
    const userDoc = await User.create({ 
      username, 
      password:bcrypt.hashSync(password, salt),
    });
    res.json(userDoc) 
  } catch (e) {
    console.log(e)
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  const {username, password } = req.body;
  const userDoc = await User.findOne({username});
  const passOK = bcrypt.compareSync(password, userDoc.password);
  // res.json(passOK);
  if (passOK) {
    // logged in
    jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    })
  }
  else {
    res.status(400).json('wrong credentials')
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  })
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const {originalname, path} = req.file;
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath)

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const {title, summary, content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
    });

    res.json(postDoc);
    // res.json({title, summary, content});
  })
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  // res.json({test:4,fileIs:req.file});
  let newPath = null;
  if(req.file) {
    const {originalname, path} = req.file;
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath)
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const {id, title, summary, content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if(!isAuthor) {
      return res.status(400).json('You are not the author');
    }

    await postDoc.updateOne({
      title, 
      summary, 
      content, 
      cover: newPath?newPath: postDoc.cover,
    });

    res.json(postDoc)
  })
});

app.get('/post', async (req, res) => {
  res.json(await Post.find().populate('author', ['username']).sort({createdAt: -1}).limit(20));
})

app.get('/post/:id', async (req, res) => {
  const {id} = req.params
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.delete('/post/:id', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, userInfo) => {
    if (err) return res.status(401).json('Unauthorized');
    
    const postDoc = await Post.findById(req.params.id);
    if (userInfo.role !== 'admin' && postDoc.author.toString() !== userInfo.id) {
      return res.status(403).json('You are not authorized to delete this post.');
    }

    await postDoc.deleteOne();
    res.json('Post deleted successfully.');
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// vU1ucrHVGdl9DrjU
// mongodb+srv://blog:vU1ucrHVGdl9DrjU@cluster0.ri4a6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

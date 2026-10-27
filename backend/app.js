const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
const session = require('express-session');
const User = require('./models/User');
const Favoris = require('./models/Favoris');
const app = express();
app.use(express.json());

app.use(session({
  secret: '6MX9u2rEU2rdqdMsoytC',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB !'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

  const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès !',
      user: { id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement :', err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement.' });
  }
});

app.post('/signin', async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.', success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Erreur Connexion', success: false });
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({ message: 'Erreur Connexion', success: false });
    }
    res.setHeader('Content-Type', 'text/html')
    const userInfo = new User({ email, password });
    req.session.save(function (err) {
      if (err) {
        console.error('Erreur lors de la sauvegarde de la session :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.status(200).json({ message: 'Connexion réussie', success: true, user:req.session, userInfo:userInfo.email, userId:userInfo._id });
    })

  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.post('/favoris', async (req, res) => {
  try {
    const { tmdbId, userEmail, type } = req.body;

    await Favoris.updateMany(
      { userEmail: { $exists: false } },
      { $set: { userEmail: null } }
    );
    
    const existingItem = await Favoris.findOne({ 
      tmdbId: tmdbId,
      userEmail: userEmail
     });
    if (existingItem) {
      return res.status(401).json({ message: 'Cet élément est déjà enregistré' });
    }

    const newFavoris = new Favoris({ tmdbId, userEmail, type });
    await newFavoris.save();

    res.status(201).json({
      message: 'Favoris ajouté'
    });
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement :', err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement.' });
  }
});


app.post('/getfavoris', async (req, res) => {
  try {
    const { userEmail } = req.body;
    const movies = await Favoris.find({userEmail : userEmail});
    res.status(201).json({
      items: movies
    });
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement :', err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement.' });
  }
});

app.post('/getUserDetails/', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    res.status(200).json({ message: 'Connexion réussie', success: true, email:user.email, userId:user._id });
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement :', err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement.' });
  }
});


module.exports = app;
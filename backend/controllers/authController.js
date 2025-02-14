const User = require("../models/Adm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../jwt_secret/config");
const Store = require("../models/Store");

var authController = {};


authController.userID = function(token) {
  try {
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;
    return userId;
  } catch (err) {
    // Em caso de erro na verificação do token ou token inválido, trate o erro aqui
    console.error("Failed to verify token:", err);
    return null;
  }
}

authController.login = function (req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    
    if (err) return res.status(500).send("Error on the server.");
    
    if (!user) return res.status(404).send("No user found.");
    

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id, name: user.name }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });
};

authController.register = function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
 
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
    function (err, user) {
      if (err) return res.status(500).json(err);

      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id, name: user.name }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, id: user.id, email: user.email });
    }
  );
};

authController.verifyToken = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

authController.verifyTokenAdmin = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err || decoded.role !== "ADMIN")
      return res
        .status(500)
        .send({
          auth: false,
          message: "Failed to authenticate token or not Admin",
        });
    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

authController.show = function (req, res, next) {
  User.findOne({ nif: req.params.nif }).exec((err, dbuser) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      res.json(dbuser);
    }
  });
};

authController.tickets = function (req, res, next) {
  Store.find({ adm: req.params.name }).exec((err, dbuser) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      res.json(dbuser);
    }
  });
};

authController.showAll = function (req, res, next) {
  User.find({}).exec((err, dbusers) => {
    if (err) {
      console.log("Erro a ler");
      next(err);
    } else {
      console.log(dbusers);
      res.json(dbusers);
    }
  });
};
module.exports = authController;

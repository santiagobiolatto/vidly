function admin(req, res, next) {
  if(!req.user.isAdmin){
      res.status(403).send('Access denied');
      return;
  }
  next();
}

module.exports = admin;
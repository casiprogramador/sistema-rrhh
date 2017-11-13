const express = require('express');

exports.ensureAuth = function ensureAuth(req, res, next){
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/');
    }
  };
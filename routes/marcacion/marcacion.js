var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var path = require('path');
var ZKLib = require("zklib");

ZK = new ZKLib({ip:"192.168.130.33",port:4370});

// connect to access control device 
ZK.connect( function() {

  // read the time info from th device 
  ZK.gettime( function(t) {
    console.log("Device clock's time is " + t.toString());
    // disconnec from the device 
    ZK.disconnect();
  });
});

//router.get('/marcacion', (req, res) => {
    //var zk = new ZKLib({ip:"192.168.130.128",port:4370});
    /*var cb=new Array;
    console.log(zk.connect(cb));
    console.log(zk.gettime(cb));
    console.log(zk.disconnect(cb));
    
    var cb;
    console.log(zk);
    zk.connect(cb);
    console.log(zk);
    //console.log(zk._executeCmd(this.CMD_CONNECT, 'aaa', cb));
        res.render('marcacion/marcacion');
  });*/

  router.get('/marcacion', function(req, res, cb) {
    res.render('marcacion/marcacion');
    })

module.exports = router;
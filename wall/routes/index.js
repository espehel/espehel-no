var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET wall page. */
router.get('/wall', function(req, res) {
  res.render('wall', { title: 'My Wall' });
});

/* GET My wall page */
/*router.get('/wall', function(req, res) {
    var db = req.db;
    var collection = db.get('postcollection');
    collection.find({},{},function(e,docs){
        res.render('wall', {
            "postlist" : docs,
            title : 'My Wall'
        });
    });
});*/

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/*POST to Add User Service*/
router.post('/adduser', function(req, res) {
	//set interne DB variable	
	var db = req.db;
	//get form values
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//set collection
	var collection = db.get('usercollection');

	//submit to the db
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if(err) {
			res.send("There was a problem adding the information to database");
		}
		else {
			//setting the header
			res.location("userlist");
			//forward to success page
			res.redirect("userlist");
		}
	});
});

/*POST to Add Post Service*/
/*router.post('/addpost', function(req, res) {
	//set interne DB variable	
	var db = req.db;
	//get form values
	var postAuthor = req.body.postauthor;
	var postContent = req.body.postcontent;

	//set collection
	var collection = db.get('postcollection');

	//submit to the db
	collection.insert({
		"content" : postContent,
		"author" : postAuthor,
		"timestamp" : new Date()
	}, function (err, doc) {
		if(err) {
			res.send("There was a problem adding the information to database");
		}
		else {
			//setting the header
			res.location("wall");
			//forward to success page
			res.redirect("wall");
		}
	});
});*/
module.exports = router;

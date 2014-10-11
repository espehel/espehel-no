var postListData = [];

//DOM Ready
$(document).ready(function(){

	// Add Post button click
    $('#btnAddPost').on('click', addPost);

     // Delete Post link click
    $('#wallPosts').on('click', 'p a.deletepost', deletePost);

	//poulate wall on initial page load
	populateWall();
});

//fill wall with postListData
function populateWall() {
	var wallContent = '';

	//jQuery AJAZ call for json
	$.getJSON('/posts/postlist', function(data){
		data.reverse();
		$.each(data, function(){

			wallContent += '<div class = post>';
			wallContent += '<p class = "postAuthor">' + this.author 
			+ ' - <a href="#" class="deletepost" rel="' + this._id + '">X</a></p>'
			wallContent += '<p class = "postContent">' + this.content.replace(/\n/g,'<br />') + '</p>'
			wallContent += '<p class = "postTimestamp">' + this.timestamp + '</p>'
			wallContent += '</div>'
		});

		//inject the whole content string into our existing div tag
		$('#wallPosts').html(wallContent);
	});
};

function addPost(event) {
	event.preventDefault();

	var newPost = {
		'content': $('#addPost fieldset textarea#inputPostContent').val(),
		'author': $('#addPost fieldset input#inputPostAuthor').val(),
		'timestamp': new Date()
	}

	//use AJAX to post the object to our addpost service
	$.ajax({
		type: 'POST',
		data: newPost,
		url: '/posts/addpost',
		dataType: 'JSON'
	}).done(function(response){
		//check for successful response
		if(response.msg === ''){

			//clear the form inputs
			$('#addPost fieldset input').val('');
			$('#addPost fieldset textarea').val('');
			
			// Update the wall
			populateWall();
		}
		else {
			// if something goes wrong alert the error message
			alert('Error: ' + response.msg);
		}
	});
};

//Delete Post
function deletePost(event) {
	event.preventDefault();

	//confirmation dialog
	var confirmation = confirm('Are you sure you want to delete this wall post');

	//checking result from dialog
	if (confirmation === true) {

		$.ajax({
			type: 'DELETE',
			url: '/posts/deletepost/' + $(this).attr('rel')
		}).done(function(response) {
			if(response.msg === ''){
			}
			else{
				alert('Error ' + response.msg);
			}

			//update the wall
			populateWall();
		});
	}
	else{
		//if they didnt want to delete, do nothing
		return false;
	}
};
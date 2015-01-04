$(document).ready(function(){

	//Add an action listener for the click event on "Post an Update"
	$('#add_post').click(function(event){
		//Prevent link redirect
		event.preventDefault();
		//Ensure text area is clear
		$('#new_post_field').val("");
		//Make modal visible
		$('#post_modal').css('visibility', 'visible');
		//Set the focus to the textarea
		$('#new_post_field').focus();
	});
	
	//Bind response for hitting enter key in modal text area
	$('#new_post_field').keydown(function(event) {
		if (event.keyCode == 13) {
			//Retrieve the number of posts on screen for creating new id
			var post_number = $('#column_two > div').length;
			//Call add post function below to append post to screen
			addPost($('#new_post_field').val(),post_number);
			//Hide modal from screen
			$('#post_modal').css('visibility', 'hidden');
		 }
	});
	
});//End Document Ready

//Function for adding post to the screen
function addPost(post_content,post_number){
	
	//Create new id for post with previous number
	var postid = 'post_'+post_number;
	
	//EXTRA CREDIT: Check if post exists in local storage
	if(!Box.isset(postid)){
		//EXTRA CREDIT: Create object for box.js storage, and store to local storage
		var postObject = {post_number:post_number, content:post_content, type:"post"};
		Box.store(postid,postObject);
	}
	
	//Create an outer div for the post and append to the "Updates" column
	var $post_div = $('<div>', {id: postid, class: 'post'});
	$('#column_two').append($post_div);
	
	//Create img tag and append image to current post container
	var $profile_picture = $('<img>', {src:"images/profile/daniel-craig.jpg", alt:"Profile Picture"});
	$('#'+postid).append($profile_picture);
	
	//Create a div for the content of the post, and append to current post container
	var $post_content_div = $('<div>', {id:"post_content_"+post_number, class:"post_content"});
	$('#'+postid).append($post_content_div);	
	
	//Retrieve post content, and append to content div
	var post_content_id='#post_content_'+post_number;
	var $post_content = $('<p>');
	$(post_content_id).append($post_content);
	$(post_content_id+' p').append('<span class="name">Daniel Craig</span><br>'+post_content);
	
	//Add comment bar
	var comment_input_index = "comment_"+post_number+"_input";
	var $comment_div= $('<div>', {id: comment_input_index, class: "comment_input"});
	$(post_content_id).append($comment_div);
	var $comment_input = '<textarea id="comment_input_'+post_number+'" placeholder="post a comment" class="comment_input_field" rows="1"></textarea>';
	$('#'+comment_input_index).append($comment_input);
	
	//EXTRA CREDIT: Bind response for hitting enter key in comment bar
	$('#comment_input_'+post_number).keydown(function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			//Get the number of comments in the target post for new id, minus one for the initial post (it is not a comment)
			var comment_number = ($('#post_content_'+post_number+' > div').length)-1;
			//EXTRA CREDIT: Call the addComment function below to append comment to screen
			addComment($('#comment_input_'+post_number).val(),post_number,comment_number);
		}
	});
	
}//End addPost function

//Function for adding comment to screen
function addComment(comment_content, post_number, comment_number){
	
	//Clear comment bar
	$('#comment_input_'+post_number).val("");
	//Create new id with number of comments
	var comment_index = "comment_"+post_number+"_"+comment_number;
	
	//EXTRA CREDIT: Check if comment exists in local storage
	if(!Box.isset(comment_index)){
		//EXTRA CREDIT: Create object for box.js storage, and store to local storage
		var commentObject = {post_number:post_number, comment_content:comment_content, comment_number: comment_number, type:"comment"};
		Box.store(comment_index,commentObject);
	}
	
	//Creates a div to hold the comment and appends to screen, just before the comment bar
	var $comment_div= $('<div>', {id: comment_index, class: "comment"});
	$('#comment_'+post_number+'_input').before($comment_div);
	
	//Creates img for user profile picture and appends to screen
	var $comment_picture = $('<img>', {src:"images/profile/daniel-craig.jpg", alt:"Comment Profile Picture"});
	$('#'+comment_index).append($comment_picture);
	
	//Append post content to comment div
	var $comment_content = $('<p>');
	$('#'+comment_index).append($comment_content);
	$('#'+comment_index+' p').append('<span class="name">Daniel Craig</span><br>'+comment_content);	
	
}//End addComment function

$(document).ready(function(){
	//Retrieve user data from the users.json file
	$.getJSON("data/users.json", function(users) {
		
		//Retrieve post & comment data from the posts.json file
		$.getJSON("data/posts.json", function(posts) { 
			
			//Iterate across each post object
			$.each(posts,function(post_index,post){
				
				//Create a post ID using the index variable
				var postid = 'post_'+post_index;
				//Retrieve the user object from the users array
				var the_user = users[post.userId-1];
				
				//Create an outer div for the post and append to the "Updates" column
				var $post_div = $('<div>', {id: postid, class: 'post'});
				$('#column_two').append($post_div);
				
				//Retrieve the image URL from the user object, and append image to current post container
				var $profile_picture = $('<img>', {src:the_user.pic, alt:"Profile Picture"});
				$('#'+postid).append($profile_picture);
				
				//Create a div for the content of the post, and append to current post container
				var $post_content_div = $('<div>', {id:"post_content_"+post_index, class:"post_content"});
				$('#'+postid).append($post_content_div);
				
				//Retrieve post content, and append to content div
				var post_content_id='#post_content_'+post_index;
				var $post_content = $('<p>');
				$(post_content_id).append($post_content);
				$(post_content_id+' p').append('<span class="name">'+the_user.username+'</span><br>'+post.content);
				
				//Check if the post object contains comments
				if(post.comments.length>0){
					
					//Pulls the array of comments into its own variable
					var comments=post.comments;
					
					//iterates across the comment array
					$.each(comments,function(comment_index, comment){
					
						//Pulls the specified user object into its own variable
						var comment_user = users[comment.userId-1];
						
						//Creates comment's id, then creates a div to hold the comment and appends to screen
						var comment_index = "comment_"+post_index+"_"+comment_index;
						var $comment_div= $('<div>', {id: comment_index, class: "comment"});
						$(post_content_id).append($comment_div);
						
						//Retrieve the image URL from the user object, and append image to current comment container
						var $comment_picture = $('<img>', {src:comment_user.pic, alt:"Comment Profile Picture"});
						$('#'+comment_index).append($comment_picture);
						
						//Retrieve post content, and append to comment div
						var $comment_content = $('<p>');
						$('#'+comment_index).append($comment_content);
						$('#'+comment_index+' p').append('<span class="name">'+comment_user.username+'</span><br>'+comment.content);
						
					});
					
					//After all comments are added, a div to hold the comment bar is created and appended 
					var comment_input_index = "comment_"+post_index+"_input";
					var $comment_div= $('<div>', {id: comment_input_index, class: "comment_input"});
					$(post_content_id).append($comment_div);
					
					//The comment bar is created and added to its div container
					var $comment_input = '<textarea id="comment_input_'+post_index+'" placeholder="post a comment" class="comment_input_field" rows="1"></textarea>';
					$('#'+comment_input_index).append($comment_input);
					
					//EXTRA CREDIT: Bind response for hitting enter key in comment bar
					$('#comment_input_'+post_index).keydown(function(event) {
						if (event.keyCode == 13) {
							event.preventDefault();
							//Get the number of comments in the target post for new id, minus one for the initial post (it is not a comment)
							var comment_number = ($('#post_content_'+post_index+' > div').length)-1;
							//EXTRA CREDIT: Call the addComment function in add_content.js to append comment to screen
							addComment($('#comment_input_'+post_index).val(),post_index, comment_number);
						}
					});
					
				}else{
				
					//A div to hold the comment bar is created and appended 
					var comment_input_index = "comment_"+post_index+"_input";
					var $comment_div= $('<div>', {id: comment_input_index, class: "comment_input"});
					$(post_content_id).append($comment_div);
					
					//The comment bar is created and added to its div container
					var $comment_input = '<textarea id="comment_input_'+post_index+'" placeholder="post a comment" class="comment_input_field" rows="1"></textarea>';
					$('#'+comment_input_index).append($comment_input);
					
					//EXTRA CREDIT: Bind response for hitting enter key in comment bar
					$('#comment_input_'+post_index).keydown(function(event) {
						if (event.keyCode == 13) {
							event.preventDefault();
							//Get the number of comments in the target post for new id, minus one for the initial post (it is not a comment)
							var comment_number = ($('#post_content_'+post_index+' > div').length)-1;
							//EXTRA CREDIT: Call the addComment function in add_content.js to append comment to screen
							addComment($('#comment_input_'+post_index).val(),post_index,comment_number);
						}
					});
					
				}
				
				
			});//End post iteration
		
		//EXTRA CREDIT: Call the function that pulls content from local storage, written below
		pull_stored_content();
		
		});//End post retrieval
		
	});//End user retrieval

});//End document ready


//EXTRA CREDIT: Function that retrieves stored content from local storage
function pull_stored_content(){

	//Pull local storage as json
	var jsonDump = Box.dumps('json');

	//Check if the json string is empty
	if(jsonDump!="{}"){
		
		//Parse json into JS object
		var storageObject=JSON.parse(jsonDump);
		
		//Array for the post objects
		var post_array=[];
		
		//Array for the comment objects
		var comment_array=[];
		
		//Loop over JS object
		for (var key in storageObject) {
		
			//Check to make sure it is not prototype data
			if (storageObject.hasOwnProperty(key)) {
				
				//Pull out one comment/post
				var new_object = storageObject[key];
				
				//Check if it is a post or comment
				if(new_object.type == "post"){
					//Add to post array
					post_array.push(new_object);
				}else{
					//Add to post array
					comment_array.push(new_object);
				}
				
			}
		  
		}//End storageObject iteration

		//Sort the arrays so the are reposted in proper order
		comment_array.sort(function(a,b) { return a.comment_number - b.comment_number } );
		post_array.sort(function(a,b) { return a.post_number - b.post_number } );
		
		//Add each post to the screen
		$.each(post_array,function(index, post){
			addPost(post.content,post.post_number);
		});
		
		//Add each comment to the screen
		$.each(comment_array,function(index, comment){
			addComment(comment.comment_content, comment.post_number, comment.comment_number);
		});
						
	}//End if json empty check

}//End pull_stored_content 

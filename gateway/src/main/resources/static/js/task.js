var currentTask = {};	

$(function() {		
	
	console.log("ready!");

	$('#modalSalvarAssunto').modal();
	$('#modalApagarAssunto').modal();
	
					
	
	
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15 // Creates a dropdown of 15 years to control year
	  });
	
	
	getData();	
	
	$(".add-task").click(function() {
		
		currentTask = {};		
		
		$("#taskDescription").val("");
		$("#taskDueDate").val("");
		$("#taskIsCompleted").prop('checked',false);
		$("#taskEmail").val("");
		
	})
	
	$(".delete-task").click(function() {		

		
		console.log(currentTask);
		
		if(currentTask.id) {
			
			$.ajax({
				  "async": true,
				  "crossDomain": true,
				  "url": "task/delete",
				  "method": "POST",
				  "headers": {
				    "content-type": "application/json",
				    "cache-control": "no-cache"					   
				  },
				  "processData": false,
				  "data": JSON.stringify(currentTask)
				}).done(function (response) {					
					console.log(response);					
					Materialize.toast('Exclusão de tarefa - OK!', 3000, 'rounded');	
					getData();
					
			}).fail(function (response) {
				
				console.log(response);
				Materialize.toast('Exclusão de tarefa - erro', 3000, 'rounded');		  
		});			
			
		}			
		
	});
	
	
	$(".save-task").click(function() {
		
		var taskId = currentTask.id;	
		
		currentTask.description = $("#taskDescription").val();
		currentTask.dueDate = $("#taskDueDate").val();
		currentTask.isCompleted = $("#taskIsCompleted").prop('checked');
		currentTask.email = $("#taskEmail").val();
		
		console.log(currentTask);
		
		if(currentTask.id) { 			
			
			$.ajax({
				  "async": true,
				  "crossDomain": true,
				  "url": "task/update",
				  "method": "POST",
				  "headers": {
				    "content-type": "application/json",
				    "cache-control": "no-cache"					   
				  },
				  "processData": false,
				  "data": JSON.stringify(currentTask)
				}).done(function (response) {					
					console.log(response);
					Materialize.toast('Salvar tarefa - OK!', 3000, 'rounded');		
					getData();					
			}).fail(function (response) {
				
				console.log(response);
				Materialize.toast('Salvar tarefa - erro', 3000, 'rounded');		  
		});			

			
			return;
			
		}			
		
		$.ajax({
			  "async": true,
			  "crossDomain": true,
			  "url": "task/create",
			  "method": "POST",
			  "headers": {
			    "content-type": "application/json",
			    "cache-control": "no-cache"					   
			  },
			  "processData": false,
			  "data": JSON.stringify(currentTask)
			}).done(function (response) {					
				console.log(response);
				Materialize.toast('Salvar tarefa - OK!', 3000, 'rounded');		
				getData();					
		}).fail(function (response) {
			
			console.log(response);
			Materialize.toast('Salvar tarefa - erro', 3000, 'rounded');		  
	});			

		
		
		
		
//		$.ajax({
//			url : 'task/create',
//			datatype : 'application/json',
//			type : 'POST',
//			async : false,
//			data : JSON.stringify(currentTask),
//			success : function(data) {
//				console.log(data);
//				Materialize.toast('Criação de usuário - OK!', 3000, 'rounded');
//				getData();
//			},
//			error : function() {
//				Materialize.toast('Criação de usuário - Erro', 3000, 'rounded')
//			}
//		});
		
	});
	
	$("#login").click(function() {

		var user = {
			username : $("#username").val(),
			password : $("#password").val()
		};

		console.log(user);

		if (requestOauthToken(user.username, user.password)) {
			console.log("Login successful");
			$(".loginBox").fadeOut(1000, function() {
				$(".taskList").fadeIn(1000);
			});
		}
	});

	$("#logout").click(function() {
		removeOauthTokenFromStorage()
		$(".taskList").fadeOut(1000, function() {
			$(".loginBox").fadeIn(1000);
		});

	});

	var token = getOauthTokenFromStorage();

	console.log("Token: " + token);

	if (token) {		
		$(".taskList").show();
	} else {
		$(".loginBox").show();		
	}

});





function requestOauthToken(username, password) {

	var success = false;

	$.ajax({
		url : 'uaa/oauth/token',
		datatype : 'json',
		type : 'post',
		headers : {
			'Authorization' : 'Basic YnJvd3Nlcjo='
		},
		async : false,
		data : {
			scope : 'ui',
			username : username,
			password : password,
			grant_type : 'password'
		},
		success : function(data) {
			console.log(data.access_token)
			localStorage.setItem('token', data.access_token);
			success = true;
		},
		error : function() {
			removeOauthTokenFromStorage();
			Materialize.toast('Login incorreto!', 3000, 'rounded')
		}
	});

	return success;
}

function getOauthTokenFromStorage() {
	return localStorage.getItem('token');
}

function removeOauthTokenFromStorage() {
	return localStorage.removeItem('token');
}

function getData() {

	$('.task-row').remove();
	
	$('.modal').modal('close');
	
$.get("task/list", function(data) {
		
		var html; 	
	
		
		$.each(data, function( index, task ) {			
		
			html += "<tr style='text-align:center' class='task-row'>";
			html += "<td>" + task.description + "</td>";
			html += "<td" + task.email + "</td>";
			html += "<td>" + task.dueDate + "</td>";
			html += "<td>" + task.creationDate + "</td>";
			html += "<td>" + task.isCompleted + "</td>";
			html += "<td><a data-target='modalSalvarAssunto' taskId="+ task.id +" class='task-action btn-floating btn-large waves-effect waves-light blue'>";
			html += "<i class='material-icons left'>mode_edit</i></a></td>";
			html += "<td><a data-target='modalApagarAssunto' taskId="+ task.id +" class='task-action btn-floating btn-large waves-effect waves-light red'>";
			html += "<i class='material-icons left'>delete</i></a></td>";
			html += "</tr>";
			
		});
				
		$('#taskList').append(html);
		
		$(".task-action").click(function() {
			
			var taskId = $(this).attr("taskId");

					$.ajax({
						  "async": true,
						  "crossDomain": true,
						  "url": "task/get",
						  "method": "POST",
						  "headers": {
						    "content-type": "application/json",
						    "cache-control": "no-cache"					   
						  },
						  "processData": false,
						  "data": JSON.stringify({"id":taskId})
						}).done(function (response) {
							
							console.log(response);
							
							currentTask = response;
							
							$("#taskDescription").val(currentTask.description);
							$("#taskDueDate").val(currentTask.dueDate);
							$("#taskIsCompleted").prop('checked',currentTask.isCompleted);
							$("#taskEmail").val(currentTask.email);					  
					});			
		
		});	
		
	});		

};

$("#addTask").click(function() {
	console.log("ready");
});

$("#deleteTask").click(function() {
	console.log("ready");
});

$("#editTask").click(function() {
	console.log("ready");
});

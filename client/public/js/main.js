$(document).on('ready', function() {
  $('#editExercises').hide();
  listExercises();
});


//get all the data from the form and create the exercise in the database
$('form').on('submit', function(e){
  e.preventDefault();
  $('#message').html('');
  var payload = {
    name: $('#name').val(),
    description: $('#description').val(),
    tags: $('#tags').val()
  };
console.log(payload)
  $.post('/api/exercises', payload, function(data){
    $('#message').html('Exercise created!');
    $('#name').val("");
    $('#description').val("");
    $('#tags').val("");
  });
  listExercises();
});


$(document).on('click', '.update-btn', function(){
  var $updtName = $('#nameEdit').val();
  var $updtDescription = $('#descriptionEdit').val();
  var $updtTags = $('#tagsEdit').val();

  var payload = {
    name: $updtName,
    description: $updtDescription,
    tags: $updtTags
  };
$.ajax({
  method: "PUT",
  url: '/api/exercise/'+$(this).attr('id'),
  data: payload
}).done(function(data){
    $("#exercise-list").html("");
    $('#message').html('Exercise updated!');
    $('#editExercises').fadeOut(200);
    $('#make-exercise').fadeIn(500);
    listExercises();
  });
});


//delete an exercise
$(document).on('click', '.delete-button', function(){
//delete request to delete the exercise from the database.
  $.ajax({
    method: "DELETE",
    url: '/api/exercise/'+$(this).attr('id')
  }).done(function(data) {
    $("#exercise-list").html("");
    $('#message').html('Exercise deleted!');
    listExercises();
  });
});


$(document).on('click', '.edit-button', function(){
  $.get('/api/exercise/'+$(this).attr('id'), function(data){
    $('#nameEdit').val(data.name);
    $('#descriptionEdit').val(data.description);
    $('#tagsEdit').val(data.tags);
    $('.update-btn').attr('id', data._id);
    console.log(data);
  });
  $('#editExercises').fadeIn(500);
  $('#make-exercise').fadeOut(200);
});


function listExercises(){
  $('#exercise-list').html("");
  $.get('/api/exercises', function(data){
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $('#exercise-list').append("<tr>"+"<td>"+data[i].name+"</td><td>"+data[i].description+"</td><td>"+data[i].tags+"</td>" + '<td><a class="btn btn-danger btn-xs delete-button" id="'+data[i]._id+'" role="button">Delete</a>'+ '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="'+data[i]._id+'" role="button">Edit</a></td>'+
        "</tr>");
    }
  });
}

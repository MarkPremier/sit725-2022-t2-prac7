const cardList = [
  {
      title: "Kitten 2",
      image: "images/kitten-2.jpg",
      link: "About Kitten 2",
      desciption: "Demo desciption about kitten 2"
  },
  {
      title: "Kitten 3",
      image: "images/kitten-3.jpg",
      link: "About Kitten 3",
      desciption: "Demo desciption about kitten 3"
  }
]


const getProjects = () => {
  $.get('/api/projects',(response) => {
      if(response.statusCode==200){
          addCards(response.data);
      }
  })
}


const submitForm = () => {
  let formData = {};
  formData.title = $('#first_name').val();
  formData.image = $('#last_name').val();
  formData.link = $('#password').val();
  formData.description = $('#email').val();

  console.log("Form Data Submitted: ", formData);
  addProjectToApp(formData);
}

const addCards = (items) => {
  items.forEach(item => {
      let itemToAppend = '<div class="col s4 center-align">'+
  '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
  '</div><div class="card-content">'+
  '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
  '<div class="card-reveal">'+
      '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
      '<p class="card-text">'+item.desciption+'</p>'+
    '</div></div></div>';
    $("#card-section").append(itemToAppend)
  });
}

const addProjectToApp = (project) => {
  $.ajax({
      url: '/api/projects',
      data: project,
      type: 'POST',
      success: (result) => {
          alert(result.message);
          location.reload();
      }
  })
}



$(document).ready(function(){
  $('.materialboxed').materialbox();
  $('#formSubmit').click(()=>{
      submitForm();
  })
  getProjects();
  $('.modal').modal();
});




let socket = io();


socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
    $("#heading").html("Welcome to SIT 725 Week 7: "+ msg)
})

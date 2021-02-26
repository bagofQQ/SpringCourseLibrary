$(function(){

        const appendBook = function(data){
              var courseCode = '<a href="#" class="course-link" data-id="' +
                  data.id + '">' + data.name + '</a><br>';
              $('#course-list-monitor')
                  .append('<div>' + courseCode + '</div>');
        };

        //Getting book
        $(document).on('click', '.course-link', function(){
              var link = $(this);
              var courseId = link.data('id');
              $.ajax({
                    method: "GET",
                    url: '/course/' + courseId,
                    success: function(response)
                    {
                        var code = '<span>ID:' + response.id + '</span>';
                        link.parent().append(code);
                    },
                    error: function(response)
                    {
                        if(response.status == 404) {
                            alert('Книга не найдена!');
                        }
                    }
              });
              return false;
        });

   //Loading courses on load page
//       $.get('/course/', function(response)
//       {
//           for(i in response) {
//               appendCourses(response[i]);
//           }
//       });

       //Show adding course form
       $('#show-add-course-form').click(function(){
           $('#course-form').css('display', 'flex');
       });
       //Closing adding course form
       $('#course-form').click(function(event){
           if(event.target === this) {
               $(this).css('display', 'none');
           }
       });
       //Adding course
       $('#save-course').click(function()
       {
           var data = $('#course-form form').serialize();
           $.ajax({
               method: "POST",
               url: '/course/',
               data: data,
               success: function(response)
               {
                   $('#course-form').css('display', 'none');
                   var course = {};
                   course.id = response;
                   var dataArray = $('#course-form form').serializeArray();
                   for(i in dataArray) {
                       course[dataArray[i]['name']] = dataArray[i]['value'];
                   }
                   appendCourses(course);
               }
           });
           return false;
       });

       //Show course list form
       $('#show-course-list').click(function(response){
           $('#course-list').css('display', 'flex');
           $.ajax({
               method: "GET",
               url: '/course/',
               success: function(response)
               {
                   for(i in response){
                       var courseCode = '<h4>' + response[i].name + '</h4>' + 'id' + response[i].id;
                       $('#course-list-input').append('<div>' + courseCode + '</div>');
                   }
               }
           });
           return false;
       });


       //Closing course list form
       $('#course-list').click(function(event){
           if(event.target === this) {
               $(this).css('display', 'none');
           }
       });
       $('#close-course-list-input').click(function(){});

       //Show course id form
       $('#show-course-id').click(function(){
           $('#course-id').css('display', 'flex');
       });
       //Closing course list form
       $('#course-id').click(function(event){
           if(event.target === this) {
               $(this).css('display', 'none');
           }
       });
       $('#close-course-id').click(function(){});

       //Show course name
       $('#get-course').click(function(){
           var dataArray = $('#course-id form').serializeArray();
               for(i in dataArray) {
                   var currentId = dataArray[i]['value'];
               }
           $.ajax({
               method: "GET",
               url: '/course/' + currentId,
               success: function(response)
               {
                   $('#course').append('<div>' + response.name + '</div>');
               },
               error: function(response)
               {
                   if(response.status == 404) {
                      alert('Курс не найден!');
                   }
               }
           });
           return false;
       });

       //Show put course form
       $('#show-put-course-form').click(function(){
           $('#put-course-form').css('display', 'flex');
       });
       //Closing put course form
       $('#put-course-form').click(function(event){
           if(event.target === this) {
              $(this).css('display', 'none');
           }
       });
       //Putting course
       $('#put-course').click(function(){
           var data = $('#put-course-form form').serialize();
           $.ajax({
               method: "PUT",
               url: '/course/',
               data: data,
               success: function(response)
               {
                   $('#put-course-form').css('display', 'none');
                   var course = {};
                   course.id = response;
                   var dataArray = $('#put-course-form form').serializeArray();
                   for(i in dataArray) {
                       course[dataArray[i]['name']] = dataArray[i]['value'];
                   }
                   appendCourses(course);
               }
           });
           return false;
       });

       //Show delete course form
       $('#show-delete-course-form').click(function(){
           $('#delete-course-form').css('display', 'flex');
       });
       //Closing delete course form
       $('#delete-course-form').click(function(event){
           if(event.target === this) {
              $(this).css('display', 'none');
           }
       });

       //Delete course
       $('#delete-course').click(function(){
           var dataArray = $('#delete-course-form form').serializeArray();
           for(i in dataArray) {
               var currentId = dataArray[i]['value'];
           }
           $.ajax({
               method: "DELETE",
               url: '/course/' + currentId,
               success: function(response)
               {
                   $('#delete-course-form').css('display', 'none');
                   var id = response.id;
                   appendCourses(id);
               },
               error: function(response)
               {
                   if(response.status == 404) {
                      alert('Курс не найден!');
                   }
               }
           });
           return false;
       });

       //Show delete courses form
       $('#show-delete-courses').click(function(){
           $('#delete-courses').css('display', 'flex');
       });
       //Closing delete courses form
       $('#delete-courses').click(function(event){
           if(event.target === this) {
              $(this).css('display', 'none');
           }
       });

       //Delete courses
       $('#del-courses').click(function(){
           $.ajax({
               method: "DELETE",
               url: '/course/',
               success: function(response)
               {
                   for(i in response) {
                       appendCourses();
                   }
                   $('#delete-courses').css('display', 'none');
               }
           });
           return false;
       });
});
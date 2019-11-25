$(document).ready(function(){
  let actName, actOrg, actDes, actPlace, startDate, startTime, endDate, endTime;
  $('button[data-step_index]').on('click', function(){
    let index = parseInt($(this).attr('data-step_index'));
    let current_frame = $('#wizard-frame-' + index);
    let next_index = index;
    if($(this).text().trim() == 'Next'){
      next_index++;
    }else{
      next_index--;
    }
    if(next_index == 4){
      actName = $('#act-name').val();
      actOrg = $('#act-org').val();
      actDes = $('#act-des').val();
      actPlace = $('#act-place').val();
      startDate = $('#datepicker-start').datepicker('getDate');
      endDate = $('#datepicker-end').datepicker('getDate');
      startTime = $('.available-hours-start span.selected-hour').text().trim().match(/(\d+):(\d+)/);
      endTime = $('.available-hours-end span.selected-hour').text().trim().match(/(\d+):(\d+)/);
      console.log(new Date(startDate.setHours(startTime[1], startTime[2])).toLocaleString("chinese", {hour12: false}));
      console.log(new Date(endDate.setHours(endTime[1], endTime[2])).toLocaleString("chinese", {hour12: false}));
      updateInfo(actName, actPlace, startDate.toLocaleString("chinese", {hour12: false}), 
                endDate.toLocaleString("chinese", {hour12: false}), actOrg, actDes);
    }
    let next_frame = $('#wizard-frame-' + next_index);
    current_frame.addClass('d-none');
    next_frame.removeClass('d-none');
    $('#step-' + index).removeClass('active-step');
    $('#step-' + next_index).addClass('active-step');
    // console.log(current_frame);
  });



  $('#act-confirm').on('click', function(){
    $.ajax({
      url: '/addOne',
      type: 'post',
      data: {
        actName, actOrg, actPlace, actDes, startDate, endDate
      },
      success: function(res){
        window.location.href = res;
      },
      error: function(err){
        console.error(err);
        console.log(err);
      }
    })
  });
  
  // date-picker
  $('#datepicker-start').datepicker();
  $('#datepicker-end').datepicker();

  $('.available-hours-start span.available-hour').on('click', function(){
    $('.available-hours-start span.selected-hour').removeClass('selected-hour');
    $(this).addClass('selected-hour');
  });
  $('.available-hours-end span.available-hour').on('click', function(){
    $('.available-hours-end span.selected-hour').removeClass('selected-hour');
    $(this).addClass('selected-hour');
  });

  function updateInfo(name, place, start, end, org, des){
    $('[data-actName]').text('Name: ' + name);
    $('[data-actPlace]').text('Place: ' + place);
    $('[data-actStartTime]').text('Start Time: ' + start);
    $('[data-actEndTime]').text('End Time: ' + end);
    $('[data-actOrg]').text('Organizer: ' + org);
    $('[data-actDes]').text('Description: ' + des);
  }

  $('#delete-btn').on('click', function(){
    let name = $('#delete-name').text();
    name = name.substring(0, name.indexOf('@'));
    $.ajax({
      url: `/delete/${name}`,
      type: 'post',
      success: function(res){
        console.log(res);
        window.location.href = '/table';
      },
      error: function(err){
        return console.log(err);
      }
    })
  });

  window.onload = function(){
    $.ajax({
      url: '/getTable',
      type: 'post',
      success: function(res){
        var Timetable = new Timetables({
          el: '#coursesTable',
          timetables: res.courseList,
          week: res.week,
          timetableType: res.courseType,
          gridOnClick: function (e) {
            if(!e.name){
              return;
            }
            //- alert(e.name + '  ' + e.week +', 第' + e.index + '节课, 课长' + e.length +'节')
            //- $('#act-info').text(e.name);
            $('#delete-name').text(e.name);
            $('#exampleModal').modal('show');
            console.log(e)
          },
          styles:{
            Gheight: 25
          }
        });
      },
      error: function(err){
        console.log(err);
      }
    });
  }
});
$(document).ready(function(){
    $('.sidenav').sidenav();
  });

$(document).ready(function(){
    $('.carousel').carousel();
  });

$(document).ready(function(){
  $(window).scroll(function(){
    if($(window).scrollTop()>300){
      $('nav').addClass('blue');
    } else {
      $('nav').removeClass('blue');
    }
  });
});
$(function() {
  $('.tab-ul li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.tab-home').eq($(this).index()).removeClass('hide').siblings('.tab-home').addClass('hide');
    $('.banner').eq($(this).index()).removeClass('hide').siblings('.banner').addClass('hide');
    if($(this).hasClass('join')){
      $('.border-span').hide();
    }else{
      $('.border-span').show();
    };
    var liWidth = $(this).width();
    var $borderSpan = $('.border-span');
    $borderSpan.animate({
      width: liWidth,
      left: $(this)[0].offsetLeft
    }, 300);

  })

  $('.post span').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.station').eq($(this).index()).removeClass('hide').siblings('.station').addClass('hide');
  })

})

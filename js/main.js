$(function(){
  $('.yr').text(new Date().getFullYear());
  var $h=$('#hdr'),$t=$('.totop');
  function sc(){var y=$(window).scrollTop();$h.toggleClass('scrolled',y>40);$t.toggleClass('show',y>600);}
  $(window).on('scroll',sc);sc();
  $t.on('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  $('#printProfile').on('click',function(){window.print();});
  // reveal on scroll
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$(e.target).addClass('in');io.unobserve(e.target);}});},{threshold:.12});
    $('.rv').each(function(){io.observe(this);});
  }else{$('.rv').addClass('in');}
  // forms
  $('form.enq').on('submit',function(e){
    e.preventDefault();var ok=true,$f=$(this);
    $f.find('[required]').each(function(){
      var v=$.trim($(this).val()),bad=!v||(this.type==='email'&&!/^\S+@\S+\.\S+$/.test(v));
      $(this).toggleClass('is-invalid',bad);if(bad)ok=false;
    });
    if(!ok){$f.find('.is-invalid').first().focus();return;}
    /* TODO: send to backend (Formspree / EmailJS / PHP) */
    $f.find('.alert').removeClass('d-none');this.reset();
  });
});

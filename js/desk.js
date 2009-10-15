//KEITH EDIT: This is called within QueryLoader. DO NOT REMOVE
var trackMouseOver;
var cookie = $.cookie('preLoaded');

function finishedPreloading(hash){
  $('.preLoad, .overlayLayer').hide();
  
  // Lamp Load
  $('.lamp')
    .animate({top: '+=10px'}, 400)
    .animate({top: '-=120px'}, 500);
  
  // Titles Load
  $('.meet').fadeIn(500, function(){
    $('.portfolio').fadeIn(300, function(){
      $('.journalHead').fadeIn(300, function(){
        $('.contact').fadeIn(300, function(){
          $('.portfolio, .journalHead, .contact').fadeOut(500, callToAttention());
        });
      })
    })
  });
  
  function callToAttention() {    
    $('.bizCard').at_intervals(function() {
      if(trackMouseOver != true) {
        $('.bizCard').css('top', '280px').animate({top: '-=20px'}, 300, 'swing').animate({top: '+=20px'}, 100, 'linear').animate({top: '-=10px'}, 200, 'swing').animate({top: '+=10px'}, 50, 'linear');
      }
    }, {delay: 3000});
  }
  
  // Set the cookie
  $.cookie('preLoaded', 'true', { expires: 31 }); 
}


$(document).ready(function() {  
  
  (!cookie) ? QueryLoader.init() : finishedPreloading();
  
  $('.deskObject').hoverIntent(
    function() {
      
      // IF for safari having problems with being bottom aligned but adding top positioning.
      if($(this).hasClass('folio')) {
        $(this).animate({bottom: '+=20px'}, 200, 'swing').animate({bottom: '-=20px'}, 100, 'linear').animate({bottom: '+=10px'}, 100, 'swing').animate({bottom: '-=10px'}, 50, 'linear')
      } else {
        $(this).animate({top: '-=20px'}, 200, 'swing').animate({top: '+=20px'}, 100, 'linear').animate({top: '-=10px'}, 100, 'swing').animate({top: '+=10px'}, 50, 'linear')
      }
      
    },
    function(){}
  );

  $('.deskObject').click (function(){
    $(this).stop();
    $(this).css({'background-image' : 'none'});
    $(this).children('.blur').show();
    $(this).animate({scale: '2', opacity: '0'}, 300, '', function(){ $(this).hide() });
    $(this).addClass('hiddenDeskObject');
    $('.overlayLayer').show();
  }); 
  
  // SH Highlight Shrink / expand
    
  function shShrink(){
    $('.syntaxhighlighter').each( function() {
      var originalHeight = $(this).height();
      var originalWidth = $(this).width();
      
      $(this).css({'width': '300px', 'height' : '40px'}); 
      
      $(this).hoverIntent(
        function(){ 
          $('.syntaxhighlighter').each(function(){
            $(this).css({'z-index' : '9998'});
          });
          $(this).css({'z-index' : '9999'});
          $(this).animate({width: '645px', height: originalHeight}, 300);
        },
        function(){ $(this).animate({width: 300, height: 40}, 300); }
      )
    });
  }  

  function unwireShShrink() {
    $('.syntaxhighlighter').each( function(){ $(this).attr('style', ''); }); }
  
  // BLOG NAV
  var postUrl;
  
  function setUrl(){
    postUrl = $('.title a').attr('href');
    // console.log("PostURL: " + postUrl);
  }
  
  function grabPagesAndLoad(idNumber, direction, postUrl) {
        
    var idNumber = parseFloat(idNumber);
    
    var page1;
    var page2;
    
    if(direction == 'next'){
      page1 = 'page' + idNumber;
      page2 = 'page' + (idNumber + 1);      
    } else {
      page1 = 'page' + (idNumber - 1);
      page2 = 'page' + idNumber;
    }
    
    $('.journalOpen .content').empty();
    $('.journalOpen .content').append('<div class="leftWrap"></div> <div class="rightWrap"></div>');
    $('.journalOpen .loading').show();
        
    $(".leftWrap").load(postUrl + ' .' + page1, function() { $('.'+page1).css('display','block'); SyntaxHighlighter.highlight(); shShrink(); });
    $(".rightWrap").load(postUrl + ' .' + page2, function() { $('.'+page2).css('display','block'); $('.journalOpen .loading').hide(); SyntaxHighlighter.highlight(); shShrink(); });
  }
  
  // // Wireup Next Links
  // $('a.nextPageLink').live('click', function(){
  //   var pageToGet = $(this).attr('id');
  //   var idNumber = pageToGet.replace('page','').replace('Link','');
  //   
  //   grabPagesAndLoad(idNumber, 'next', postUrl);
  // });

  // Wireup Next Links
  $('a.pageLink').live('click', function(){
    var pageToGet = $(this).attr('id');
    var idNumber = pageToGet.replace('page','').replace('Link','');
    
    direction = ($(this).hasClass('prevPageLink') ? 'prev' : 'next');
    
    grabPagesAndLoad(idNumber, direction, postUrl);
  });

    
  setUrl();
  
  function syntaxCollapser(){
    
    $('.syntaxhighlighter').each( function() {
      var originalHeight = $(this).height();
      var originalWidth = $(this).width();
      $(this).css({'width': '300px', 'height' : '40px'});
      $(this).hover(
        function(){ $(this).animate({width: originalWidth, height: originalHeight}, 300); },
        function(){ $(this).animate({width: 300, height: 40}, 300); }
      )
    });
    
  }  
  
  // ARCHIVES
  $('.archivesInner').css('left', '120px');
  $('.archivesInner').hoverIntent(
    function(){
      $(this).animate({left: '0'}, 300);
      $('.archiveNav').css('opacity','0').show().animate({opacity: 1}, 300);
      $('.archivesUp').animate({top: '-=5px'}, 150).animate({top: '+=5px'}, 150);
      $('.archivesDown').animate({bottom: '-=5px'}, 150).animate({bottom: '+=5px'}, 150);  
    },
    
    function(){
      $(this).animate({left: '120px'}, 300);
      $('.archiveNav').animate({opacity: 0}, 300,'', function(){$(this).hide()});  
    }
  );

  $('.archivesDown').mousehold(1, function(){ scrollList('negative'); });
  $('.archivesUp').mousehold(1, function(){ scrollList('positive'); });

  function scrollList(direction) {
    var listHeight = 0;
    
    // Get the height of parent LIs
    $('.archivesList li.archive').each(function(){
      listHeight += $(this).height();  
    });
      
    listTop = parseFloat($('.archivesList li.archive').css('top').replace('px',''));
            
    if(direction == 'negative'){
      if( (-listHeight + 155) < listTop){
        $('.archivesList li.archive').animate({top: '-=2px'}, 1);
      }
    } else if(direction == 'positive'){
      if( 0 > listTop){
        $('.archivesList li.archive').animate({top: '+=2px'}, 1);
      }
    }
  }
  
  $('.archivesList a').bind('click', function(){
    var url = $(this).attr('href');
    postUrl = url;
    $('.journalOpen .loading').show();
    $('.journalOpen .content').empty();
    $('.journalOpen .content').load(url + ' .page', function() { 
      $('.journalOpen .loading').hide(); 
      SyntaxHighlighter.highlight(); 
      shShrink(); 
    });
    
    return false;
  });
  
  // $('.archivesList a').attr('href', '#');

  // INTERACTIONS
  $('.overlayLayer, .MBPRight, .MBPLeft').click(function(){ unLaunchObject($('.overlayLayer')); });
  
  /* UNDO THIS
    $('.deskObject').click (function(){
      $(this).css({'background-image' : 'none'});
      $(this).children('.blur').show();
      $(this).animate({scale: '2', opacity: '0'}, 300, '', function(){ $(this).hide() });
    }); 
  */
  
  function unLaunchObject(el){
    $(el).hide();
    $('.openObject').animate({top: '-500px'}, 100, '', function(){ $(this).hide() });
    $('.hiddenDeskObject').css('scale', '2')
      .show()
      .animate(
        { scale: '1', opacity: '1'}, 
        300, 
        'swing', 
        function() { 
          $(this).children('.blur').hide(); 
          $('.hiddenDeskObject').css({ 'background-image': ''}); 
          $('.hiddenDeskObject').removeClass('hiddenDeskObject');
          unwireShShrink();
          if($('.openObject > * > .objectWrap').size() > 0) {
            $('.objectWrap').hide();
          }
          if($(this).hasClass('mbp')){
            $('.mbpFlash').css('top', '-545px'); 
          };
        }
    );
  }
  
  // Journal  
  $('.journal').click(function(){
    $('.journalOpen')
      .css('top', -515)
      .show()
      .animate({top: '20px'}, 300, '', function(){ shShrink(); })
      .animate({top: '+=10px'}, 300)
      .animate({top: '-=10px'}, 450);
  }); 
  
  // Biz Card
  
  $('.bizCard').click(function(){
    $('.pre_flash').hide();
    $('.bizCardOpen')
      .css('top', -515)
      .show()
      .animate({top: '120px'}, 300, '', function(){ shShrink(); })
      .animate({top: '+=10px'}, 300)
      .animate({top: '-=10px'}, 450, '', function(){ 
        
        $('.pre_flash')
          .css({'position': 'absolute', 'top': '-352px', 'left':'30px'})
          .show()
          .animate({top: '23px'}, 150)
          .click(function(){
            $(this).animate({top: '-375px'}, 300);
            $('.flashWrap .objectWrap').fadeIn();
          });
          
      });
  })
  
  // iPhone
  
  $('.folio').click(function(){
    $('.folioOpen')
      .css('top', -539)
      .show()
      .animate({top: '50px'}, 300)
      .animate({top: '+=10px'}, 300)
      .animate({top: '-=10px'}, 450);
  });
  
  // MBP
  $('.mbp').click(function(){
    $('.mbpOpen')
      .css('top', -680)
      .show()
      .animate({top: '20px'}, 300)
      .animate({top: '+=10px'}, 300)
      .animate({top: '-=10px'}, 450, function(){
        $('.mbpFlash').animate({top: '34px'}, 350).animate({top: '-=10px'}, 400).animate({top: '+=10px'}, 300, function() { $('.mbpFlash object').show(); });
      });
  });
  

  // TITLES
  $('.heading').parent().hover( function() {
    $(this).children('.heading').fadeIn();
    //If we hover over biz card, turn hoppy time off.
    ($(this).hasClass('bizCard')) ? trackMouseOver = true : '';
  },
  
  function() {
    $(this).children('.heading').fadeOut();
  });  
  
  
});
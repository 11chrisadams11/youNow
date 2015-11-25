$(function($scope){
    var $sel,
        oldData;
   $('div.mainContainer').on('click', '.card', function(){
       if($sel !== undefined){
           if ($(this).data('f') !== 'full'){
               $sel.html(oldData).data('f', '');
               $sel = $(this);
               oldData = $(this).html();
               $sel.data('f', 'full')
           } else {
               $sel.html(oldData).data('f', '')
           }
       } else {
           $sel = $(this);
           oldData = $(this).html();
           $sel.data('f', '')
       }



   })
});

(function(){
    $(window).on('load', function() {
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    });

    $(document).ready(function() {
      /* ---------------------------------------------- /*
       * Select on SVG and list
       /* ---------------------------------------------- */
      var map   = document.querySelector('.displayInsideMap');
      var paths = map.querySelectorAll('.displayInsideMap a');
      var links = map.querySelectorAll('.ul_calque li');

      //Polyfill du forEach
      if(NodeList.prototype.forEach === undefined){
        NodeList.prototype.forEach = function(callback){
          [].forEach.call(this,callback);
        }
      }

      var activeArea = function(id){
        map.querySelectorAll('.is_active').forEach(function(item){
          item.classList.remove('is_active');
        })
        if(id!==undefined){
          document.querySelector('#link_calque_'+ id).classList.add('is_active');
          document.querySelector('#Calque_'+ id).classList.add('is_active');

        }
      }

      paths.forEach(function(path){
        path.addEventListener('mouseenter',function(e){
          var id= this.id.replace('Calque_','');
          activeArea(id);

        })
      })


      links.forEach(function(link){
        link.addEventListener('mouseenter',function(){
          var id = this.id.replace('link_calque_','');
          activeArea(id);
        })
      })

      map.addEventListener('mouseover',function(){
        activeArea();
      })
    });
    /* ---------------------------------------------- /*
      * Scroll Animation
      /* ---------------------------------------------- */

     $('.mapping-scroll').bind('click', function(e) {
         var anchor = $(this);
         var value1 = $(this).attr("id");
         var value = value1.replace('Calque_','');
         $('html, body').stop().animate({
             scrollTop: $(anchor.attr('xlink:href')).offset().top - 50
         }, 1000);
         addIntoDesc(value);
         e.preventDefault();
     });
     $('li[id^="link_calque_"]').bind('click',function(e){
        var anchor = $(this);
        var value1 = $(this).attr("id");
        var value = value1.replace('Calque_','');
       $('html, body').stop().animate({
           scrollTop: $(anchor.attr('xlink:href')).offset().top - 50
       }, 1000);
       addIntoDescROOM(value);
       e.preventDefault();
     });
     var addIntoDesc = function(value){
       $("#InsideRoom").empty();
       $(".ContentOfDescr").empty();
       $("#InsideRoom").append("Interieure de la salle : " + value);
       $(".ContentOfDescr").append("Contenu de la salle : "+ value);
     }
     var addIntoDescROOM = function(value){
       var temp = value.split("_");
       value = temp[2];
       $("#InsideRoom").empty();
       $(".ContentOfDescr").empty();
       $("#InsideRoom").append("Interieure de la salle : " + value);
       $(".ContentOfDescr").append("Contenu de la salle : "+ value);

     }
})(jQuery);

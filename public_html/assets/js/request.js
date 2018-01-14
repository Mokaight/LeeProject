$(document).ready(function(){
  console.log("eheh");
  //récupration de batA dans l'adresse index_batA.html
  var location = document.location.href.match(/[^\/]+$/)[0];
  var v  = location.split("_");
  var nom_bat = v[1].split(".");
  // fin

  //request a la base de donnée en POST
	$('li[id^="link_calque_"]').click(function(){
    var number = $(this).attr('id');
    var just_number = number.split("_");
    var pathname = window.location.pathname;
    console.log(pathname);
    var split_path = pathname.split("_");
    var split_split = split_path[1].split(".");
    if (split_split[0] == 'RDC'){
        var etage = 0;
    }
    else if (split_split[0] == 'ET1'){
        var etage = 1;
    }
    else if (split_split[0] == 'ET2'){
        var etage = 2;
    }
    console.log(number);
    console.log("just " + just_number[2]);
    $.post("../assets/php/index.php",
      {numero: just_number[2],
       etage : etage
      },function(res){
        console.log(res);
        if (res == 0 ){
          $("#descriptionTitre").empty();
          $("#descriptionTitre").append("La salle n'est pas encore renseigné <br/>");
          $("#descriptionTitre").append('<br/><img id="wrong" src="assets/images/logo/wrong.png"  height="200" width="200">');
        }
        else{
        $("#descriptionTitre").empty();
        $("#descriptionTitre").append("Description de la salle");
        $("#contenuDeSalle").css('visibility','visible');
        rewrite_progress(res);
        }
        /*
        numero
        etages
        prises
        chaises
        fenetre
        video_proj
        */

      },"json");

	});
  $('.mapping-scroll').bind('click', function() {
    var number = $(this).attr('id');
    var just_number = number.split("_");
    console.log(just_number[1]);
    $.post("../assets/php/index.php",
      {numero: just_number[1]
      },function(res){
        console.log ("c'est res " + res.numero);
        $("#descriptionTitre").empty();
        $("#descriptionTitre").append("Description de la salle");
        $("#contenuDeSalle").css('visibility','visible');
        rewrite_progress(res);
      },"json");

  });



  function rewrite_progress(res){
    $("#prises").empty();
    $("#chaises").empty();
    $("#fenetres").empty();
    $("#video_proj").empty();
    $("#descriptionRoom").empty();
    //
    $('#prises').attr('aria-valuenow',res.prises);
    $('#chaises').attr('aria-valuenow',res.chaises);
    $('#fenetres').attr('aria-valuenow',res.fenetre);
    $('#video_proj').attr('aria-valuenow',res.video_proj);
    //
    $('#prises').css('width',((res.prises*100)/10)+"%");
    $('#chaises').css('width',((res.chaises*100)/40+"%"));
    $('#fenetres').css('width',((res.fenetre*100)/10+"%"));
    $('#video_proj').css('width',((res.video_proj*100)/1+"%"));

    //
    $("#descriptionRoom").append("La salle n° "+res.numero+
                                  " est situé dans le batiment " + nom_bat[0] +
                                  " à l'étage " + res.etage);
    $("#prises").append(res.prises);
    $("#chaises").append(res.chaises);
    $("#fenetres").append(res.fenetre);
    $("#video_proj").append(res.video_proj);

    if(res.incendie == 1){
      $('#logo_incendie').css('visibility','visible');
    }
    if(res.sortie == 1){
      $('#logo_sortie').css('visibility','visible');
    }
    if(res.electricite == 1){
      $('#logo_electricite').css('visibility','visible');
    }

  }

});

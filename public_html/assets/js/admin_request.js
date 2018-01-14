$(document).ready(function(){
   $('#btn-validation').hide();
   $('#btn-supprimer').hide();
   var nb_requete = 3; // définit par RES de la fnction ajax;
  //request a la base de donnée en POST

	$('#btn-envoie').click(function(){
    var tat1 = $("#identifiant").val();
    var tat2 = $("#password").val();
    $.post("../assets/php/admin.php",
      {
        id : tat1,
        pwd : tat2
      },function(res){
        console.log(res.length);
        if(res == 0 && typeof res.length == "undefined"){
          $("#btn-envoie").after('<h4 style="color:red;">Votre identifiant ou votre mot de passe est erronée</h4>');
        }
        else{
          $('#connection').remove();
          create_tab();
          var etage =[];
          var salles =[];
          var prises = [];
          var chaises = [];
          var fenetre = [];
          var video_proj = [];
        //  console.log(res);
          for(var j=0;j<res.length;j = j+6){
             salles.push(res[j]);
             etage.push(res[j+1]);
             prises.push(res[j+2]);
             chaises.push(res[j+3]);
             fenetre.push(res[j+4]);
             video_proj.push(res[j+5]);
          }
          nb_requete = etage.length;
          for(var t=0;t<etage.length;t++){
            insert_row(etage[t],salles[t],prises[t],chaises[t],fenetre[t],video_proj[t]);
          }
          $("#btn-validation").on('click',function(){
            var rep = getValues();
            console.log(rep);
            if(rep.length !=0){
              $.post("../assets/php/admin_validation.php",
                {
                   tableau : rep
                },function(res){
                  if(res!==0){
                      $("#btn-supprimer").after('<h5>Les requetes ont bien été validé</h5>');
                  }
                  else{
                      $("#btn-supprimer").after('<h5>Aucune requete modifié</h5>');
                  }
                 window.location.href = "index.html"
                },"json");
            }
            else{
              $("#btn-supprimer").after('<h5>Veuillez selectionner une requete</h5>');
            }
          });

          $("#btn-supprimer").on('click',function(){
            var rep = getValues();
            console.log(rep);
            if(rep.length !=0){
              $.post("../assets/php/admin_suppression.php",
                {
                   tableau : rep
                },function(res){
                  if(res==0){
                      $("#btn-supprimer").after('<h5>Les requetes ont bien été supprimer</h5>');
                      location.reload();
                  }
                  else{
                      $("#btn-supprimer").after('<h5>Aucune requete modifié</h5>');
                  }
                //  window.location.href = "index.html"
                },"json");
            }
            else{
              $("#btn-supprimer").after('<h5>Veuillez selectionner une requete</h5>');
            }
          });
        }
      },"json");
    });
  function getValues(){
      var q=0;
      var reponse = [];
      var res = [];
  		$('table td').each(function(i, val){
        if(q%6 !=0 || q==0){
          res.push($(this).text());
         //console.log(q + " : " +$(this).text())
  			}
        if(q%6 ==0 && q!==0){
          if($(this).find('input').is(':checked')){
            res.push(true);
        //  console.log(q + " : " + "true")
          }
          else{
            res.push(false);
          //  console.log(q + " : " +"false")
          }
          q = -1;
        }
        q = q+1;

  		});
    //  console.log(res);
      for (var l=0;l<nb_requete*7;l=l+7){
        if(res[l+6]==true){
        reponse.push([res[l],res[l+1],res[l+2],res[l+3],res[l+4],res[l+5]]);
        }

      }
      return reponse;

  }
  function create_tab(){
      $("#content").prepend('<h2>Veuillez valider les requetes :</h2>'+

      '<table class="tg" style="undefined";table-layout: fixed; width: 169px">'+
      '<colgroup>'+
      '<col style="width: 10em">'+
      '<col style="width: 10em">'+
      '<col style="width: 10em">'+
      '<col style="width: 10em">'+
      '<col style="width: 10em">'+
      '<col style="width: 10em">'+
      '<col style="width: 10em">'+
      '</colgroup>'+
          '<tr>'+
          '<th class="tg-yw40">Etage</th>'+
          '<th class="tg-yw40">Salle</th>'+
          '<th class="tg-yw40">¨Prises</th>'+
          '<th class="tg-yw40">Chaises</th>'+
          '<th class="tg-yw40">Fenetres</th>'+
          '<th class="tg-yw40">Video_Projecteur</th>'+
          '<th class="tg-yw40">Valider</th>'+
        '</tr>'+
      '</table>'+
      '<br/>');
      $('#btn-validation').show();
      $('#btn-supprimer').show();
  }
  function insert_row(a,b,c,d,e,f){
    $('tr:last').after('<tr>'+
            '<td class="tg-yw4l">'+a+'</td>'+
            '<td class="tg-yw4l">'+b+'</td>'+
            '<td class="tg-yw4l">'+c+'</td>'+
            '<td class="tg-yw4l">'+d+'</td>'+
            '<td class="tg-yw4l">'+e+'</td>'+
            '<td class="tg-yw4l">'+f+'</td>'+
            '<td class="tg-yw4l"> <input type="checkbox" class="oui" name="validation"></td>'+
          '</tr>');
  }
});

$(document).ready(function(){
  console.log("dadadada");
  var div = document.createElement('div');
  div.className='answer';
  document.body.appendChild(div);
  //request a la base de donnée en POST

  $.post("../assets/php/envoie_info.php",
		{
			number : 0
		},function(res){
			for(var i=0;i<res.length;i++){
					$("#etage").append('<option value="'+res[i]+'">'+res[i]+'</option>');
			}
		},"json");

	$("#etage").change(function(){
	$("#salle").empty();
	console.log($("#etage option:selected").val());
	var tat = $("#etage option:selected").val();
		$.post("../assets/php/envoie_salle.php",
			{
				value : tat
			},function(res){
				console.log(res.length);
				for(var i=0;i<res.length;i++){
						$("#salle").append('<option value="'+res[i]+'">'+res[i]+'</option>');
				}
        $('#btn-envoie').click(function(){
            var tat1 = $("#certif").val();
            tat1 = tat1.split(' ');
            tat1 = tat1[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            var tat2 = $("#userPassword").val();
            var tat3 = $("#salle").val();
            var tat4 = $("#etage").val();

            console.log("salle : " + tat3 + "etage : " + tat4  );
            if($("#ajout").val() =="Ajout"){
              var tat5 = 1;
            }
            else if($("#ajout").val() =="Suppression"){
              var  tat5 = 0;
            }
            $.post("../assets/php/certification.php",
              {
                certif : tat1,
                password : tat2,
                salle : tat3,
                etage : tat4,
                ajout : tat5,
              },function(res){
                console.log(res);
                $(".answer").empty();
                if(res == "faux"){
                  div.textContent='La certification ou le mot de passe est erroné, vous ne pouvez pas ajouter de certification';
                }
                else{
                  div.textContent='La certification a été ajouté !';
                  //valeur de la selection
                  console.log($("#certif").val());
                }
              },"json");

         });

			},"json");



    });
});

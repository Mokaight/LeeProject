$(document).ready(function(){
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
					var tat1 = $("#etage").val();
					var tat2 = $("#salle").val();
					var tat3 = $("#prises").val();
					var tat4 = $("#chaises").val();
					var tat5 = $("#fenetres").val();
					var tat6 = $("#video_proj").val();
					console.log(tat1,tat2,tat3,tat4,tat5,tat6);
					if(tat1 !=null || tat2 != null){
						$.post("../assets/php/envoie.php",
							{
								etage : tat1,
								salle : tat2,
								prises : tat3,
								chaises : tat4,
								fenetres : tat5,
								video_proj : tat6
							},function(res){
								window.close();
							},"json");
					}

				});

			},"json");
		});


});

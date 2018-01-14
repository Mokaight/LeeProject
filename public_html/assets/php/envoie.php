<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=id4122092_leeproject;charset=utf8', 'id4122092_leeuser', 'leepassword');
	}
	catch (Exception $e)
	{
	        die('Erreur : ' . $e->getMessage());
	}
 $etage = $_POST['etage'];
 $salle = $_POST['salle'];
 $prises = $_POST['prises'];
 $chaises = $_POST['chaises'];
 $fenetres = $_POST['fenetres'];
 $video_proj = $_POST['video_proj'];
 $requete = $bdd->prepare("INSERT INTO remplissage_salles_tempo(nom_salle,etage,prises,chaises,fenetre,video_proj)
                           VALUES (:salle,:etage,:prises,:chaises,:fenetre,:video_proj)");
 $requete->bindParam(':salle', $salle,PDO::PARAM_INT);
 $requete->bindParam(':prises', $prises,PDO::PARAM_INT);
 $requete->bindParam(':chaises', $chaises,PDO::PARAM_INT);
 $requete->bindParam(':fenetre', $fenetres,PDO::PARAM_INT);
 $requete->bindParam(':video_proj', $video_proj,PDO::PARAM_INT);
 $requete->bindParam(':etage', $etage,PDO::PARAM_INT);
 $requete->execute();
 $description=[
              "etage" =>$etage,
							"salle" =>$salle,
							"prises"=>$prises,
							"chaises"=>$chaises,
							"video_proj"=>$video_proj,
							"fenetres"=>$fenetres,];
 echo json_encode($description);
?>

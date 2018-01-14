<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=id4122092_leeproject;charset=utf8', 'id4122092_leeuser', 'leepassword');
	}
	catch (Exception $e)
	{
	        die('Erreur : ' . $e->getMessage());
	}
 $tableau = $_POST['tableau'];

 $i = 0;
 $count = 0;
 for($i=0;$i<sizeof($tableau);$i++){
	 $etage = intval($tableau[$i][0]);
   $salle = intval($tableau[$i][1]);
   $prises = intval($tableau[$i][2]);
   $chaises = intval($tableau[$i][3]);
   $fenetres = intval($tableau[$i][4]);
   $video_proj = intval($tableau[$i][5]);
	 $requete2 = $bdd->prepare("DELETE FROM remplissage_salles_tempo
                             WHERE nom_salle = :salle AND etage = :etage AND prises = :prises AND chaises = :chaises AND fenetre = :fenetre AND video_proj = :video_proj");
   $requete2->bindParam(':salle', $salle,PDO::PARAM_INT);
   $requete2->bindParam(':prises', $prises,PDO::PARAM_INT);
   $requete2->bindParam(':chaises', $chaises,PDO::PARAM_INT);
   $requete2->bindParam(':fenetre', $fenetres,PDO::PARAM_INT);
   $requete2->bindParam(':video_proj', $video_proj,PDO::PARAM_INT);
   $requete2->bindParam(':etage', $etage,PDO::PARAM_INT);
   $requete2->execute();
 }
	echo json_encode($count);
?>

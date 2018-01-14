<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=id4122092_leeproject;charset=utf8', 'id4122092_leeuser', 'leepassword');
	}
	catch (Exception $e)
	{
	        die('Erreur : ' . $e->getMessage());
	}
 $id = $_POST['id'];
 $pwd = $_POST['pwd'];
 $description = 0;
 $requete = $bdd->prepare("SELECT * from admin_id
 													 WHERE id = :id AND password =:pwd");
 $requete->bindParam(':id', $id,PDO::PARAM_STR,50);
 $requete->bindParam(':pwd', $pwd,PDO::PARAM_STR,50);
 $requete->execute();
 $description = $requete->rowCount();
 if($description != 0){
	$requete2 = $bdd->prepare("SELECT *
													FROM remplissage_salles_tempo");
	$requete2->execute();
	$description2 = array();
	while($resultat2 = $requete2->fetch(PDO::FETCH_OBJ))
	{

			array_push($description2,$resultat2->nom_salle,$resultat2->etage,$resultat2->prises,$resultat2->chaises,$resultat2->fenetre,$resultat2->video_proj);
	}
	echo json_encode($description2);
}else{
	echo json_encode($description);
}

?>

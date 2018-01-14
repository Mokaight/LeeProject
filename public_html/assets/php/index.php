<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=id4122092_leeproject;charset=utf8', 'id4122092_leeuser', 'leepassword');
	}
	catch (Exception $e)
	{
	        die('Erreur : ' . $e->getMessage());
	}
 $toto = 0;
 $requete = $bdd->prepare("SELECT * FROM remplissage_salles WHERE nom_salle = :salle AND etage = :etage");
 $requete->bindParam(':salle', $_POST['numero'],PDO::PARAM_STR,20);
 $requete->bindParam(':etage', $_POST['etage'],PDO::PARAM_INT);
 $requete->execute();
 $toto = $requete->rowCount();
 if ($toto != 0){
	 while($resultat = $requete->fetch(PDO::FETCH_OBJ))
	 {
			 $description=[
										"numero" =>$resultat->nom_salle,
										"etage"=>$resultat->etage,
										"prises" => $resultat->prises,
										"chaises" => $resultat->chaises,
										"fenetre"=>$resultat->fenetre,
										"video_proj"=>$resultat->video_proj,
										"incendie"=>$resultat->incendie,
										"sortie"=>$resultat->sortie,
										"electricite"=>$resultat->electricite];

	 }
	 echo json_encode($description);
 }
 else{
	 $description = 0;
	 echo json_encode($description);
 }

?>

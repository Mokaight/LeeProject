<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=id4122092_leeproject;charset=utf8', 'id4122092_leeuser', 'leepassword');
	}
	catch (Exception $e)
	{
	        die('Erreur : ' . $e->getMessage());
	}

  $etage = $_POST['value'];
  $requete2 = $bdd->prepare("SELECT nom_salle from remplissage_salles where etage = :etage");
  $requete2->bindParam(':etage', $etage,PDO::PARAM_INT);
  $requete2->execute();
	$description2 = array();
	while($resultat2 = $requete2->fetch(PDO::FETCH_OBJ))
		{
			 array_push($description2,$resultat2->nom_salle);

		}
  echo json_encode($description2);

?>

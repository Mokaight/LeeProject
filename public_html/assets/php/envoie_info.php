<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=id4122092_leeproject;charset=utf8', 'id4122092_leeuser', 'leepassword');
	}
	catch (Exception $e)
	{
	        die('Erreur : ' . $e->getMessage());
	}
  $number = $_POST['number'];
	$requete = $bdd->prepare("SELECT DISTINCT etage from remplissage_salles");
	$requete->execute();
	$description = array();
	while($resultat = $requete->fetch(PDO::FETCH_OBJ))
		{
			 array_push($description,$resultat->etage);

		}
	echo json_encode($description);
?>

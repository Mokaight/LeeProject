<?php
try
{
  $bdd = new PDO('mysql:host=localhost;dbname=id4122092_leeproject;charset=utf8', 'id4122092_leeuser', 'leepassword');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}
$certif = $_POST['certif'];
$password = $_POST['password'];
$salle = $_POST['salle'];
$etage = $_POST['etage'];
$ajout = $_POST['ajout'];
$pass_md5 = md5($password);
$requete = $bdd->prepare("SELECT certification
                        FROM certif
                        WHERE password = :pass");
$requete->bindParam(':pass', $pass_md5,PDO::PARAM_STR,50);
$requete->execute();
$toto = $requete->rowCount();
while($resultat = $requete->fetch(PDO::FETCH_OBJ))
  {
     $description =  $resultat->certification;

  }
  if(isset($description)){
    if($certif == 'incendie'){
      if($ajout == 0){
        $requete2 = $bdd->prepare("UPDATE remplissage_salles
                                  SET incendie = 0
                                  WHERE nom_salle = :salle AND etage = :etage");
        $requete2->bindParam(':salle', $salle,PDO::PARAM_INT);
        $requete2->bindParam(':etage', $etage,PDO::PARAM_INT);
        $requete2->execute();
      }
      if($ajout == 1){
        $requete2 = $bdd->prepare("UPDATE remplissage_salles
                                  SET incendie = 1
                                  WHERE nom_salle = :salle AND etage = :etage");
        $requete2->bindParam(':salle', $salle,PDO::PARAM_INT);
        $requete2->bindParam(':etage', $etage,PDO::PARAM_INT);
        $requete2->execute();
      }
    }
    else if($certif == "sortie"){
      if($ajout == 0){
        $requete3 = $bdd->prepare("UPDATE remplissage_salles
                                  SET sortie = 0
                                  WHERE nom_salle = :salle AND etage = :etage");
        $requete3->bindParam(':salle', $salle,PDO::PARAM_INT);
        $requete3->bindParam(':etage', $etage,PDO::PARAM_INT);
        $requete3->execute();
      }
      if($ajout == 1){
        $requete3 = $bdd->prepare("UPDATE remplissage_salles
                                  SET sortie = 1
                                  WHERE nom_salle = :salle AND etage = :etage");
        $requete3->bindParam(':salle', $salle,PDO::PARAM_INT);
        $requete3->bindParam(':etage', $etage,PDO::PARAM_INT);
        $requete3->execute();
      }

    }
    else if($certif == "electricite"){
      if($ajout == 0){
        $requete4 = $bdd->prepare("UPDATE remplissage_salles
                                  SET electricite = 0
                                  WHERE nom_salle = :salle AND etage = :etage");
        $requete4->bindParam(':salle', $salle,PDO::PARAM_INT);
        $requete4->bindParam(':etage', $etage,PDO::PARAM_INT);
        $requete4->execute();
      }
      if($ajout == 1){
        $requete4 = $bdd->prepare("UPDATE remplissage_salles
                                  SET electricite = 1
                                  WHERE nom_salle = :salle AND etage = :etage");
        $requete4->bindParam(':salle', $salle,PDO::PARAM_INT);
        $requete4->bindParam(':etage', $etage,PDO::PARAM_INT);
        $requete4->execute();
      }
    }
    echo json_encode("vrai");
  }
  else{
      echo json_encode("faux");
  }



?>

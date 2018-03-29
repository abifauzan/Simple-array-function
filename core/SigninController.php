<?php

// Getting User Data

$errors = array();
$data   = array();

	if (empty($_POST['name']))
		$errors['name'] = 'Name is required.';
	if (!empty($errors)) {
		$data['success'] = false;
		$data['errors']  = $errors;
	} else {
		$data['success'] = true;
		$data['name'] = $_POST['name'];
	}
	echo json_encode($data);

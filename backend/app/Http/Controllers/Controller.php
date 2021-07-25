<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function validation($validator,$res = array())
    {
    	$errors = $validator->errors();
       	try {
		  	if(is_array(reset($errors)))
	       	{
	       		$errArr = reset($errors);
	       		if(is_array(reset($errArr)))
	       		{
	       			$errInnerArr = reset($errArr);
	       			if(is_array(($errInnerArr)))
		       		{
		       			$errInnerArrMsg = reset($errInnerArr);
		       		}
	       		}
	       	}
		}
		catch(Exception $e) {
		  $errInnerArrMsg = 'Message: ' .$e->getMessage();
		}
        
        return response(['errors'=>$errInnerArrMsg,"status" => 422], 200);
      	
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\City;
use App\Hobby;
use Illuminate\Support\Facades\Validator;


class ApiCommonController extends Controller
{

     /**
     * Common List API
    */
    public function commonList() {        
        $response['hobby'] = Hobby::orderBy('id','desc')->get();
        $response['city'] = City::orderBy('id','desc')->get();
        $responseArr = ["payload" => $response,"status" => 200];
        return response($responseArr, 200);
    }

}

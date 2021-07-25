<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;


class ApiUserController extends Controller
{

     /**
     * User List API
    */
    public function list () {        
        $user = User::where('is_admin',0)->with(array(
            'city' => function($query) {
                $query->select('id','title');
            }
        ))->orderBy('id','desc')->get();
        $response = ["payload" => $user,"status" => 200];
        return response($response, 200);
    }
    
    /**
     * User Update API
    */
    public function update (Request $request) {        
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'status' => 'required|in:approved,unapproved',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        
        $user = User::find($request->user_id);
        if($user){
            $user->status = $request->status;
            $user->save();
            $response = ["payload" => "","status" => 200];
            return response($response, 200);
        }
        else{
            $response = ["payload" => "","status" => 400];
            return response($response, 400);
        }
    }
}

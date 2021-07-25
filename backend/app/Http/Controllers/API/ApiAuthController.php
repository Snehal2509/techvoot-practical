<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\UserHobby;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class ApiAuthController extends Controller
{
    /**
     * Register API
    */
    public function register (Request $request) {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'city_id' => 'required',
            'hobby' => 'required',
            'gender' => 'required|in:male,female',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$this->validation($validator),"status" => 402], 200);
        }
        $userHobbies = $request->hobby;
        unset($request->hobby);
        $request['password']=Hash::make($request['password']);
        $request['remember_token'] = Str::random(10);
        $user = User::create($request->toArray());
        if($user)
        {
            $userHobbies = explode(",",$userHobbies);
            $insertArr = array();
            foreach ($userHobbies as $value) {
                $insertArr[] = array('user_id' => $user->id,'hobby_id' => $value);
            }
            UserHobby::insert($insertArr);
        }
        $response = ["payload" => $user,"status" => 200];
        return response($response, 200);
    }

    /**
     * Login API
    */
    public function login (Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $response = ["payload" => $user,"status" => 200];
                return response($response, 200);
            } else {
                $response = ["payload" => "","status" => 402];
                return response($response, 422);
            }
        } else {
            $response = ["payload" =>"","status" => 404];
            return response($response, 422);
        }
    }

}

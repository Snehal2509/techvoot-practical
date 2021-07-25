<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where('email','admin@gmail.com')->where('status','approved')->first();
        if(!$user)
        {
            $insertArr = [
                'firstname' => 'Jeck',
                'lastname' => 'Admin',
                'status' => 'approved',
                'gender' => 'male',
                'is_admin' => 1,
                'email' => 'admin@gmail.com',
                'password' => Hash::make(123123),
            ];
    
            User::create($insertArr);
        }        
    }
}

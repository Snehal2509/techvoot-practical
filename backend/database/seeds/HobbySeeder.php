<?php

use Illuminate\Database\Seeder;
use App\Hobby;

class HobbySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $hobbyArr = ['Drawing','Travelling','Playing sports','Solving puzzles','Fixing computers','Swimming','Reading','Writing'];

        $insertArr = array();
        foreach ($hobbyArr as $value) {
            $insertArr[] = array('title' => $value);
        }
        
        Hobby::insert($insertArr);
    }
}

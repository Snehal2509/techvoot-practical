<?php

use Illuminate\Database\Seeder;
use App\City;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cityArr = ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Gandhinagar','Anand','Mehsana'];

        $insertArr = array();
        foreach ($cityArr as $value) {
            $insertArr[] = array('title' => $value);
        }
        
        City::insert($insertArr);
    }
}

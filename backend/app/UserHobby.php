<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserHobby extends Model
{
    protected $table = 'user_hobbies';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','hobby_id'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTask extends Model
{
    protected $guarded = [];


    public function user()
    {
        return $this->belongsTo(User::class,'id','user_id');
    }
}

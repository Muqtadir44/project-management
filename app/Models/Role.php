<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $guarded = [];


    static function Active()
    {
        return Self::whereStatus(1)->get();
    }


    public function user()
    {
        return $this->belongsTo(User::class,'role_id');
    }
}

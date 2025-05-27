<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usersystemlog extends Model
{
    protected $fillable = [
        "user_id",
        "user_email",
        "user_ip",
        "activities",
        "module",
        "action",
    ];


    public function moduleBy()
    {
        return $this->belongsTo(Module::class, 'module');
    }
}

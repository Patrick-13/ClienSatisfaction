<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = ['id', 'name'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'usermodules', 'module_id', 'user_id');
    }
}

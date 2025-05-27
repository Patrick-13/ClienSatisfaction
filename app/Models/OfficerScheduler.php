<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficerScheduler extends Model
{
    protected $fillable = [
        "odName",
        "date",
        "timeStart",
        "timeEnd",
        "email",
        "remarks",
        "created_at",
    ];
}

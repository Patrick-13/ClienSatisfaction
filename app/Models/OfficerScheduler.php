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
        "contact_number",
        "remarks",
        "created_at",
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerRating extends Model
{
    protected $fillable = [
        "odName",
        "date",
        "clientName",
        "sex",
        "sector",
        "companyName",
        "address",
        "contactNumber",
        "email",
        "timeIn",
        "transactionType",
        "unitVisited",
        "personnel",
        "rating",
        "timeOut",
        "comments",
        "created_at",
    ];

    public function unitBy()
    {
        return $this->belongsTo(Unit::class, 'unitVisited');
    }
}

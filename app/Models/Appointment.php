<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = ['id', 'transactionType', 'unitSection', 'appointmentNumber', 'date', 'time', 'fullname', 'sex', 'sector', 'company', 'address', 'email', 'contactNo', 'remarks', 'termsandcondition'];

    protected $casts = [
        'unitSection' => 'array',
    ];
    public function transactionBy()
    {
        return $this->belongsTo(TransactionType::class, 'transactionType');
    }

    public function UnitSectionby()
    {
        return $this->belongsTo(Unit::class, "unitSection");
    }

    public function appointmentBy()
    {
        return $this->belongsTo(CustomerRating::class, 'appointmentNumber', 'appointmentNumber');
    }
}

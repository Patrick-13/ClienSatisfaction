<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = ['id', 'appointmentNumber', 'date', 'time', 'fullname', 'sex', 'sector', 'company', 'address', 'email', 'contactNo', 'remarks', 'termsandcondition'];
}

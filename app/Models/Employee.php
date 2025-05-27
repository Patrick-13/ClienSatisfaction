<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = ['id', 'embId', 'date_registered', 'fullName', 'designation', 'email', 'division_id', 'section_id', 'unit_id'];

    public function divisionBy()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function sectionBy()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function unitBy()
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }
}

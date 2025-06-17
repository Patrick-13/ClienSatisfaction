<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed> 
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'transactionBy' => new TransactionTypeResource($this->transactionBy),
            'UnitSectionby' => new UnitResource($this->UnitSectionby),
            'appointmentNumber' => $this->appointmentNumber,
            'date' => $this->date,
            'time' => $this->time,
            'fullname' => $this->fullname,
            'sex' => $this->sex,
            'sector' => $this->sector,
            'company' => $this->company,
            'address' => $this->address,
            'contactNo' => $this->contactNo,
            'email' => $this->email,
            'remarks' => $this->remarks,
            'termsandcondition' => $this->termsandcondition,
        ];
    }
}

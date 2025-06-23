<?php

namespace App\Http\Resources;

use App\Models\Unit;
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
            'UnitSectionby' => UnitResource::collection(
                Unit::whereIn('id', $this->unitSection ?? [])->get()
            ),
            'appointmentNumber' => $this->appointmentNumber,
            'appointmentBy' => new CustomerRatingResource($this->appointmentBy),
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

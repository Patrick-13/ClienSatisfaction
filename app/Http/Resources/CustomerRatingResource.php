<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerRatingResource extends JsonResource
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
            'odName' => $this->odName,
            'appointmentNumber' => $this->appointmentNumber,
            'date' => $this->date,
            'clientName' => $this->clientName,
            'sex' => $this->sex,
            'sector' => $this->sector,
            'companyName' => $this->companyName,
            'address' => $this->address,
            'contactNumber' => $this->contactNumber,
            'timeIn' => $this->timeIn,
            'transactionType' => $this->transactionType,
            'unitVisited' => $this->unitVisited,
            'unitBy' => new UnitResource($this->unitBy),
            'personnel' => $this->personnel,
            'rating' => $this->rating,
            'timeOut' => $this->timeOut,
            'comments' => $this->comments,
            'rating_order' => $this->rating_order
        ];
    }
}

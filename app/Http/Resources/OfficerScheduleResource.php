<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficerScheduleResource extends JsonResource
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
            'date' => $this->date,
            'timeStart' => $this->timeStart,
            'timeEnd' => $this->timeEnd,
            'email' => $this->email,
            'contact_number' => $this->contact_number,
            'remarks' => $this->remarks
        ];
    }
}

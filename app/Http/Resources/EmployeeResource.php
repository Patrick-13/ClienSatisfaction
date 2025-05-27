<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
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
            'embId' => $this->embId,
            'date_registered' => $this->date_registered,
            'fullName' => $this->fullName,
            'designation' => $this->designation,
            'email' => $this->email,
            'divisionBy' => new DivisionResource($this->divisionBy),
            'sectionBy' => new SectionResource($this->sectionBy),
            'unitBy' => new UnitResource($this->unitBy),
        ];
    }
}

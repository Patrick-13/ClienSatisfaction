<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionTypeResource extends JsonResource
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
            'transaction_name' => $this->transaction_name,
            'section_id' => $this->section_id,
            'transactiondivisionBy' => new DivisionResource($this->transactiondivisionBy),
        ];
    }
}

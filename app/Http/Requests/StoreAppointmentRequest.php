<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "appointmentNumber" => ['string'],
            "transactionType" => ['required', 'integer'],
            "unitSection" => ['required', 'array'],
            "unitSection.*" => ['integer', 'exists:units,id'],
            "date" => ['required', 'string'],
            "time" => ['required', 'string'],
            "fullname" => ['required', 'string'],
            "sex" => ['required', 'string'],
            "sector" => ['required', 'string'],
            "company" => ['required', 'string'],
            "address" => ['required', 'string'],
            "contactNo" => ['required', 'string'],
            "email" => ['required', 'string'],
            "remarks" => ['required', 'string'],
            "termsandcondition" => ['required', 'boolean'],
        ];
    }
}

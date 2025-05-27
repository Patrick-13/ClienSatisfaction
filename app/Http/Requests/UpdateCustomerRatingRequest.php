<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRatingRequest extends FormRequest
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
           "odName" => ['required', 'string', 'max:255'],
            "date" => ['required', 'max:255'],
            "clientName" => ['required', 'string', 'max:255'],
            "sex" => ['required', Rule::in(['Male', 'Female'])],
            "sector" => ['required', Rule::in(['Government', 'Private', 'NGO', 'Other'])],
            "companyName" => ['required', 'string', 'max:255'],
            "address" => ['required', 'string', 'max:255'],
            "contactNumber" => ['nullable', 'string', 'max:255'],
            "email" => ['required', 'string', 'max:255'],
            "timeIn" => ['required', 'max:255'],
            "transactionType" => ['required', 'max:255'],
            "unitVisited" => ['required', 'max:255'],
            "personnel" => ['required', 'max:255'],
            "rating" => ['required', Rule::in(['Excellent', 'Good', 'Bad', 'Very Bad'])],
            "timeOut" => ['required', 'max:255'],
            "comments" => ['required', 'max:255'],
        ];
    }
}

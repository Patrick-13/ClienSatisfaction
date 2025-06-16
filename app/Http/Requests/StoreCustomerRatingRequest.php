<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRatingRequest extends FormRequest
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
            "appointmentNumber" => ['required', 'string', 'max:255'],
            "date" => ['required', 'max:255'],
            "clientName" => ['required', 'string', 'max:255'],
            "sex" => ['required', Rule::in(['Male', 'Female'])],
            "sector" => ['required', Rule::in(['Government', 'Private', 'NGO', 'Other'])],
            "companyName" => ['required', 'string', 'max:255'],
            "address" => ['required', 'string', 'max:255'],
            "contactNumber" => ['nullable', 'string', 'max:255'],
            "email" => ['required', 'string', 'max:255'],
            "ratings" => ['required', 'array', 'min:1'],
            "ratings.*.timeIn" => ['required', 'string', 'max:255'],
            "ratings.*.timeOut" => ['required', 'string', 'max:255'],
            "ratings.*.transactionType" => ['required', 'integer', 'max:255'],
            "ratings.*.unitVisited" => ['required', 'integer', 'max:255'],
            "ratings.*.personnel" => ['nullable', 'integer', 'max:255'],
            "ratings.*.rating" => ['required', Rule::in(['Excellent', 'Good', 'Bad', 'Very Bad'])],
            "ratings.*.comments" => ['required', 'string', 'min:1', 'max:100', 'regex:/^(?!\s*$)[a-zA-Z\s]+$/'],

        ];
    }
}

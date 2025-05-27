<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfficerSchedulerRequest extends FormRequest
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
            "date" => ['required', 'date'],
            "timeStart" => ['required', 'date_format:H:i'],
            "timeEnd" => ['required', 'date_format:H:i', 'after:timeStart'],
            "email" => ['required', 'email'],
            "remarks" => ['required', 'string', 'max:255'],
        ];
    }
}

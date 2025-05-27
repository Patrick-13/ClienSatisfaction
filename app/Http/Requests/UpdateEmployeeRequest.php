<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
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
            "embId" => ['required', 'string'],
            "date_registered" => ['nullable', 'string'],
            "fullName" => ['required', 'string'],
            "designation" => ['required', 'string'],
            "email" => ['required', 'string'],
            "division_id" => ['nullable',  Rule::exists('divisions', 'id')],
            "section_id" => ['nullable',  Rule::exists('sections', 'id')],
            "unit_id" => ['nullable', Rule::exists('units', 'id')],
        ];
    }
}

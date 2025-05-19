<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
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
            'name' => ['required','string','max:255'],
            'description' => ['string'],
            'due_date' => ['nullable','date','after_or_equal:today'],
            'status'=> ['required',Rule::in(['pending','in_progress','completed'])],
            'image' => ['nullable','image','mimes:jpeg,png,jpg','max:2048'],
        ];
    }
}

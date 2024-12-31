<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePostRequest extends FormRequest
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
            'author' => 'sometimes|required|string',
            'author_image' => [
                'nullable',
                'string',
                function ($attribute, $value, $fail) {
                    $isValidBase64 = preg_match(
                        '/^data:image\/(png|jpg|jpeg|gif|bmp|webp);base64,([A-Za-z0-9+\/=]+)$/',
                        $value
                    );
                    $isValidUrl = filter_var($value, FILTER_VALIDATE_URL);
        
                    if (!$isValidBase64 && !$isValidUrl) {
                        $fail("The {$attribute} field must be a valid base64 string or URL.");
                    }
                },
            ],
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'image' => [
                'nullable',
                'string',
                function ($attribute, $value, $fail) {
                    $isValidBase64 = preg_match(
                        '/^data:image\/(png|jpg|jpeg|gif|bmp|webp);base64,([A-Za-z0-9+\/=]+)$/',
                        $value
                    );
                    $isValidUrl = filter_var($value, FILTER_VALIDATE_URL);
        
                    if (!$isValidBase64 && !$isValidUrl) {
                        $fail("The {$attribute} field must be a valid base64 string or URL.");
                    }
                },
            ],
            'slug' => 'sometimes|required|string|unique:posts,slug,' . $this->post,
            'tags' =>  'sometimes|required|string',
            'status' => 'sometimes|required|in:Draft,Published,Archived',
        ];
        
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ]));
    }
    
}

<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Requests\image;

class StorePostRequest extends FormRequest
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
            'author' => 'required|string', 
            'author_image' => ['nullable', 'regex:/^data:image\/(png|jpg|jpeg|gif|bmp|webp);base64,([A-Za-z0-9+\/=]+)$/'], 
            'title' => 'required|string|max:255', 
            'content' => 'required|string', 
            'tags' => 'required|string', 
            'image' => ['required', 'regex:/^data:image\/(png|jpg|jpeg|gif|bmp|webp);base64,([A-Za-z0-9+\/=]+)$/'], 
            'slug' => 'required|string|unique:posts,slug|max:255', 
            'status' => 'required|in:Draft,Published,Archived', 
        ];
    }
    

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors(),
        ]));
    }
}

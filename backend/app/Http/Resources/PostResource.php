<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'author' => $this->author, 
            'author_image' => $this->author_image, 
            'title' => $this->title, 
            'content' => $this->content, 
            'image' => $this->image, 
            'slug' => $this->slug, 
            'tags' => $this->tags,
            'status' => $this->status, 
            'created_at' => $this->created_at->toDateTimeString(), 
            'updated_at' => $this->updated_at->toDateTimeString(), 
        ];
    }
}

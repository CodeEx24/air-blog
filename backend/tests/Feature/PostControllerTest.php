<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use App\Models\Post;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_paginated_posts()
    {
        Post::factory()
            ->count(50)
            ->create();

        $response = $this->json("GET", "/api/posts", [
            "page" => 2,
            "pageSize" => 10,
        ]);
   
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                "success",
                "data" => [
                    "items",
                    "pagination" => ["pageIndex", "pageSize"],
                    "pageCount",
                    "totalRecords",
                ],
            ]);

        $data = $response->json("data");
        $this->assertCount(10, $data["items"]);
        $this->assertEquals(2, $data["pagination"]["pageIndex"]);
    }

    public function test_index_filters_posts_by_author()
    {
        $authorName = "John Doe";
        Post::factory()->create(["author" => $authorName]);

        $response = $this->json("GET", "/api/posts", [
            "author" => $authorName,
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonFragment(["author" => $authorName]);
    }

    public function test_index_sorts_posts_by_title()
    {
        Post::factory()->create(["title" => "A Post"]);
        Post::factory()->create(["title" => "Z Post"]);
    
        $response = $this->json("GET", "/api/posts", [
            "sort_title" => "asc",
        ]);
    
        $response->assertStatus(200);
    
        $titles = array_column($response->json("data.items"), "title");
        $this->assertEquals(["A Post", "Z Post"], $titles);
    }
    
    public function test_index_returns_no_items()
    {
        $response = $this->json("GET", "/api/posts", [
            "sortField" => "invalid_field",
        ]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            "success",
            "data" => [
                "items",
                "pagination" => ["pageIndex", "pageSize"],
                "pageCount",
                "totalRecords",
            ],
        ]);

        $response->assertJson([
            "success" => true,
            "data" => [
                "items" => [],
                "pagination" => [
                    "pageIndex" => 1,
                    "pageSize" => 10,
                ],
                "pageCount" => 1,
                "totalRecords" => 0,
            ],
        ]);
    }

    public function test_store_creates_post_successfully()
    {
        $data = [
            "author" => "John Doe",
            "author_image" => "data:image/png;base64,validBase64String",
            "title" => "Post Title",
            "content" => "This is the content of the post.",
            "image" => "data:image/jpeg;base64,validBase64String",
            "slug" => "post-title",
            "tags" => "tags",
            "status" => "Draft",
        ];

        $response = $this->json("POST", "/api/posts", $data);

        $response->assertStatus(201);

        $response->assertJson([
            "success" => true,
            "message" => "Post created successfully!",
        ]);

        $this->assertDatabaseHas("posts", [
            "author" => "John Doe",
            "title" => "Post Title",
            "slug" => "post-title",
            "tags" => "tags",
            "status" => "Draft",
        ]);
    }

    public function test_store_returns_validation_errors_for_invalid_data()
    {
        // Create an existing post for testing unique slug validation
        $existingPost = Post::create([
            "author" => "John Doe",
            "author_image" => "validBase64ImageStringHere",
            "title" => "Dummy Post Title",
            "content" => "Dummy content here",
            "slug" => "invalid-slug",  // Duplicate slug
            "tags" => "",
            "status" => "Draft",
        ]);
    
        // Prepare invalid data for the test
        $data = [
            "author" => "",  // Empty author
            "author_image" => "invalidBase64String",  // Invalid base64 image
            "title" => "",  // Empty title
            "content" => "",  // Empty content
            "slug" => "invalid-slug",  // Slug is already taken
            "tags" => "",  // Tags should be valid or empty if not required
            "status" => "InvalidStatus",  // Invalid status
        ];
    
        // Send POST request to store a post
        $response = $this->json("POST", "/api/posts", $data);
    
        // Log response for debugging
        Log::info("Response Status: " . $response->status());
        Log::info("Full Response: " . $response->getContent());
    
     
        $response->assertStatus(200);
    
        // Validate the error response structure
        $response->assertJson([
            "success" => false,
            "message" => "Validation errors",
            "data" => [
                "author" => ["The author field is required."],
                "author_image" => ["The author image field format is invalid."],
                "title" => ["The title field is required."],
                "content" => ["The content field is required."],
                "slug" => ["The slug has already been taken."],
                "tags" => ["The tags field is required."],
                "status" => ["The selected status is invalid."],
            ],
        ]);
    }
    
    public function test_store_returns_error_for_invalid_image_format()
    {
        $data = [
            "author" => "John Doe",
            "author_image" => "notValidBase64",
            "title" => "Post Title",
            "content" => "This is the content of the post.",
            "slug" => "post-title",
            "status" => "Draft",
        ];

        $response = $this->json("POST", "/api/posts", $data);

        $response->assertStatus(200);

        $response->assertJson([
            "success" => false,
            "message" => "Validation errors",
            "data" => [
                "author_image" => ["The author image field format is invalid."],
            ],
        ]);
    }

    public function test_update_post_success()
    {
        $post = Post::create([
            "author" => "John Doe",
            "author_image" => "data:image/png;base64,validBase64String",
            "title" => "Original Title",
            "content" => "Original Content",
            "image" => "data:image/png;base64,validBase64String",
            "slug" => "original-slug",
            "tags" => "original-tags",
            "status" => "Draft",
        ]);

        $data = [
            "author" => "Jane Doe",
            "author_image" => "data:image/png;base64,validBase64String",
            "title" => "Updated Title",
            "content" => "Updated Content",
            "image" => "data:image/png;base64,validBase64String",
            "slug" => "updated-slug",
            "tags" => "original-tags",
            "status" => "Published",
        ];

        $response = $this->json("PUT", "/api/posts/{$post->id}", $data);

        $response->assertStatus(200);

        $response->assertJson([
            "success" => true,
            "data" => "Post updated successfully",
        ]);

        $post->refresh();
        $this->assertEquals("Jane Doe", $post->author);
        $this->assertEquals("Updated Title", $post->title);
        $this->assertEquals("Updated Content", $post->content);
        $this->assertEquals("updated-slug", $post->slug);
        $this->assertEquals("Published", $post->status);
    }

    public function test_update_post_validation_error_slug_taken()
    {
        $post1 = Post::create([
            "author" => "John Doe",
            "author_image" =>
                "http://127.0.0.1:8000/storage/featured_images/featured_image_67714dbda1782.png",
            "title" => "Post 1 Title",
            "content" => "Post 1 Content",
            "image" =>
                "http://127.0.0.1:8000/storage/featured_images/featured_image_67714dbda1782.png",
            "slug" => "unique-slug-1",
            "tags" => "original-tags",
            "status" => "Draft",
        ]);

        $post2 = Post::create([
            "author" => "Jane Doe",
            "author_image" =>
                "http://127.0.0.1:8000/storage/featured_images/featured_image_67714dbda1782.png",
            "title" => "Post 2 Title",
            "content" => "Post 2 Content",
            "image" =>
                "http://127.0.0.1:8000/storage/featured_images/featured_image_67714dbda1782.png",
            "slug" => "unique-slug-2",
            "tags" => "original-tags",
            "status" => "Draft",
        ]);

        $data = [
            "slug" => "unique-slug-1",
            "author" => "Jane Doe",
            "author_image" =>
                "http://127.0.0.1:8000/storage/featured_images/featured_image_67714dbda1782.png",
            "title" => "Post 2 Title Updated",
            "content" => "Post 2 Content Updated",
            "image" =>
                "http://127.0.0.1:8000/storage/featured_images/featured_image_67714dbda1782.png",
            "status" => "Draft",
        ];

        $response = $this->json("PUT", "/api/posts/{$post2->id}", $data);

        $response->assertStatus(200);

        $response->assertJson([
            "success" => false,
            "message" => "Validation errors",
            "data" => [
                "slug" => ["The slug has already been taken."],
            ],
        ]);
    }

    public function test_update_post_validation_error_invalid_image_format()
    {
        $post = Post::create([
            "author" => "John Doe",
            "author_image" => "validBase64ImageStringHere",
            "title" => "Original Title",
            "content" => "Original Content",
            "slug" => "original-slug",
            "tags" => "original-tags",
            "status" => "Draft",
        ]);

        $data = [
            "author_image" => "invalidBase64String",
        ];

        $response = $this->json("PUT", "/api/posts/{$post->id}", $data);

        $response->assertStatus(200);

        $response->assertJson([
            "success" => false,
            "message" => "Validation errors",
            "data" => [
                "author_image" => [
                    "The author_image field must be a valid base64 string or URL.",
                ],
            ],
        ]);
    }

    public function test_update_post_validation_error_invalid_status()
    {
        $post = Post::create([
            "author" => "John Doe",
            "author_image" => "validBase64ImageStringHere",
            "title" => "Original Title",
            "content" => "Original Content",
            "slug" => "original-slug",
            "tags" => "original-tags",
            "status" => "Draft",
        ]);

        $data = [
            "status" => "InvalidStatus",
        ];

        $response = $this->json("PUT", "/api/posts/{$post->id}", $data);

        $response->assertStatus(200);

        $response->assertJson([
            "success" => false,
            "message" => "Validation errors",
            "data" => [
                "status" => ["The selected status is invalid."],
            ],
        ]);
    }

    public function test_destroy_post_successfully()
    {
        $post = Post::create([
            "author" => "Jane Doe",
            "author_image" =>
                "http://127.0.0.1:8000/storage/featured_images/featured_image_67714dbda1782.png",
            "title" => "Post 2 Title",
            "content" => "Post 2 Content",
            "image" =>
                "http://127.0.0.1:8000/storage/featured_images/featured_image_67714dbda1782.png",
            "slug" => "unique-slug-2",
            "tags" => "original-tags",
            "status" => "Draft",
        ]);

        $response = $this->json("DELETE", "/api/posts/{$post->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing("posts", [
            "id" => $post->id,
        ]);
    }

    public function test_destroy_post_not_found()
    {
        $nonExistingPostId = 99999;

        $response = $this->json("DELETE", "/api/posts/{$nonExistingPostId}");

        $response->assertStatus(404);

        $response->assertJson([
            "success" => false,
            "message" => "No data found",
        ]);
    }

    public function test_get_post_by_slug_success()
    {
        $post = Post::create([
            "author" => "John Doe",
            "title" => "Test Post",
            "content" => "Test Content",
            "slug" => "test-post",
            "status" => "Published",
            "tags" => "original-tags",
        ]);

        $response = $this->json("GET", "/api/posts/slug/{$post->slug}");

        $response->assertStatus(200);

        $response->assertJson([
            "success" => true,
            "data" => [
                "id" => $post->id,
                "slug" => $post->slug,
                "author" => $post->author,
                "title" => $post->title,
                "content" => $post->content,
                "image" => $post->image,
                "author_image" => $post->author_image,
                "created_at" => $post->created_at->toDateTimeString(),
            ],
        ]);
    }

    public function test_get_post_by_slug_not_found()
    {
        $response = $this->json("GET", "/api/posts/slug/non-existing-slug");

        $response->assertStatus(404);

        $response->assertJson([
            "success" => false,
            "message" => "Post not found",
            "data" => null,
        ]);
    }
}

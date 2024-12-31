<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Interfaces\PostRepositoryInterface;
use App\Http\Resources\PostResource;
use App\Classes\ApiResponseClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    private PostRepositoryInterface $postRepositoryInterface;

    public function __construct(
        PostRepositoryInterface $postRepositoryInterface
    ) {
        $this->postRepositoryInterface = $postRepositoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $queryParams = $request->only([
            "page",
            "pageSize",
            "title",
            "content",
            "author",
            "status",
        ]);

        $sortParams = [];

        foreach ($request->all() as $key => $value) {
            if (strpos($key, "sort_") === 0) {
                $field = str_replace("sort_", "", $key);
                $direction = $value == "desc" ? "desc" : "asc";
                $sortParams[] = [$field, $direction];
            }
        }

        $data = $this->postRepositoryInterface->index(
            $queryParams,
            $sortParams
        );

        $pagination = [
            "pagination" => [
                "pageIndex" => $data->currentPage(),
                "pageSize" => $data->perPage(),
            ],
            "pageCount" => $data->lastPage(),
            "totalRecords" => $data->total(),
        ];

        return ApiResponseClass::sendResponse(
            PostResource::collection($data->items()),
            "",
            200,
            true,
            $pagination
        );
    }

    /**
     * Store a newly created resource in storage.
     */

    private function handleImageUpload($imageData, $folder, $imagePrefix)
    {
        if (!$imageData || strpos($imageData, "data:image") !== 0) {
            Log::warning("{$imagePrefix} not provided or invalid.");
            return null;
        }

        $imageParts = explode(";", $imageData);
        $imageType = explode("/", $imageParts[0])[1];
        $base64Data = explode(",", $imageParts[1])[1];

        $imageData = base64_decode($base64Data);

        $fileName = uniqid("{$imagePrefix}_") . "." . $imageType;

        $storeSuccess = Storage::disk("public")->put(
            "{$folder}/{$fileName}",
            $imageData
        );

        if ($storeSuccess) {
            $imagePath = Storage::disk("public")->url("{$folder}/{$fileName}");
            return $imagePath;
        } else {
            Log::warning("Failed to store the {$imagePrefix}.");
            return null;
        }
    }

    public function store(StorePostRequest $request)
    {
        $authorImagePath = $this->handleImageUpload(
            $request->author_image,
            "author_images",
            "author_image"
        );
        $imagePath = $this->handleImageUpload(
            $request->image,
            "featured_images",
            "featured_image"
        );

        $details = [
            "author" => $request->author,
            "author_image" => $authorImagePath,
            "title" => $request->title,
            "content" => $request->content,
            "image" => $imagePath,
            "tags" => $request->tags,
            "slug" => $request->slug,
            "status" => $request->status ?? "Draft",
        ];

        DB::beginTransaction();

        try {
            $post = $this->postRepositoryInterface->store($details);

            DB::commit();

            return ApiResponseClass::sendResponse(
                $post,
                "Post created successfully!",
                201
            );
        } catch (\Exception $ex) {
            DB::rollBack();

            ApiResponseClass::rollback(
                $ex,
                "An error occurred while creating the post."
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = $this->postRepositoryInterface->getById($id);

        return ApiResponseClass::sendResponse(new PostResource($post), "", 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, $id)
    {
        // Process images only if they are not null
        $authorImage = $request->author_image ? $this->processImage(
            $request->author_image,
            "author_images",
            "author_image"
        ) : null;
    
        $image = $request->image ? $this->processImage(
            $request->image,
            "featured_images",
            "featured_image"
        ) : null;
    
        // Conditionally add the image fields to the update details
        $updateDetails = [
            "author" => $request->author,
            "title" => $request->title,
            "content" => $request->content,
            "slug" => $request->slug,
            "status" => $request->status ?? "Draft",
        ];
    
        // Only include the image fields if they are not null
        if ($authorImage !== null) {
            $updateDetails["author_image"] = $authorImage;
        }
    
        if ($image !== null) {
            $updateDetails["image"] = $image;
        }
    
        DB::beginTransaction();
    
        try {
            $post = $this->postRepositoryInterface->update($updateDetails, $id);
    
            DB::commit();
            return ApiResponseClass::sendResponse(
                "Post updated successfully",
                "",
                200
            );
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseClass::rollback($ex);
        }
    }
    

    private function processImage($image, $directory, $field)
    {
        if (
            preg_match(
                "/^data:image\/(png|jpg|jpeg|gif|bmp|webp);base64,/",
                $image
            )
        ) {
            return $this->handleImageUpload($image, $directory, $field);
        }

        return $image;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $isDeleted = $this->postRepositoryInterface->delete($id);

        if ($isDeleted) {
            return ApiResponseClass::sendResponse(
                "Post deleted successfully",
                "",
                204
            );
        }

        return ApiResponseClass::sendResponse("", "No data found", 404, false);
    }

    public function getBySlug($slug)
    {
        $post = $this->postRepositoryInterface->getBySlug($slug);

        if (!$post) {
            return ApiResponseClass::sendResponse(
                "",
                "Post not found",
                404,
                false
            );
        }

        return ApiResponseClass::sendResponse(new PostResource($post), "", 200);
    }
}

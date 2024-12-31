<?php

namespace App\Repositories;

use App\Models\Post;
use App\Interfaces\PostRepositoryInterface;
use Illuminate\Support\Facades\Log;

class PostRepository implements PostRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    public function index($queryParams, $sortParams)
    {
        $page = $queryParams["page"] ?? 1;
        $pageSize = $queryParams["pageSize"] ?? 10;

        $query = Post::query();

        if (isset($queryParams["author"])) {
            $author = $queryParams["author"];
            $query->where("author", "like", "%" . $author . "%");
        }

        if (isset($queryParams["title"])) {
            $title = $queryParams["title"];
            $query->where("title", "like", "%" . $title . "%");
        }

        if (isset($queryParams["content"])) {
            $content = $queryParams["content"];
            $query->where("content", "like", "%" . $content . "%");
        }

        if (isset($queryParams["status"])) {
            $status = $queryParams["status"];
            $statuses = explode(",", $status);
            $query->whereIn("status", $statuses);
        }

        if (empty($sortParams)) {
            $query->orderBy("created_at", "desc");
        } else {
            foreach ($sortParams as $sortField) {
                $query->orderBy($sortField[0], $sortField[1]);
            }
        }

        return $query->paginate($pageSize, ["*"], "page", $page);
    }

    public function getById($id)
    {
        return Post::findOrFail($id);
    }

    public function store(array $data)
    {
        return Post::create($data);
    }

    public function update(array $data, $id)
    {
        return Post::whereId($id)->update($data);
    }

    public function delete($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return false;
        }

        return Post::destroy($id) > 0;
    }

    public function getBySlug($slug)
    {
        $post = Post::where("slug", $slug)->first();

        if (!$post || $post->status !== "Published") {
            return false;
        }

        return $post;
    }
}

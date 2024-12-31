<?php

namespace App\Interfaces;

interface PostRepositoryInterface
{
    public function index($queryParams, $sortParams);
    public function getById($id);
    public function store(array $data);
    public function update(array $data,$id);
    public function delete($id);

    public function getBySlug($slug);

}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;

class PostFactory extends Factory
{

    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       
        $imageUrls = [
            'https://images.pexels.com/photos/18041953/pexels-photo-18041953/free-photo-of-woman-in-seductive-pose-looking-at-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/2033287/pexels-photo-2033287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/27897903/pexels-photo-27897903/free-photo-of-close-up-portrait-of-a-man.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/27897903/pexels-photo-27897903/free-photo-of-close-up-portrait-of-a-man.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/2658834/pexels-photo-2658834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/15502152/pexels-photo-15502152/free-photo-of-posed-photo-of-a-young-woman-in-a-black-hat-covered-in-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/15502152/pexels-photo-15502152/free-photo-of-posed-photo-of-a-young-woman-in-a-black-hat-covered-in-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/12453979/pexels-photo-12453979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/28280965/pexels-photo-28280965/free-photo-of-playful.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/5193864/pexels-photo-5193864.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        ];

        $featuredImageUrls = [
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2F8GwEfeTRxxOh2dB1CaEg&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FQRjBHxegQniYOSzEKnF1&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FsR7EO0aT0iYXmrf7tLHL&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FWH8MCseCS06t4yyn7RmD&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2F4uJHcUCpQ5iJSJ5Teopb&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FCXGjx0HqTVCPcn9pfjBk&w=3840&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2F5eaE4qRfuMRfL4JN8k2A&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FS1EipqISRCOBfb8wakSQ&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FuF5ahYQgQVCMFw0g0Bct&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FuF5ahYQgQVCMFw0g0Bct&w=1920&q=75",
            "https://www.permit.io/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2Fblcru88fRvCw5NU6u5Uo&w=1920&q=75"
        ];

        $randomAuthorImageUrl = $this->faker->randomElement($imageUrls);
        $randomImageUrl = $this->faker->randomElement($featuredImageUrls);

        return [
            'author' => $this->faker->name(),
            'author_image' => $randomAuthorImageUrl,  
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraphs(3, true),
            'image' => $randomImageUrl, 
            'slug' => $this->faker->unique()->slug(),
            'status' => $this->faker->randomElement(['Archived', 'Draft', 'Published']),
            'tags' => implode(',', $this->faker->words(5)), 
            'created_at' => $this->faker->dateTimeBetween('-300 days', 'now'), 
        ];
    }
}

<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = false; // Disable wrapping the resource in a data key

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image_path' => $this->image_path ? Storage::url($this->image_path) : 'https://placehold.co/600x400?text=Hello\nWorld' ,
            'description' => $this->description,
            'status' => $this->status,
            'created_by' =>  new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'due_date' => (new Carbon($this->created_at))->format('d-M-Y'),
            'dueDate' =>(new Carbon($this->created_at))->format('Y-m-d'),
            'created_at' => (new Carbon($this->updated_at))->format('d-M-Y'),
        ];
    }
}

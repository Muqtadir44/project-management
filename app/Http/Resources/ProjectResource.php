<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'name' => $this->name,
            'image_path' => $this->image_path,
            'description' => $this->description,
            'status' => $this->status,
            'created_by' =>  new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'due_date' => (new Carbon($this->created_at))->format('d-M-Y'),
            'created_at' => (new Carbon($this->updated_at))->format('d-M-Y'),
        ];
    }
}

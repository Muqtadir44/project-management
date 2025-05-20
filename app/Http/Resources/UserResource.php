<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
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
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            'status' => $this->status,
            'designation' => new DesignationResource($this->designation),
            'role'=> new RoleResource($this->role),
            'created_at' => (new Carbon($this->created_at))->format('d-M-Y'),
            "picture" => $this->picture ? Storage::url($this->picture) : 'https://placehold.co/600x400?text=Hello\nWorld' ,
        ];
    }
}

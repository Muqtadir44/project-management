<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
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
            "role_name" => $this->role_name,
            "status" => $this->status,
            'created_at' => (new Carbon($this->created_at))->format('d-M-Y'),
        ];
    }
}

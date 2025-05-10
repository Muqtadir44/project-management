<?php

namespace Database\Seeders;

use App\Models\Designation;
use App\Models\Project;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::create([
         'role_name' =>   'Admin'
        ]);

        Designation::create([
            'designation_name' =>   'Head'
        ]);

        User::factory()->create([
            'name' => 'Muqtadir',
            'email' => 'muqtadir@gmail.com',
            'password' => bcrypt('secret123'),
            'email_verified_at' => time(),
            'role_id' => 1,
            'designation_id' => '1'
        ]);

        Project::factory()
        ->count(30)
        ->hasTasks(30)
        ->create();
    }
}

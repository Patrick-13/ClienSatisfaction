<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usermodules')->insert([
            [
                'user_id' => 1,
                'module_id' => 1,
                'created_at' => '2025-06-09 02:55:59',
                'updated_at' => '2025-06-09 02:55:59',
            ],
            [
                'user_id' => 1,
                'module_id' => 4,
                'created_at' => '2025-06-09 02:55:59',
                'updated_at' => '2025-06-09 02:55:59',
            ],
        ]);
        $this->call(UserModulesTableSeeder::class);
    }
}

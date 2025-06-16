<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('modules')->insert([
            [
                'id' => 1,
                'name' => 'dashboard',
                'created_at' => '2025-05-21 00:47:51',
                'updated_at' => '2025-05-28 00:47:51',
            ],
            [
                'id' => 2,
                'name' => 'clientsatisfactiondata',
                'created_at' => '2025-05-21 00:47:51',
                'updated_at' => '2025-05-21 00:47:51',
            ],
            [
                'id' => 3,
                'name' => 'officerscheduler',
                'created_at' => '2025-05-21 00:48:30',
                'updated_at' => '2025-05-21 00:48:30',
            ],
            [
                'id' => 4,
                'name' => 'usermodule',
                'created_at' => '2025-05-21 01:54:58',
                'updated_at' => '2025-05-21 01:54:58',
            ],
            [
                'id' => 5,
                'name' => 'employee',
                'created_at' => '2025-05-21 05:35:37',
                'updated_at' => '2025-05-21 05:35:37',
            ],
            [
                'id' => 6,
                'name' => 'usersystemlog',
                'created_at' => '2025-05-22 02:11:15',
                'updated_at' => '2025-05-22 02:11:15',
            ],
        ]);

        $this->call(ModulesTableSeeder::class);
    }
}

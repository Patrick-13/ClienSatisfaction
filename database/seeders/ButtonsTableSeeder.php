<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ButtonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('buttons')->insert([
            [
                'id' => 1,
                'button_name' => 'Create',
                'created_at' => '2025-05-28 22:39:07',
                'updated_at' => '2025-05-28 22:39:07',
            ],
            [
                'id' => 2,
                'button_name' => 'Edit',
                'created_at' => '2025-05-28 22:39:07',
                'updated_at' => '2025-05-28 22:39:07',
            ],
            [
                'id' => 3,
                'button_name' => 'Delete',
                'created_at' => '2025-05-28 22:39:07',
                'updated_at' => '2025-05-28 22:39:07',
            ],
            [
                'id' => 4,
                'button_name' => 'Update',
                'created_at' => '2025-05-28 22:39:07',
                'updated_at' => '2025-05-28 22:39:07',
            ],
            [
                'id' => 5,
                'button_name' => 'Import',
                'created_at' => '2025-05-28 22:39:07',
                'updated_at' => '2025-05-28 22:39:07',
            ],
            [
                'id' => 6,
                'button_name' => 'Export',
                'created_at' => '2025-05-28 22:39:07',
                'updated_at' => '2025-05-28 22:39:07',
            ],
            [
                'id' => 7,
                'button_name' => 'Notification',
                'created_at' => '2025-06-03 02:18:07',
                'updated_at' => '2025-06-03 02:18:07',
            ],
        ]);
        $this->call(ButtonsTableSeeder::class);
    }
}

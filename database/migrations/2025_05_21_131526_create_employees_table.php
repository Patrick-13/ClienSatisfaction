<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('embId');
            $table->date('date_registered');
            $table->string('fullName');
            $table->string('designation');
            $table->string('email');
            $table->foreignId('division_id')->constrained('divisions');
            $table->foreignId('section_id')->constrained('sections');
            $table->foreignId(column: 'unit_id')->constrained('units');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};

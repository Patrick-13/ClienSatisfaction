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
        Schema::create('officer_schedulers', function (Blueprint $table) {
            $table->id();
            $table->string('odName');
            $table->date('date');
            $table->time('timeStart');
            $table->time('timeEnd');
            $table->string('email');
            $table->text(column: 'remarks');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('officer_schedulers');
    }
};

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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('appointmentNumber')->unique();
            $table->date('date');
            $table->time('time');
            $table->foreignId('transactionType')->constrained()->onDelete('cascade');
            $table->string('fullname');
            $table->string('sex');
            $table->string('sector');
            $table->string('company');
            $table->string('address');
            $table->string('contactNo');
            $table->string('email');
            $table->string('remarks');
            $table->boolean('termsandcondition');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};

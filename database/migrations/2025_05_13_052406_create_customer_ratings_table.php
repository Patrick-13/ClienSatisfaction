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
        Schema::create('customer_ratings', function (Blueprint $table) {
            $table->id();
            $table->string('odName');
            $table->string('appointmentNumber');
            $table->date('date');
            $table->string('clientName');
            $table->string('sex');
            $table->string('sector');
            $table->string('companyName');
            $table->string('address');
            $table->string('contactNumber');
            $table->string(column: 'email');
            $table->string('timeIn');
            $table->string('transactionType');
            $table->string('unitVisited');
            $table->string('personnel');
            $table->string('rating');
            $table->string('timeOut');
            $table->string('comments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_ratings');
    }
};

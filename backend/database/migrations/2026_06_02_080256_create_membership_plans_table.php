<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('membership_plans', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            // Harga sebelum diskon
            $table->decimal('original_price', 10, 2);

            // Harga yang dibayar user
            $table->decimal('sale_price', 10, 2);

            // Harga yang ditampilkan per bulan
            $table->decimal('display_monthly_price', 10, 2);

            $table->integer('duration_days');

            $table->string('badge')->nullable();

            $table->text('description')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_plans');
    }
};

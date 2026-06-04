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
        Schema::create('membership_benefits', function (Blueprint $table) {
            $table->id();

            $table->foreignId('membership_plan_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('benefit_text');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_benefits');
    }
};

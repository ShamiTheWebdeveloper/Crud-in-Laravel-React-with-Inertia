<?php

namespace Database\Seeders;

use App\Models\Car;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $car=[
            'user_id'=>1,
            'company'=>'BMW',
            'model'=>'i7',
            'description'=>fake()->text(),
        ];
//        event(new Car($car));
        Car::create($car);
    }
}

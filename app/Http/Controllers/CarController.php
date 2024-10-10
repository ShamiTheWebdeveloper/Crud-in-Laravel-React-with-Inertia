<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request as FormRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Car/Index', ['cars' => Car::all()]);
    }

    public function store(FormRequest $request)
    {
        $validate=$request->validate([
            'company' => 'required|min:3',
            'model' => 'required|min:3',
            'description' => 'required|min:20',
        ]);
        $validate['user_id'] = Auth::id();
        Car::updateOrCreate(
            ['id' => $request['id']],$validate
        );
        return redirect()->route('cars.index');
    }
    public function destroy(Car $car)
    {
        $car->delete();
    }
}

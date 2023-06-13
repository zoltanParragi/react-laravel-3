<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use App\Models\User;
//use Illuminate\Support\Facades\Mail;
//use App\Mail\RegisterMail;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::post('/register', function(Request $request) {
    
    try {
        $validated = $request->validate([
            'name'=> 'required|min:3|max:20',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:4|max:20|confirmed',
        ]);
    } catch (ValidationExeption $e) {
        return response(['errors'=>$e->errors()], 422);
    }

    //$validated['verification_token'] = Str::random(60);

    //$user = User::create($validated);

    //Mail::to($user->email)->send(new RegisterMail($user));

    return response(['message'=> 'Sikeres regisztráció']);
});


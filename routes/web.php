<?php

use App\Http\Controllers\CustomerRatingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OfficerSchedulerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingdataController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsermoduleController;
use App\Http\Controllers\UsersystemlogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [DashboardController::class, 'clientindex'])->name('client.index');

Route::get('/superuseraccess', function () {
    return Inertia::render('SuperUserAccess'); // Or wherever you show the account disabled message
})->name('superuseraccess');

Route::get('/unauthorizedaccess', function () {
    return Inertia::render('UnAuthorized'); // Or wherever you show the account disabled message
})->name('unauthorizedaccess');

//client route no validation
Route::post('/customer', [CustomerRatingController::class, 'store'])->name('customer.store');
Route::get('/customer/index', [CustomerRatingController::class, 'index'])->name('customer.index');

//only verified user can access this route
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard')->middleware('moduleaccess:1');
    Route::resource('ratingdata', RatingdataController::class)->middleware('moduleaccess:2');

    Route::resource('officerschedule', OfficerSchedulerController::class)->middleware('moduleaccess:3');
    Route::post('/officerschedule/import/csv', [OfficerSchedulerController::class, 'import_csv']);

    Route::resource('usersystemlog', UsersystemlogController::class)->middleware('moduleaccess:6');

    Route::resource('employee', EmployeeController::class)->middleware('moduleaccess:5');
    Route::get('/employee/{emploeeId}/edit', [EmployeeController::class, 'edit']);
    Route::get('/employee/create/import', [EmployeeController::class, 'import'])->name('employee.import');
    Route::post('/employee/import/csv', [EmployeeController::class, 'import_employee']);

    Route::post('/ratingdata/export/csv', [RatingdataController::class, 'export_csv']);
    Route::post('/officerschedule/export/csv', [OfficerSchedulerController::class, 'export_csv']);
    Route::get('/ratings/show/{filterCategory}', [RatingdataController::class, 'show']);
    Route::get('/ratingsdashboard/ratings', [DashboardController::class, 'index'])->name('ratingsdashboard.index');

    Route::get('/user/{userId}/modules', [UserController::class, 'getUserModules']);
    Route::get('/user-modules', [UsermoduleController::class, 'create']);
    Route::get('/usermodule/{usermodule}/edit', [UsermoduleController::class, 'edit'])->name('usermodule.edit');
    Route::get('/user-modules', [UsermoduleController::class, 'getUserModules']);
    Route::put('/usermodule/{id}/modules/update-access', [UsermoduleController::class, 'updateModuleAccess'])->name('usermodule.updateModuleAccess');
});

//only superuser can access this route
Route::middleware(['auth', 'superuser', 'verified'])->group(function () {
    Route::resource('usermodule', UsermoduleController::class);
});

Route::get('/notifications', [NotificationController::class, 'notification'])
    ->name('notification');


//auth user can access this route
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

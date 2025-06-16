<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerRatingResource;
use App\Models\CustomerRating;
use App\Models\Division;
use App\Models\Employee;
use App\Models\OfficerScheduler;
use App\Models\Section;
use App\Models\TransactionType;
use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dateFrom = request()->query('dateFrom');
        $dateTo = request()->query('dateTo');
        $sex = request()->query('sex');
        $rating = request()->query('rating');
        $sector = request()->query('sector');

        $baseQuery = CustomerRating::query()->when($dateFrom && $dateTo, function ($query) use ($dateFrom, $dateTo) {
            return $query->whereBetween('date', [$dateFrom, $dateTo]);
        })->when($sector, function ($query) use ($sector) {
            return $query->where('sector', $sector);
        })->when($sex, function ($query) use ($sex) {
            return $query->where('sex', $sex);
        })->when($rating, function ($query) use ($rating) {
            return $query->where('rating', $rating);
        });

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $clientratingdatas = $baseQuery->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        $clientratingdatas->appends(request()->only(['dateFrom', 'dateTo', 'sex', 'status', 'sort_field', 'sort_direction']));

        $totalCount = $clientratingdatas->total();

        // Get the count of positions being displayed on the current page
        $currentPageCount = $clientratingdatas->count();
        $currentPage = $clientratingdatas->currentPage();

        $excellent = (clone $baseQuery)->where('rating', 'Excellent')->count();
        $veryGood  = (clone $baseQuery)->where('rating', 'Good')->count();
        $Bad       = (clone $baseQuery)->where('rating', 'Bad')->count();
        $veryBad   = (clone $baseQuery)->where('rating', 'Very Bad')->count();
        $male = (clone $baseQuery)
            ->where('sex', 'Male')
            ->select('clientName', 'date')
            ->distinct()
            ->get()
            ->count();



        $female = (clone $baseQuery)
            ->where('sex', 'Female')
            ->select('clientName', 'date')
            ->distinct()
            ->count('clientName');

        // If the request is AJAX (like from axios), return JSON
        if (request()->wantsJson()) {
            return response()->json([
                'excellent' => $excellent,
                'veryGood'  => $veryGood,
                'Bad'       => $Bad,
                'veryBad'   => $veryBad,
                'male'   => $male,
                'female'   => $female,
            ]);
        }

        // Otherwise return the Inertia page
        return inertia("Dashboard", [
            "clientratingdatas" => CustomerRatingResource::collection($clientratingdatas),
            'excellent' => $excellent,
            'veryGood'  => $veryGood,
            'Bad'       => $Bad,
            'veryBad'   => $veryBad,
            'male'       => $male,
            'female'   => $female,
            'totalCount' => $totalCount,
            'currentPageCount' => $currentPageCount,
            'currentPage' => $currentPage,

        ]);
    }

    public function quarterlyRatings()
    {
        $quarterly = CustomerRating::query()
            ->selectRaw("
    CONCAT('Q', QUARTER(date), ' ', YEAR(date)) as quarter,
    SUM(CASE WHEN rating = 'Excellent' THEN 1 ELSE 0 END) as excellent,
    SUM(CASE WHEN rating = 'Good' THEN 1 ELSE 0 END) as good,
    SUM(CASE WHEN rating = 'Bad' THEN 1 ELSE 0 END) as bad,
    SUM(CASE WHEN rating = 'Very Bad' THEN 1 ELSE 0 END) as very_bad
")
            ->groupByRaw("YEAR(date), QUARTER(date)")
            ->orderByRaw("YEAR(date), QUARTER(date)")
            ->get();


        return response()->json($quarterly);
    }



    public function clientindex()
    {
        $today = Carbon::today()->toDateString();

        $todayOfficer = OfficerScheduler::whereDate('date', $today)
            ->orderBy('created_at', 'desc')
            ->first();


        $divisions = Division::orderBy('division_name', 'asc')->get();
        $sections = Section::orderBy('section_name', 'asc')->get();
        $transactiontypes = TransactionType::orderBy('id', 'asc')->get();
        $employees = Employee::orderBy('fullName', 'asc')->get();
        $units = Unit::orderBy('unit_name', 'asc')->get();



        return Inertia::render('Client', [
            'todayOfficer' => $todayOfficer,
            'divisions' => $divisions,
            'sections' => $sections,
            'transactiontypes' => $transactiontypes,
            'units' => $units,
            'employees' => $employees,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => \Illuminate\Foundation\Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function landingpage(){
        return Inertia::render('LandingPage');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsersystemlogResource;
use App\Models\Module;
use App\Models\Usersystemlog;
use Carbon\Carbon;


class UsersystemlogController extends Controller
{
    public function index()
    {
        $query = Usersystemlog::where('user_id', '!=', 31);

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $perPage = request('per_page', 10); // Default to 10 if not provided
        // Update $perPage to the selected value from the dropdown
        if (in_array($perPage, [10, 20, 50, 100])) {
            $perPage = (int) $perPage;
        } else {
            $perPage = 10; // Default to 10 if an invalid value is provided
        }

        if (request('module')) {
            $query->where("module", "like", "%" . request("module") . "%");
        }

        if (request('action')) {
            $query->where("action", "like", "%" . request("action") . "%");
        }
        if (request()->filled('dateFrom')) {
            $dateFrom = Carbon::createFromFormat('Y-m-d', request()->input('dateFrom'));
            $query->whereDate('created_at', $dateFrom);
        }

        $activitylogs = $query->orderBy($sortField, $sortDirection)->paginate($perPage)->onEachSide(1);

        $activitylogs->appends(request()->only(['dateFrom', 'per_page', 'module', 'sort_field', 'sort_direction']));
        // Get the total count of positions
        $totalCount = $activitylogs->total();
        // Get the count of positions being displayed on the current page
        $currentPageCount = $activitylogs->count();
        $currentPage = $activitylogs->currentPage();

        $modules = Module::orderBy('name', 'asc')->get();


        return inertia("Systemlog/Activitylogs", [
            "activitylogs" => UsersystemlogResource::collection($activitylogs),
            "modules" => $modules,
            'queryParams' => request()->query() ?: null,
            'totalCount' => $totalCount, // Pass the total count to the frontend
            'currentPageCount' => $currentPageCount, // Pass the count of positions on the current page
            'currentPage' => $currentPage,
            'success' => session('success'),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoginResource;
use App\Models\Loginlog;
use Illuminate\Http\Request;

class LoginlogController extends Controller
{
    public function index()
    {
        $query = Loginlog::query();


        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $perPage = request('per_page', 10); // Default to 10 if not provided
        // Update $perPage to the selected value from the dropdown
        if (in_array($perPage, [10, 20, 50, 100])) {
            $perPage = (int) $perPage;
        } else {
            $perPage = 10; // Default to 10 if an invalid value is provided
        }
        $loginlogs = $query->orderBy($sortField, $sortDirection)->paginate($perPage)->onEachSide(1);
        $loginlogs->appends(request()->only(['sort_field', 'sort_direction']));

        // Get the total count of positions
        $totalCount = $loginlogs->total();

        // Get the count of positions being displayed on the current page
        $currentPageCount = $loginlogs->count();
        $currentPage = $loginlogs->currentPage();

        return inertia("Systemlog/Loginlogs", [
            "loginlogs" => LoginResource::collection($loginlogs),
            'queryParams' => request()->query() ?: null,
            'totalCount' => $totalCount, // Pass the total count to the frontend
            'currentPageCount' => $currentPageCount, // Pass the count of positions on the current page
            'currentPage' => $currentPage,
            'success' => session('success'),
        ]);
    }
}

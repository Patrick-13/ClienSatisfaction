<?php

namespace App\Http\Controllers;

use App\Models\Button;
use App\Models\Usermodule;
use App\Models\Module;
use App\Models\User;
use Illuminate\Http\Request;

class UsermoduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('modules');

        $perPage = request('per_page', 10);
        if (!in_array($perPage, [10, 15, 20, 30])) {
            $perPage = 10;
        }

        if (request('name')) {
            $users->where("name", "like", "%" . request("name") . "%");
        }

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "asc");

        $users = $users->orderBy($sortField, $sortDirection)->paginate($perPage)->onEachSide(1);

        $users->appends(request()->only(['name', 'id', 'per_page', 'sort_field', 'sort_direction']));

        $modules = Module::all();

        return inertia('Module/Index', [
            'users' => $users,
            'modules' => $modules,
            'totalCount' => $users->total(),
            'currentPageCount' => $users->count(),
            'currentPage' => $users->currentPage(),
            'queryParams' => request()->query(), // Pass the query params here
            'success' => session('success'),
        ]);
    }

    public function getUserModules($userId)
    {
        // Find the user or fail
        $user = User::findOrFail($userId);

        // Get the IDs of the modules the user has access to
        $userModules = $user->modules()->pluck('id');

        // Return the module IDs as JSON
        return response()->json($userModules);
    }

    public function getUserButtons($userId)
    {
        // Find the user or fail
        $user = User::findOrFail($userId);

        // Get the IDs of the modules the user has access to
        $userButtons = $user->buttons()->pluck('id');

        // Return the module IDs as JSON
        return response()->json($userButtons);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $users = User::all();
        $modules = Module::all();


        return inertia('Module/Create', [
            'users' => $users,
            'modules' => $modules,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $moduleIds = $request->input('module_ids', []);
        $user->modules()->sync($moduleIds);

        return to_route('usermodule.index')->with(['success' => 'User Module Successfully created!']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::with(['modules', 'buttons'])->findOrFail($id);
        $modules = Module::all();
        $buttons = Button::all();

        return inertia('Module/UserShow', [
            'user' => $user,
            'modules' => $modules,
            'buttons' => $buttons,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usermodule $usermodule)
    {
        $users = User::all();
        $modules = Module::all();

        return inertia('Module/Edit', [
            'users' => $users,
            'modules' => $modules,
        ]);
    }

    public function updateModuleAccess(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Assuming you update modules in a many-to-many relationship
        $modules = $request->input('modules', []);


        // Update the user's modules
        $user->modules()->sync($modules); // This works if it's a many-to-many relationship

        // Update submodules for each module


        return redirect()->route('usermodule.show', $id)->with(['success' => 'Module Access updated successfully.']);
    }


    public function updatebuttonAccess(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Assuming you update modules in a many-to-many relationship
        $buttons = $request->input('buttons', []);


        // Update the user's modules
        $user->buttons()->sync($buttons); // This works if it's a many-to-many relationship

        // Update submodules for each module


        return redirect()->route('usermodule.show', $id)->with(['success' => 'Button Access updated successfully.']);
    }
}

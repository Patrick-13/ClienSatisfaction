<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserModules($userId)
    {
        $userModules = User::findOrFail($userId)
            ->modules()
            ->pluck('id'); // Remove the select to get raw IDs

        return response()->json($userModules);
    }

    public function getUserButtons($userId)
    {
        $userButtons = User::findOrFail($userId)
            ->buttons()
            ->pluck('id'); // Remove the select to get raw IDs

        return response()->json($userButtons);
    }
}

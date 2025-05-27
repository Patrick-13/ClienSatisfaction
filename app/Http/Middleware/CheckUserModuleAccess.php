<?php

namespace App\Http\Middleware;

use App\Models\Usermodule;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CheckUserModuleAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $requiredModuleId)
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'User not authenticated.');
        }

        $userId = $user->id;

        $userHasAccess = Usermodule::where('user_id', $userId)
            ->where('module_id', $requiredModuleId)
            ->exists();

        if (!$userHasAccess) {
            return redirect()->route('unauthorizedaccess');
        }

        return $next($request);
    }
}

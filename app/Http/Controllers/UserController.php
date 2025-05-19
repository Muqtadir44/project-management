<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Designation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = User::query();

        $sortField = request("sortField", "created_at");
        $sortOrder = request("sortOrder", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        // if(request("status")){
        //     $query->where("status", request("status"));
        // }

        $users = $query
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)->onEachSide(5);

        // dd($users);

        return Inertia::render('Users/Index', props: [
            'users' => UserResource::collection($users),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $roles = Role::Active();
        $designations = Designation::Active();


        return Inertia::render('Users/Create', ['roles' => $roles, 'designations' => $designations]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        // dd($data);

        $picture = $data['picture'] ?? null;
        if ($picture) {
            $picture = $picture->store('users', 'public');
        }


        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'status' => $data['status'],
            'role_id' => $data['role'],
            'designation_id' => $data['designation'],
            'picture' => $picture
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $roles = Role::get();
        $designations = Designation::get();


        $user = User::findOrFail($id);
        return Inertia::render('Users/Edit', props: [
            'user' => $user,
            'roles' => $roles,
            'designations' => $designations
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        // Handle Picture
        if (isset($data['picture']) && $data['picture']) {
            if ($user->image_path && Storage::disk('public')->exists($user->image_path)) {
                Storage::disk('public')->delete($user->image_path);
            }
            $picture = $data['picture']->store('users', 'public');
        } else {
            $picture = $user->picture;
        }

        // Handle Password
        // if (isset($data['password']) && $data['password']) {
        //     $password = bcrypt($data['password']);
        // } else {
        //     $password = $user->password; // keep existing password
        // }


        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'] ?? bcrypt($data['password']),
            'status' => $data['status'],
            'role_id' => $data['role'],
            'designation_id' => $data['designation'],
            'picture' => $picture
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted.');
    }
}

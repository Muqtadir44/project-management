<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Designation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        if($picture){
            $picture = $picture->store('users','public');
        }


        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'status' => $data['status'],
            'role_id' => $data['role'],
            'designation_id' => $data['designation'],
            'picture'=>$picture
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
        $user = User::findOrFail($id);
        return Inertia::render('Users/Edit', props: [
            'user' => $user,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|unique:users,email,' . $id,
    //         'password' => 'required|string|min:8',
    //     ]);

    //     User::find($id)->update([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => bcrypt($request->password),
    //     ]);

    //     return redirect()->route('users.index')->with('success', 'User updated successfully.');
    // }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        // Basic info validation
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        // If password fields are filled, validate them
        if ($request->filled('current_password') || $request->filled('password')) {
            $request->validate([
                'current_password' => [
                    'required',
                    function ($attribute, $value, $fail) use ($user) {
                        if (!Hash::check($value, $user->password)) {
                            $fail('The current password is incorrect.');
                        }
                    }
                ],
                'password' => 'required|string|min:8|confirmed',
            ]);

            $validatedData['password'] = bcrypt($request->password);
        }

        $user->update($validatedData);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
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

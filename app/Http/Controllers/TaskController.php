<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sortField", "created_at");
        $sortOrder = request("sortOrder", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", request("status"));
        }

        if (request("priority")) {
            $query->where("priority", request("priority"));
        }

        $tasks = $query
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)->onEachSide(5);

        return Inertia::render("Tasks/Index", [
            "tasks"       => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::all()->pluck("name", "id");
        $users    = User::all()->pluck("name", "id");
        return inertia("Tasks/Create", ['projects' => $projects, 'users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        // dd($data);

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        $image = $data['image'] ?? null;
        if ($image) {
            $image = $image->store('tasks', 'public');
        }

        Task::create([
            'name'             => $data['name'],
            'description'      => $data['description'],
            'due_date'         => $data['due_date'],
            'status'           => $data['status'],
            'priority'         => $data['priority'],
            'image_path'       => $image,
            'project_id'       => $data['project'],
            'assigned_user_id' => $data['user'],
            'created_by'       => Auth::id(),
            'updated_by'       => Auth::id(),
        ]);

        return to_route('tasks.index')->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task = TaskResource::make($task);
        return inertia("Tasks/Show", [
            'task' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::all()->pluck("name", "id");
        $users    = User::all()->pluck("name", "id");
        $task = TaskResource::make($task);

        return inertia("Tasks/Edit", [
            "task"=> $task,
            "users"    => $users,
            "projects" => $projects,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {

        $data = $request->validated();
        // dd($data);
        $image = $data['image'];
        if ($image) {
             if ($task->image_path && Storage::disk('public')->exists($task->image_path)) {
                Storage::disk('public')->delete($task->image_path);
            }
            $image = $image->store('tasks', 'public');
        } else {
            $image = $task->image_path;
        }

        $task->update([
            'name'             => $data['name'],
            'description'      => $data['description'],
            'due_date'         => $data['due_date'],
            'status'           => $data['status'],
            'priority'         => $data['priority'],
            'image_path'       => $image,
            'project_id'       => $data['project'],
            'assigned_user_id' => $data['user'],
            'updated_by'       => Auth::id(),
        ]);

        return to_route('tasks.index')->with('success', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if ($task->image_path && Storage::disk('public')->exists($task->image_path)) {
            Storage::disk('public')->delete($task->image_path);
        }

        $task->delete();

        return back()->with('success', 'Task Deleted');
        // return redirect()->route('tasks.index')->with('success', 'Task deleted.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sortField", "created_at");
        $sortOrder = request("sortOrder", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)->onEachSide(5);

        return Inertia::render("Projects/Index", [
            "projects" => ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
            "success" => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return inertia('Projects/Create',['data'=>[1,2,3,4]]);
        // return Inertia::render('Projects/Create',[]); //? - both can be used
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        // dd($data);

        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();


        $image = $data['image'] ?? null;
        if ($image) {
            $image = $image->store('projects', 'public');
        }


        Project::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'due_date' => $data['due_date'],
            'status' => $data['status'],
            'image_path' => $image,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return to_route('projects.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

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

        return Inertia::render("Projects/Show", [
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', ['project' => new ProjectResource($project)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        // dd($data);


        $data['updated_by'] = Auth::id();


        $image = $data['image'] ?? null;
        if ($image) {
            if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
                Storage::disk('public')->delete($project->image_path);
            }
            $image = $image->store('projects', 'public');
        }


        $project->update([
            'name' => $data['name'],
            'description' => $data['description'],
            'due_date' => $data['due_date'],
            'status' => $data['status'],
            'image_path' => $image,
            'updated_by' => Auth::id(),
        ]);

        return to_route('projects.index')->with('success', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {

        if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
            Storage::disk('public')->delete($project->image_path);
        }

        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted.');
    }
}

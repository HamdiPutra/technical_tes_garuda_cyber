<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $posts = Post::where('user_id', $user->id)->latest()->paginate(5);
        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|string'
        ], [
            'title.required' => 'Title Wajib Diisi',
            'description.required' => 'Description Wajib Diisi'
        ]);
        $data = Post::create([
            'user_id' => Auth::user()->id,
            'title' => $request->input('title'),
            'description' => $request->input('description')
        ]);

        return response()->json([
            'message' => 'Post berhasil disimpan',
            'data' => $data
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $post = Post::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
            
        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|string'
        ], [
            'title.required' => 'Title Wajib Diisi',
            'description.required' => 'Description Wajib Diisi'
        ]);
        
        $data = Post::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $data->update([
            'title' => $request->input('title'),
            'description' => $request->input('description')
        ]);

        return response()->json([
            'message' => 'Post berhasil diupdate',
            'data' => $data
        ],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $post = Post::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $post->delete();
        
        return response()->json([
            'message' => 'Post berhasil dihapus',
        ],200);
    }
}

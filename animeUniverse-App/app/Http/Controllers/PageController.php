<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class PageController extends Controller
{
    public function home(){
        return Inertia::render('Posts/Home');
    }
    public function mangadetail($mangaId)
    {
        return Inertia::render('Posts/MangaDetail', ['mangaId' => $mangaId]);
    }
    public function chapter($chapterId) {
        return Inertia::render('Posts/ChapterPage', ['chapterId' => $chapterId]);
    }
}

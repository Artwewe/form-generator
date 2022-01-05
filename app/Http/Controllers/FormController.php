<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormController extends Controller
{
    public function main(Request $request)
    {
        return view('form.create');
    }
}

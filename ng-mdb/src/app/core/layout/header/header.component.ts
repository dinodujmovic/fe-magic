import { Component } from '@angular/core';

@Component({
    selector: 'mdb-header',
    template: `
        <div class="container mx-auto navbar bg-base-100">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl" [routerLink]="'/'">TMDB</a>
        </div>
        <div class="flex-none gap-2">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="/assets/user.webp" />
                    </div>
                </label>
                <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li><a [routerLink]="'/settings'">Settings</a></li>
                </ul>
            </div>
        </div>
    </div>
  `
})
export class HeaderComponent {
}

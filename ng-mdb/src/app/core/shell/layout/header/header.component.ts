import { Component, OnDestroy } from "@angular/core";
import { ManualSubs } from "@core/helpers/manual-subs";
import { Store } from "@ngxs/store";
import { IAppState } from "@store/IAppState";
import { UpdateSettings } from "@store/settings/settings.action";
import { ISettingsState } from "@store/settings/settings.model";
import { take } from "rxjs";

@Component({
    selector: "mdb-header",
    template: `
        <div class="mdb-header container mx-auto navbar bg-base-100">
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl underline underline-offset-4 border-primary" [routerLink]="'/'">TMDB</a>

                <div class="flex justify-start flex-1 px-2">
                    <div class="flex items-stretch">
                        <div class="dropdown dropdown-start">
                            <label tabindex="0" class="btn btn-ghost rounded-btn">Movies</label>
                            <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                <li><a [routerLink]="'/movies'">Popular</a></li>
                                <li><a [routerLink]="'/movies/now-playing'">Now Playing</a></li>
                                <li><a [routerLink]="'/movies/upcoming'">Upcoming</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-none mr-3">
                <div title="Change Theme" class="dropdown dropdown-end ">
                    <div tabindex="0" class="btn gap-1 normal-case btn-ghost">
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11
                              7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                            </path>
                        </svg>

                        <span class="hidden md:inline">Theme</span>
                        <svg width="12px" height="12px"
                             class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                        </svg>
                    </div>

                    <div class="mdb-header__theme-select
                                dropdown-content
                                bg-base-200
                                text-base-content rounded-t-box rounded-b-box top-px
                                max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
                        <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
                            <button *ngFor="let theme of settings.themes"
                                    (click)="setTheme(theme)"
                                    class="mdb-header__theme-select-item outline-base-content overflow-hidden rounded-lg text-left">

                                <div [attr.data-theme]="theme"
                                     class="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div class="grid grid-cols-5 grid-rows-3">
                                        <div class="col-span-5 row-span-3 row-start-1 flex gap-2 py-3 px-4 items-center">
                                            <span *ngIf="settings.theme === theme">&#x2611;</span>

                                            <div class="flex-grow text-sm font-bold">
                                                {{theme}}
                                            </div>

                                            <div class="flex flex-shrink-0 flex-wrap gap-1 h-full">
                                                <div class="bg-primary w-2 rounded"></div>
                                                <div class="bg-secondary w-2 rounded"></div>
                                                <div class="bg-accent w-2 rounded"></div>
                                                <div class="bg-neutral w-2 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-none gap-2">
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src="/assets/user.webp"/>
                        </div>
                    </label>
                    <ul tabindex="0"
                        class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><a [routerLink]="'/settings'">Settings</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `
})
export class HeaderComponent implements OnDestroy {
    private subs = new ManualSubs();

    public settings!: ISettingsState;

    constructor(private store: Store) {
        this.subs.add = this.store.select((state: IAppState) => state.settings)
            .subscribe((settings: ISettingsState) => {
                this.settings = settings;
            });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    setTheme(theme: string) {
        if (theme === this.settings.theme) {
            return;
        }

        const settings = {
            ...this.settings,
            theme
        };

        this.store.dispatch(new UpdateSettings(settings))
            .pipe(take(1));
    }
}

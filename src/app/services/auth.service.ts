import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly STORAGE_KEY = 'users';
    private readonly SESSION_KEY = 'current_user';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor() {
        const savedUser = localStorage.getItem(this.SESSION_KEY);
        this.currentUserSubject = new BehaviorSubject<any>(savedUser ? JSON.parse(savedUser) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    register(user: any): boolean {
        const users = this.getUsers();
        if (users.find((u: any) => u.email === user.email)) {
            return false; // User already exists
        }
        users.push(user);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
        return true;
    }

    login(credentials: any): boolean {
        const users = this.getUsers();
        const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
        if (user) {
            localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
            this.currentUserSubject.next(user);
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem(this.SESSION_KEY);
        this.currentUserSubject.next(null);
    }

    private getUsers(): any[] {
        const users = localStorage.getItem(this.STORAGE_KEY);
        return users ? JSON.parse(users) : [];
    }
}

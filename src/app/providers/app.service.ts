import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@upupa/auth";
import { DataService } from "@upupa/data";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { User } from '@upupa/auth'
import { Role } from "../model";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class AppService {

  
    user:User
    roles: Role[] = []


    constructor(private ds: DataService, private auth: AuthService, private http: HttpClient) {

    }

    async initEmployeeInfo() {
        if (!this.auth?.user) return
        this.user = await firstValueFrom(this.ds.get<User>(`user/${this.auth.user.sub}`))
    }

   


    async addUserToRoles(roles: string[], user: User) {
        return firstValueFrom(this.http.post(`${environment.server_base_url}/add-user-to-roles`, { roles, user }))
    }

    async getRoles() {
        this.roles = await firstValueFrom(this.ds.get<Role[]>(`role`))
        return this.roles
    }

    

    

   

    title: BehaviorSubject<string> = new BehaviorSubject('dashboard')
    appModules: BehaviorSubject<any[]> = new BehaviorSubject<any>([])

}
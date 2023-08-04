import { Component, OnInit } from "@angular/core";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { UserService } from "../../../service/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    users!: UserResDto[];
    deleteId!: number;
    constructor(private userService: UserService,
        private router: Router) { }

    ngOnInit(): void {

        this.getUser();


    }
    getUser(){
        const data = this.userService.getAll().subscribe(result => {
            this.users = result;
        });
    }
    onClick(userId: number): void {

        this.deleteId = userId;
    }
    onDelete(): void {
        this.userService.delete(this.deleteId).subscribe(() => {
           this.getUser();
        })
    }
    onUpdate(id : number){
        this.router.navigateByUrl(`/users/update/${id}`)
    }


}
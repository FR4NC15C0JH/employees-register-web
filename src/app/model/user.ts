import { Departament } from "./departament";
import { Job } from "./job";

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,    
        public image: string,
        public departament: Departament,
        public job: Job,
        public profiles: string
    ){}        
}
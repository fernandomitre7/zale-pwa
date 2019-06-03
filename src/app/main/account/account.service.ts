import { Injectable } from '@angular/core';
import { User, ApiError } from 'src/app/core/api/models';
import { ApiService } from 'src/app/core/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private apiService: ApiService) { }

}

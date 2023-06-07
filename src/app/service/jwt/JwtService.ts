import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { DecodedToken } from 'src/app/interfaces/DecodedToken';

@Injectable({
  providedIn : "root"
}
)
export class JwtService {

    constructor() {
    }
    decodeToken(token:string):DecodedToken {
      return jwt_decode.default(token);
    }

    isTokenExpired(exp:number): boolean {
        return ((1000 * exp) - (new Date()).getTime()) < 5000;
    }
}
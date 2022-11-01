import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<void>;
    signin(response: Response, dto: SigninDto): Promise<void>;
    logout(response: Response): void;
}

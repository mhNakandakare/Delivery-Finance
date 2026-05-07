import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WalletLoginDto } from './dto/wallet-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: WalletLoginDto) {
    return this.authService.login(dto.walletAddress);
  }
}
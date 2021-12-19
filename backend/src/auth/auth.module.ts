import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { SharedModule } from 'src/shared/shared.module';
import { RolesGuard } from './guards/roles.guard';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60000d' }

    }),
    UsersModule, SharedModule],
  providers: [
    AuthService,
    JwtGuard,
    JwtStrategy,
    RolesGuard
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }

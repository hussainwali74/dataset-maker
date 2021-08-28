import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SharedService } from 'src/shared/shared.service';

@ApiUnauthorizedResponse({ description: 'please provide a valid token' })
@ApiBearerAuth('token')
// @UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService,
    private sharedService: SharedService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    try {
      const data = await this.usersService.update(+id, updateUserDto);
      return this.sharedService.handleSuccess(data)
    } catch (error) {
      return this.sharedService.handleError(error)
    }

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.usersService.remove(+id);
      return this.sharedService.handleSuccess(data)

    } catch (error) {
      return this.sharedService.handleError(error)
    }
  }
}

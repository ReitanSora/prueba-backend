import { Controller, Get, Post, Body, Param, Ip } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Post('users')
  create(@Body() user: CreateUserDto, @Ip() ip: string) {
    return this.servicesService.create(user, ip);
  }

  @Get('users')
  findAllUsers() {
    return this.servicesService.findAllUsers();
  }

  @Get('dg')
  findAllDragonBall() {
    return this.servicesService.findAllDragonBall();
  }

  @Get('dogs')
  findRandomDogImage() {
    return this.servicesService.findRandomDogImage();
  }

  @Get('cats')
  findRandomCatImage() {
    return this.servicesService.findRandomCatImage();
  }

  @Get('network/:ip')
  analyzeIp(@Param('ip') ip: string) {
    return this.servicesService.analyzeIp(ip);
  }
}

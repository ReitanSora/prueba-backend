import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';

const prisma = new PrismaClient();

interface DirectionProps {
  city: string;
  country: string;
}

@Injectable()
export class ServicesService {
  async create(user: CreateUserDto, ip: string) {
    const ipv4 = ip.replace('::ffff:', '');
    const res = await fetch(`http://ip-api.com/json/${ipv4}`);
    console.log(ipv4);
    const response = (await res.json()) as DirectionProps;
    let petData;

    if (Number(ipv4.substring(ipv4.length - 1, 1)) % 2 === 0) {
      const dogResponse = await fetch(
        'https://dog.ceo/api/breeds/image/random',
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      petData = await dogResponse.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      petData.url = petData.message;
    } else {
      const catResponse = await fetch(
        'https://api.thecatapi.com/v1/images/search',
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      petData = await catResponse.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      petData = petData[0];
    }
    return await prisma.users.create({
      data: {
        email: user.email,
        name: user.name,
        ip: ipv4,
        direction: response.city,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        petPhoto: petData.url,
      },
    });
  }

  async findAllUsers() {
    return await prisma.users.findMany();
  }

  async findAllDragonBall() {
    try {
      const res = await fetch('https://dragonball-api.com/api/characters');
      const response = (await res.json()) as object;
      return response;
    } catch (error) {
      console.log(`Error while fetch dragon ball characters: ${error}`);
    }
  }

  async findRandomDogImage() {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const response = (await res.json()) as object;
      return response;
    } catch (error) {
      console.log(`Error while fetch while fetch random dog image: ${error}`);
    }
  }

  async findRandomCatImage() {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search');
      const response = (await res.json()) as object;
      return response;
    } catch (error) {
      console.log(`Error while fetch while fetch random cat image: ${error}`);
    }
  }

  async analyzeIp(ip: string) {
    try {
      const res = await fetch(`http://ip-api.com/json/${ip}`);
      const response = (await res.json()) as object;
      return response;
    } catch (error) {
      console.log(`Error while fetch while ip information: ${error}`);
    }
  }
}

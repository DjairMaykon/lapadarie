import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product when given correct parameters', () => {
      const product = {
        id: 1,
        description: 'Teste',
        price: new Prisma.Decimal(1),
        createdAt: new Date(),
      };
      jest.spyOn(prisma.product, 'create').mockResolvedValue(product);

      expect(
        service.create({
          description: 'Teste',
          price: 1,
        }),
      ).resolves.toEqual(product);
    });
  });

  describe('findAll', () => {
    it('should return all products', () => {
      const products = [
        {
          id: 1,
          description: 'Teste',
          price: new Prisma.Decimal(1),
          createdAt: new Date(),
        },
        {
          id: 2,
          description: 'Teste 2',
          price: new Prisma.Decimal(2),
          createdAt: new Date(),
        },
      ];
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products);

      expect(service.findAll()).resolves.toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a error if id not exists', () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

      expect(service.findOne(1)).rejects.toThrow(HttpException);
    });

    it('should return a product if id exists', () => {
      const product = {
        id: 1,
        description: 'Teste',
        price: new Prisma.Decimal(1),
        createdAt: new Date(),
      };
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(product);

      expect(service.findOne(1)).resolves.toEqual(product);
    });
  });

  describe('update', () => {
    it('should return a error if id not exists', () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

      expect(service.update(1, {})).rejects.toThrow(HttpException);
    });

    it('should return a product updated if id exists', () => {
      const product = {
        id: 1,
        description: 'Teste',
        price: new Prisma.Decimal(1),
        createdAt: new Date(),
      };
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(product);

      expect(service.update(1, {})).resolves.toEqual(product);
    });
  });

  describe('remove', () => {
    it('should return a error if id not exists', () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

      expect(service.remove(1)).rejects.toThrow(HttpException);
    });

    it('should return a product removed if id exists', () => {
      const product = {
        id: 1,
        description: 'Teste',
        price: new Prisma.Decimal(1),
        createdAt: new Date(),
      };
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(product);
      jest.spyOn(prisma.product, 'delete').mockResolvedValue(product);

      expect(service.remove(1)).resolves.toEqual(product);
    });
  });
});

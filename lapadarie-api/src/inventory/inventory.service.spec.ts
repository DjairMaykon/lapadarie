import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, InventoryService],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a inventory when given correct parameters', () => {
      const inventory = {
        id: 1,
        client: 'Teste',
        amount: 1,
        createdAt: new Date(),
        delivered: true,
      };
      jest.spyOn(prisma.inventory, 'create').mockResolvedValue(inventory);

      expect(
        service.create({
          client: 'Teste',
          amount: 1,
        }),
      ).resolves.toEqual(inventory);
    });
  });

  describe('findAll', () => {
    it('should return all inventorys', () => {
      const inventorys = [
        {
          id: 1,
          client: 'Teste',
          amount: 1,
          createdAt: new Date(),
          delivered: true,
        },
        {
          id: 2,
          client: 'Teste2',
          amount: 2,
          createdAt: new Date(),
          delivered: true,
        },
      ];
      jest.spyOn(prisma.inventory, 'findMany').mockResolvedValue(inventorys);

      expect(service.findAll()).resolves.toEqual(inventorys);
    });
  });

  describe('findOne', () => {
    it('should return a error if id not exists', () => {
      jest.spyOn(prisma.inventory, 'findUnique').mockResolvedValue(null);

      expect(service.findOne(1)).rejects.toThrow(HttpException);
    });

    it('should return a inventory if id exists', () => {
      const inventory = {
        id: 1,
        client: 'Teste',
        amount: 1,
        createdAt: new Date(),
        delivered: true,
      };
      jest.spyOn(prisma.inventory, 'findUnique').mockResolvedValue(inventory);

      expect(service.findOne(1)).resolves.toEqual(inventory);
    });
  });

  describe('update', () => {
    it('should return a error if id not exists', () => {
      jest.spyOn(prisma.inventory, 'findUnique').mockResolvedValue(null);

      expect(service.update(1, {})).rejects.toThrow(HttpException);
    });

    it('should return a inventory updated if id exists', () => {
      const inventory = {
        id: 1,
        client: 'Teste',
        amount: 1,
        createdAt: new Date(),
        delivered: true,
      };
      jest.spyOn(prisma.inventory, 'findUnique').mockResolvedValue(inventory);

      expect(service.update(1, {})).resolves.toEqual(inventory);
    });
  });

  describe('remove', () => {
    it('should return a error if id not exists', () => {
      jest.spyOn(prisma.inventory, 'findUnique').mockResolvedValue(null);

      expect(service.remove(1)).rejects.toThrow(HttpException);
    });

    it('should return a inventory removed if id exists', () => {
      const inventory = {
        id: 1,
        client: 'Teste',
        amount: 1,
        createdAt: new Date(),
        delivered: true,
      };
      jest.spyOn(prisma.inventory, 'findUnique').mockResolvedValue(inventory);
      jest.spyOn(prisma.inventory, 'delete').mockResolvedValue(inventory);

      expect(service.remove(1)).resolves.toEqual(inventory);
    });
  });
});

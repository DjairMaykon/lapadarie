import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const mockedServiceReturns = {
  create: {
    id: 1,
    description: 'Teste',
    price: 1,
    createdAt: new Date(),
  },
  findAll: [
    {
      id: 1,
      description: 'Teste',
      price: 1,
      createdAt: new Date(),
    },
    {
      id: 2,
      description: 'Teste 2',
      price: 2,
      createdAt: new Date(),
    },
  ],
  findOne: {
    id: 1,
    description: 'Teste',
    price: 1,
    createdAt: new Date(),
  },
  update: {
    id: 1,
    description: 'Teste',
    price: 1,
    createdAt: new Date(),
  },
  remove: {
    id: 1,
    description: 'Teste',
    price: 1,
    createdAt: new Date(),
  },
};
const mockedService = {
  create: jest.fn().mockResolvedValue(mockedServiceReturns.create),
  findAll: jest.fn().mockResolvedValue(mockedServiceReturns.findAll),
  findOne: jest.fn().mockResolvedValue(mockedServiceReturns.findOne),
  update: jest.fn().mockResolvedValue(mockedServiceReturns.update),
  remove: jest.fn().mockResolvedValue(mockedServiceReturns.remove),
};

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockedService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', () => {
      const mockCreateDto = {
        description: 'Teste',
        price: 1,
      };
      expect(controller.create(mockCreateDto)).resolves.toEqual(
        mockedServiceReturns.create,
      );
    });
  });

  describe('getAll', () => {
    it('should return all products', () => {
      expect(controller.findAll()).resolves.toEqual(
        mockedServiceReturns.findAll,
      );
    });
  });

  describe('findOne', () => {
    it('should return one product if id exists', () => {
      expect(controller.findOne(1)).resolves.toEqual(
        mockedServiceReturns.findOne,
      );
    });

    it('should return a error if id not exists', () => {
      jest
        .spyOn(mockedService, 'findOne')
        .mockRejectedValueOnce(new HttpException('Teste', 2));

      expect(controller.findOne(1)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update product if id exists', () => {
      const mockUpdateDto = {
        description: 'Teste',
        price: 1,
      };
      expect(controller.update(1, mockUpdateDto)).resolves.toEqual(
        mockedServiceReturns.update,
      );
    });

    it('should return a error if id not exists', () => {
      jest
        .spyOn(mockedService, 'update')
        .mockRejectedValueOnce(new HttpException('Teste', 2));

      expect(controller.update(1, {})).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should remove product if id exists', () => {
      expect(controller.remove(1)).resolves.toEqual(
        mockedServiceReturns.remove,
      );
    });

    it('should return a error if id not exists', () => {
      jest
        .spyOn(mockedService, 'remove')
        .mockRejectedValueOnce(new HttpException('Teste', 2));

      expect(controller.remove(1)).rejects.toThrow(HttpException);
    });
  });
});

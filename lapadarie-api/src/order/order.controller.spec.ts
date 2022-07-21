import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

const mockedService = {
  create: jest.fn().mockResolvedValue({
    id: 1,
    client: 'teste',
    amount: 1,
  }),
  findAll: jest.fn().mockResolvedValue([
    {
      id: 1,
      client: 'teste',
      amount: 1,
    },
    {
      id: 2,
      client: 'teste 2',
      amount: 2,
    },
  ]),
  findOne: jest.fn().mockResolvedValue({
    id: 1,
    client: 'teste',
    amount: 1,
  }),
  update: jest.fn().mockResolvedValue({
    id: 1,
    client: 'teste',
    amount: 1,
  }),
  remove: jest.fn().mockResolvedValue({
    id: 1,
    client: 'teste',
    amount: 1,
  }),
};

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockedService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order', () => {
      const mockCreateDto = {
        client: 'teste',
        amount: 1,
      };
      expect(controller.create(mockCreateDto)).resolves.toEqual({
        id: 1,
        ...mockCreateDto,
      });
    });
  });

  describe('getAll', () => {
    it('should return all orders', () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          id: 1,
          client: 'teste',
          amount: 1,
        },
        {
          id: 2,
          client: 'teste 2',
          amount: 2,
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return one order if id exists', () => {
      expect(controller.findOne(1)).resolves.toEqual({
        id: 1,
        client: 'teste',
        amount: 1,
      });
    });

    it('should return a error if id not exists', () => {
      jest
        .spyOn(mockedService, 'findOne')
        .mockRejectedValueOnce(new HttpException('teste', 2));

      expect(controller.findOne(1)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update order if id exists', () => {
      expect(controller.update(1, {})).resolves.toEqual({
        id: 1,
        client: 'teste',
        amount: 1,
      });
    });

    it('should return a error if id not exists', () => {
      jest
        .spyOn(mockedService, 'update')
        .mockRejectedValueOnce(new HttpException('teste', 2));

      expect(controller.update(1, {})).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should remove order if id exists', () => {
      expect(controller.remove(1)).resolves.toEqual({
        id: 1,
        client: 'teste',
        amount: 1,
      });
    });

    it('should return a error if id not exists', () => {
      jest
        .spyOn(mockedService, 'remove')
        .mockRejectedValueOnce(new HttpException('teste', 2));

      expect(controller.remove(1)).rejects.toThrow(HttpException);
    });
  });
});

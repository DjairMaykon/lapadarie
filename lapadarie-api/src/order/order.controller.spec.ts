import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

const mockedServiceReturn = {
  create: {
    id: 1,
    client: 'teste',
    amount: 1,
  },
  findAll: [
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
  ],
  findOne: {
    id: 1,
    client: 'teste',
    amount: 1,
  },
  update: {
    id: 1,
    client: 'teste',
    amount: 1,
  },
  remove: {
    id: 1,
    client: 'teste',
    amount: 1,
  },
};
const mockedService = {
  create: jest.fn().mockResolvedValue(mockedServiceReturn.create),
  findAll: jest.fn().mockResolvedValue(mockedServiceReturn.findAll),
  findOne: jest.fn().mockResolvedValue(mockedServiceReturn.findOne),
  update: jest.fn().mockResolvedValue(mockedServiceReturn.update),
  remove: jest.fn().mockResolvedValue(mockedServiceReturn.remove),
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
      expect(controller.create(mockCreateDto)).resolves.toEqual(
        mockedServiceReturn.create,
      );
    });
  });

  describe('getAll', () => {
    it('should return all orders', () => {
      expect(controller.findAll()).resolves.toEqual(
        mockedServiceReturn.findAll,
      );
    });
  });

  describe('findOne', () => {
    it('should return one order if id exists', () => {
      expect(controller.findOne(1)).resolves.toEqual(
        mockedServiceReturn.findOne,
      );
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
      const mockUpdateDto = {
        client: 'teste',
        amount: 1,
      };
      expect(controller.update(1, mockUpdateDto)).resolves.toEqual(
        mockedServiceReturn.update,
      );
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
      expect(controller.remove(1)).resolves.toEqual(mockedServiceReturn.remove);
    });

    it('should return a error if id not exists', () => {
      jest
        .spyOn(mockedService, 'remove')
        .mockRejectedValueOnce(new HttpException('teste', 2));

      expect(controller.remove(1)).rejects.toThrow(HttpException);
    });
  });
});

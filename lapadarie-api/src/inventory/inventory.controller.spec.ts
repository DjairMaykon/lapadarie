import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

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

describe('InventoryController', () => {
  let controller: InventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useValue: mockedService,
        },
      ],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new inventory', () => {
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
    it('should return all inventorys', () => {
      expect(controller.findAll()).resolves.toEqual(
        mockedServiceReturn.findAll,
      );
    });
  });

  describe('findOne', () => {
    it('should return one inventory if id exists', () => {
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
    it('should update inventory if id exists', () => {
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
    it('should remove inventory if id exists', () => {
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

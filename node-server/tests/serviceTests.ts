import { Request } from 'express';
import {
    createService,
    updateService,
    deleteService,
    getServices,
    getService
} from '../src/services/serviceService';
import { ServiceModel } from '../src/models/serviceModel';
import { BusinessModel } from '../src/models/businessModel';
import { CustomError } from '../src/types/customError';

jest.mock('../src/models/serviceModel');
jest.mock('../src/models/businessModel');

const MockedServiceModel = ServiceModel as jest.Mocked<typeof ServiceModel>;
const MockedBusinessModel = BusinessModel as jest.Mocked<typeof BusinessModel>;

describe('Service Service', () => {
    describe('createService function', () => {
        // it('should create a new service', async () => {
        //     const req = { body: { name: 'Test Service', price: 100, businessId: 'validBusinessId' } } as Request;

        //     // Mocking the BusinessModel findById method
        //     MockedBusinessModel.findById.mockResolvedValue(true);

        //     // Mocking the ServiceModel save method
        //     const mockedService = { _id: 'mockedServiceId', name: 'Test Service', price: 100, businessId: 'validBusinessId' };
        //     MockedServiceModel.prototype.save.mockResolvedValue(mockedService);

        //     const result = await createService(req);

        //     expect(result).toEqual(mockedService);
        // });

        it('should throw an error when missing required fields', async () => {
            const req = { body: { price: 100, businessId: 'validBusinessId' } } as Request;

            await expect(createService(req)).rejects.toThrow(CustomError);
        });

        it('should throw an error when businessId is invalid', async () => {
            const req = { body: { name: 'Test Service', price: 100, businessId: 'invalidBusinessId' } } as Request;

            MockedBusinessModel.findById.mockResolvedValue(false);

            await expect(createService(req)).rejects.toThrow(CustomError);
        });
    });

    describe('updateService function', () => {
        it('should update an existing service', async () => {
            const req = { body: { id: 'existingServiceId', name: 'Updated Service', price: 150, businessId: 'validBusinessId' } } as Request;

            MockedBusinessModel.findById.mockResolvedValue(true);

            const mockedUpdatedService = { _id: 'existingServiceId', name: 'Updated Service', price: 150, businessId: 'validBusinessId' };
            MockedServiceModel.findByIdAndUpdate.mockResolvedValue(mockedUpdatedService);

            const result = await updateService(req);

            expect(result).toEqual(mockedUpdatedService);
        });

        it('should throw an error when missing required fields', async () => {
            const req = { body: { name: 'Updated Service', price: 150, businessId: 'validBusinessId' } } as Request;

            await expect(updateService(req)).rejects.toThrow(CustomError);
        });

        it('should throw an error when businessId is invalid', async () => {
            const req = { body: { id: 'existingServiceId', name: 'Updated Service', price: 150, businessId: 'invalidBusinessId' } } as Request;

            MockedBusinessModel.findById.mockResolvedValue(false);

            await expect(updateService(req)).rejects.toThrow(CustomError);
        });
    });

    describe('deleteService function', () => {
        it('should delete an existing service', async () => {
            const req: Request<{ serviceId: string }> = { params: { serviceId: 'existingServiceId' } } as Request<{ serviceId: string }>;

            const mockedService = { _id: 'existingServiceId', name: 'Test Service', price: 100, businessId: 'validBusinessId' };
            MockedServiceModel.findById.mockResolvedValue(mockedService);
            MockedServiceModel.findByIdAndDelete.mockResolvedValue(mockedService);

            const result = await deleteService(req);

            expect(result).toEqual(mockedService);
        });

        it('should throw an error when service is not found', async () => {
            const req = { params: { serviceId: 'nonExistingServiceId' } } as Request<{ serviceId: string }>;

            MockedServiceModel.findById.mockResolvedValue(null);

            await expect(deleteService(req)).rejects.toThrow(CustomError);
        });
    });

    describe('getServices function', () => {
        it('should get all services', async () => {
            const mockedServices = [
                { _id: 'serviceId1', name: 'Service 1', price: 100, businessId: 'businessId1' },
                { _id: 'serviceId2', name: 'Service 2', price: 150, businessId: 'businessId2' }
            ];
            MockedServiceModel.find.mockResolvedValue(mockedServices);

            const result = await getServices();

            expect(result).toEqual(mockedServices);
        });
    });

    describe('getService function', () => {
        it('should get an existing service', async () => {
            const req = { params: { serviceId: 'existingServiceId' } } as Request<{ serviceId: string }>;

            const mockedService = { _id: 'existingServiceId', name: 'Test Service', price: 100, businessId: 'validBusinessId' };
            MockedServiceModel.findById.mockResolvedValue(mockedService);

            const result = await getService(req);

            expect(result).toEqual(mockedService);
        });

        it('should throw an error when service is not found', async () => {
            const req = { params: { serviceId: 'nonExistingServiceId' } } as Request<{ serviceId: string }>;

            MockedServiceModel.findById.mockResolvedValue(null);

            await expect(getService(req)).rejects.toThrow(CustomError);
        });
    });
});
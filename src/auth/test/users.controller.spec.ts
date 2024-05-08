import { Test } from "@nestjs/testing"
import { AuthController } from "../auth.controller"
import { AuthService } from "../auth.service"
import { User } from "@prisma/client"
import { userStub } from "./stubs/user.stub"
import { UpdateUserDto } from "../dto/updateUserDto"

jest.mock('../auth.service')

describe('AuthrController', () => {
    let authController:  AuthController;
    let authService:  AuthService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports : [],
            controllers : [AuthController],
            providers : [AuthService]
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        authService = moduleRef.get<AuthService>(AuthService);
        jest.clearAllMocks();
    })

    describe('signup', () => {
        describe('when signup is called ', () => {
            let user: object;

            beforeEach(async () => {
                user = await authController.signUp(userStub())
                return user; 
            });

            test('it should call authService ', () =>{
                expect(authService).toHaveBeenCalled;
            })
        
            test('then it should return  user ', () =>{
                expect(user).toEqual(userStub());
            })
        
        });
    });

    describe('users', () => {
        describe('when users is called', () => {
            let users: User[];

            beforeEach(async() => {
                users = await authController.getUsers();
                return users;
            });

            test('it should call authService', () => {
                expect(authService.getUsers).toHaveBeenCalled();
            });

            test('then it should return users' , () => {
                expect(users).toEqual([userStub()]);
            });
        });
    });
    describe('editUser', () => {
        describe('when editUser is called', () => {
            let user: User;
            let curentId = userStub().id;
            let updateUserDto: UpdateUserDto;

            beforeEach(async() => {
                updateUserDto = {
                    name: 'eric',
                }
                user = await authController.editUser(curentId, updateUserDto);
                return user;
            });

            test('it should call authService', () => {
                expect(authService.editUser).toHaveBeenCalled();
            });

            test('then it should return users' , () => {
                expect(user).toEqual(userStub());
            });
        });
    });
    describe('deleteUser', () => {
        describe('when deleteUser is called', () => {
            let userId: number;
            let curentId = userStub().id;

            beforeEach(async() => {
                userId = await authController.deleteUser(curentId);
                return userId;
            });

            test('it should call authService', () => {
                expect(authService.deleteUser).toHaveBeenCalled();
            });

            test('then it should return users' , () => {
                expect(userId).toEqual(userStub().id);
            });
        });
    });
})
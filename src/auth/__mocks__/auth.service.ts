import { userStub } from "../test/stubs/user.stub";

export const AuthService = jest.fn().mockReturnValue({
    signup: jest.fn().mockResolvedValue(userStub()),
    getUsers: jest.fn().mockResolvedValue([userStub()]),
    editUser: jest.fn().mockResolvedValue(userStub()),
    deleteUser: jest.fn().mockResolvedValue(userStub().id),
});
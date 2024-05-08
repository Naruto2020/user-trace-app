import { User } from "@prisma/client"

export const userStub = (): User => {
    return {
        id: 2,
        email: 'marc@test.com',
        name: 'marc',
        password: 'marc2024',
        createdAt: new Date('2022-01-01T08:00:00'),
        updateAt: new Date('2022-01-01T08:00:00'),
    }
}
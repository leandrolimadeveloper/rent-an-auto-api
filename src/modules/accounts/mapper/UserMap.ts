import { instanceToInstance } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
    static toDTO({ id, name, email, avatar, driver_license, avatarUrl }: User): IUserResponseDTO {
        const user = instanceToInstance({
            id,
            name,
            email,
            avatar,
            driver_license,
            avatarUrl,
        });

        return user;
    }
}

export { UserMap };

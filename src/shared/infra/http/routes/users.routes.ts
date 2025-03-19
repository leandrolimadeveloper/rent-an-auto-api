import uploadConfig from '@config/upload'
import { CreateUseController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import multer from 'multer'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUseController()
const profileUserController = new ProfileUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle)

export { usersRoutes }

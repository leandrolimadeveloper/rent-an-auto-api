import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository"
import { CreateSpecificationController } from "./createSpecificationController"
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase"

const specificationRepository = new SpecificationsRepository()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }
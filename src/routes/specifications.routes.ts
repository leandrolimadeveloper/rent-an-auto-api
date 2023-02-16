import { Router } from "express";

import { createSpecificationController } from "../modules/useCases/Specification/createSpecification";

const specificationsRoutes = Router()

specificationsRoutes.post('/', (request, response) => {
    createSpecificationController.handle(request, response)
})

export { specificationsRoutes }
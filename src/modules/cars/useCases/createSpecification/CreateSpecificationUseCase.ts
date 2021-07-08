import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificatioRepository: ISpecificationRepository
  ) {}
  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificatioRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    await this.specificatioRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };

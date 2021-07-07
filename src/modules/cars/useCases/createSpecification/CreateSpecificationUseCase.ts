import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificatioRepository: ISpecificationRepository) {}
  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists = this.specificatioRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificatioRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };

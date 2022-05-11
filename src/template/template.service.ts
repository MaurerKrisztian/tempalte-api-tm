import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import { TemplateFactory } from './TemplateFactory';

@Injectable()
export class TemplateService {
  constructor(private readonly templateFactory: TemplateFactory) {}

  create(createTemplateDto: CreateTemplateDto) {
    return 'This action adds a new template';
  }

  findAll() {
    const validators = this.templateFactory.getValidators();

    return validators.map((validator) => {
      return {
        name: validator.TEMPLATE_NAME,
        link: `http://localhost:3000/template/${validator.TEMPLATE_NAME}`,
        playground: `http://localhost:3000/playground?templateName=${validator.TEMPLATE_NAME}`,
        exampleData: validator.exampleData(),
        templateWithExampleData: `http://localhost:3000/template/${validator.TEMPLATE_NAME}/example`,
        exampleDataLink: `http://localhost:3000/template/${validator.TEMPLATE_NAME}/exampleData`,
        rawHtml: `http://localhost:3000/template/${validator.TEMPLATE_NAME}/raw`,
        note: 'Usage: Post {link} body: exampleData structure',
      };
    });
  }

  getWithExampleData(templateName: string) {
    return this.templateFactory.createWithExample(templateName);
  }

  findOne(name: string, data: any) {
    return this.templateFactory.create(name, data);
  }

  getExampleDataForTemplate(templateName: string) {
    const validator = this.templateFactory.findValidator(templateName);
    return validator.exampleData();
  }

  getRawHtml(templateName: string) {
    const validator = this.templateFactory.findValidator(templateName);
    console.log(validator, fs
        .readFileSync(
            `${validator.getDir()}/${validator.TEMPLATE_NAME}.handlebars`,
        )
        .toString())
    return fs
      .readFileSync(
        `${validator.getDir()}/${validator.TEMPLATE_NAME}.handlebars`,
      )
      .toString();
  }
}
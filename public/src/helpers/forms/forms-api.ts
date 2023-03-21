import { nanoid } from '@reduxjs/toolkit';

export class OptionModel {
  id: string = nanoid(6);
  option = '';
}

export class SelectFormDefaultValue {
  id: string = nanoid(6);
  field = '';
  options: OptionModel[] = [new OptionModel(), new OptionModel()];
}

export class InputFormDefaultValue {
  id: string = nanoid(6);
  field = '';
}

import { type EntityItem } from 'dynamodb-toolbox';

import { type NoteEntity } from './common';

export type NoteEntityType = EntityItem<typeof NoteEntity>
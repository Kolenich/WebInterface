import { Avatar } from '../../lib/types';
import { ComponentState } from 'react';

export interface Props {
  fileUploadCallback: (avatar: Avatar) => ComponentState;
  fileRemoveCallback: () => ComponentState;
  avatarUrl: string | null;
}

export interface State {
  fileLoaded: boolean;
}

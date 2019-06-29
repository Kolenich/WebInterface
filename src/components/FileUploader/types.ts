import { Avatar } from '../../lib/types';
import { ComponentState } from 'react';

export interface Props {
  fileUploadCallback: (avatar: Avatar) => ComponentState;
  fileRemoveCallback: () => ComponentState;
}

export interface State {

}
